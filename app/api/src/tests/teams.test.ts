import { joinTeam, kickTeamMember, getTeamById, leaveTeam, createTeam  } from '../features/teams/teams.controller';
import prisma from '../config/prismaClient';
import type { Event, Team, TeamMember, UserProfile } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';
import { describe, beforeEach, afterEach, expect, test } from "vitest";

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


describe('Team tests', ()=>{
  let teamSetupInfo: TeamTestSetupInfo;
  beforeEach(async () => {
    teamSetupInfo = await setTeamsTestUp();
  });

  afterEach(async () => {
    await cleanTeamsTestUp(teamSetupInfo);
  });

  test('join team test', ()=>{

  });
});

async function cleanTeamsTestUp(tx: PrismaClient, setUpInfo: TeamTestSetupInfo) {
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
  // this scenario occurs when player 1 is on team 1, player 2 is on team 2
  // player 2 joins player 1's team.
  // expected behavior:
    // Player 1 is admin player 2 no longer admin
    // Player 2 is part of player 1's team
    // Player 2's team no longer exists.

  await joinTeam(testInfo.team1.id, testInfo.profile2.id, testInfo.event.id);
  
}

function teamsTestMain() {
  const setupInfo = setTeamsTestUp();
}