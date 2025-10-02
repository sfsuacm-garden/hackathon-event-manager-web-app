import { joinTeam, kickTeamMember, getTeamById, leaveTeam, createTeam  } from '../features/teams/teams.controller';
import prisma from '../config/prismaClient';
import type { Event, Team, TeamMember, UserProfile } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';
import { describe, beforeEach, afterEach, expect, test } from 'vitest';

interface TeamInfo {
  team: Team;
  teamMembers: TeamMember[];
}

interface TeamTestSetupInfo {
  event: Event;
  teams: TeamInfo[]; 
}

async function setTeamsTestUp(tx: PrismaClient, teamMemberCounts: number[]) {
  try{ 
    if(!teamMemberCounts) {
      console.error('[ERROR] Teams test setup cannot have empty teamMemberCounts');
      throw new Error('teamMemberCounts cannot be empty');
    }

    const testEvent = await tx.event.create({
      data: {
        name: 'EVENT FOR UNIT TESTING'
      }
    });
    
    const teamsInfo: TeamInfo[] = [];
    for(let i = 0; i < teamMemberCounts.length; i++) {
      const tempTeam = await createTeam(tx, testEvent.id);
      const teamMembers: TeamMember[] = [];

      for(let j = 0; j < teamMemberCounts[i]; j++) {
        const tempProfile = await tx.UserProfile.create({
          data: {
            firstName: `TEAM ${i + 1} TEST MEMBER ${j + 1} FN`,
            lastName: `TEAM ${i + 1} TEST MEMBER ${j + 1} LN`
          }
        });

        const tempTeamMember = await tx.teamMember.create({
          data: {
            teamId: tempTeam.id,
            eventId: testEvent.id,
            userId: tempProfile.id,
            isAdmin: j === 0 //if first member of team admin true otherwise false
          }
        });
        teamMembers.push(tempTeamMember);
      }
      const teamInfo: TeamInfo = {
        team: tempTeam,
        teamMembers: teamMembers
      };
      teamsInfo.push(teamInfo);
    }

    const teamSetUpInfo: TeamTestSetupInfo = {
      event: testEvent,
      teams: teamsInfo
    };

    return teamSetUpInfo;

  } catch(error) {
    console.error('fatal error setting up teams tests', error);
    throw error;
  }
}


describe('Team tests for 2 teams. initial team state: one member per team', ()=>{
  let teamSetupInfo: TeamTestSetupInfo;
  beforeEach(async () => {
    teamSetupInfo = await setTeamsTestUp([1, 1]);
  });

  afterEach(async () => {
    await cleanTeamsTestUp(teamSetupInfo);
  });

  test('join team test', async ()=>{
    await testJoinTeam(teamSetupInfo);
  });
});

async function cleanTeamsTestUp(tx: PrismaClient, setUpInfo: TeamTestSetupInfo) {//better setups might enable us to just rollback transaction to get a clean DB state insetad of running this
  //IN THEORY DELETING THE EVENT SHOULD DELETE THE RELATED TEST TEAMS AND TEAM MEMEBERS VIA DATABASE CASCADES BUT PROFILES WILL REMAIN, WE CLEAN THOSE MANUALLY
  try{
    await tx.event.delete({
      where: {
        id: setUpInfo.event.id
      }
    });

    const profileIds = [];
    for(const team of setUpInfo.teams) {
      for(const member of team.teamMembers) {
        profileIds.push(member.userId);
      }
    }
    await tx.UserProfile.delete({
      where: {
        id: {
          in: profileIds
        }
      }
    });

  } catch (error) {
    console.error('fatal error cleaning up teams tests', error);
    throw error;
  } 
}

async function testJoinTeam(testInfo: TeamTestSetupInfo) {
  
  const teamToJoin = testInfo.teams?.[0];
  expect(teamToJoin).toBeDefined();
    
  const teamBeingLeft = testInfo.teams?.[1];
  expect(teamBeingLeft).toBeDefined();

  const memberLeaving = teamBeingLeft?.teamMembers?.[0];
  expect(memberLeaving).toBeDefined();

  await joinTeam(teamToJoin!.team.id, teamBeingLeft!.teamMembers[0]!.userId, testInfo.event.id);

  const teamJoinedDb = await prisma.team.findUnique({
    where: {
      id: teamToJoin!.team.id
    },
    include: {
      members: true
    }
  });

  expect(teamJoinedDb).not.toBeNull();
  expect(teamJoinedDb?.members).not.toBeNull();

  let newMemberDb: TeamMember | undefined = undefined;
  for(const member of teamJoinedDb!.members) {
    if (member.userId === memberLeaving?.userId) {
      newMemberDb = member;
    }
  }

  expect(newMemberDb, 'there was no new member of team').toBeDefined();
  expect(newMemberDb?.isAdmin, 'joining member cannot be admin').toBe(false);

  const oldTeamDb = await prisma.team.findUnique({
    where: {
      id: teamBeingLeft!.team.id
    },
    include: {
      members: true
    }
  });
  
  expect(oldTeamDb, 'old team should be deleted because there was only one member who joined a new team.').toBeNull();

}

function teamsTestMain() {
  const setupInfo = setTeamsTestUp();
}