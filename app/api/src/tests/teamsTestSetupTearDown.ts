import type { Event, Team, TeamMember } from '@prisma/client';
import { prisma } from '../config/prismaClient';
import { createTeam } from '../features/teams/teams.controller';

export async function setTeamsTestUp(teamMemberCounts: number[]) {
  try {
    const teamsInfo = await prisma.$transaction(async (tx) => {
      if (!teamMemberCounts) {
        console.error('[ERROR] Teams test setup cannot have empty teamMemberCounts');
        throw new Error('teamMemberCounts cannot be empty');
      }

      const testEvent = await tx.event.create({
        data: {
          name: 'EVENT FOR UNIT TESTING'
        }
      });

      const teamsInfo: TeamInfo[] = [];
      for (let i = 0; i < teamMemberCounts.length; i++) {
        const memberCount = teamMemberCounts[i];
        if (typeof memberCount !== 'number' || memberCount === null || isNaN(memberCount) || memberCount < 0) {
          throw new Error(`Invalid team member count at index ${i}: ${memberCount}`);
        }
        const tempTeam = await createTeam(tx, testEvent.id);
        const teamMembers: TeamMember[] = [];

        for (let j = 0; j < memberCount; j++) {
          const tempProfile = await tx.userProfile.create({
            data: {
              id: crypto.randomUUID(), //db currently uses auth.uid but we are not creating users via normal auth flow for testing
              firstName: `TEAM ${i + 1} TEST MEMBER ${j + 1} FN`,
              lastName: `TEAM ${i + 1} TEST MEMBER ${j + 1} LN`
            }
          });

          const tempTeamMember = await tx.teamMember.create({
            data: {
              teamId: tempTeam.id,
              event_id: testEvent.id,
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
    });

    return teamsInfo;

  } catch (error) {
    console.error('fatal error setting up teams tests', error);
    throw error;
  }
}// Prisma does not support nested transactions so unless the functions we test start to take a transaction, we cannot simply rollback to reverse setup.
export async function cleanTeamsTestUp(setUpInfo: TeamTestSetupInfo) {
  //IN THEORY DELETING THE EVENT SHOULD DELETE THE RELATED TEST TEAMS AND TEAM MEMEBERS VIA DATABASE CASCADES BUT PROFILES WILL REMAIN, WE CLEAN THOSE MANUALLY
  try {
    await prisma.$transaction(async (tx) => {
      await tx.event.delete({
        where: {
          id: setUpInfo.event.id
        }
      });

      const profileIds = [];
      for (const team of setUpInfo.teams) {
        for (const member of team.teamMembers) {
          profileIds.push(member.userId);
        }
      }
      await tx.userProfile.deleteMany({
        where: {
          id: {
            in: profileIds
          }
        }
      });
    });
  } catch (error) {
    console.error('fatal error cleaning up teams tests', error);
    throw error;
  }
}

export interface TeamInfo {
  team: Team;
  teamMembers: TeamMember[];
}

export interface TeamTestSetupInfo {
  event: Event;
  teams: TeamInfo[];
}

