import { joinTeam, kickTeamMember, leaveTeam  } from '../features/teams/teams.controller';
import prisma from '../config/prismaClient';
import type { TeamMember } from '@prisma/client';
import { describe, beforeEach, afterEach, expect, test } from 'vitest';
import { cleanTeamsTestUp, setTeamsTestUp, type TeamTestSetupInfo } from './teamsTestSetupTearDown';

describe('Teams Tests', ()=>{
  
  describe('Team tests where there are 2 teams with one member on each team', ()=> {
    let teamSetupInfo: TeamTestSetupInfo;
    beforeEach(async () => {
      teamSetupInfo = await setTeamsTestUp([1, 1]);
    });

    afterEach(async () => {
      await cleanTeamsTestUp(teamSetupInfo);
    });

    test('join team test', async ()=>{
      await testJoinTeamOneMemPerTeam(teamSetupInfo);
    });
  });

  describe('Team tests where there is only one team with multiple members', ()=> {
    let teamSetupInfo: TeamTestSetupInfo;
    beforeEach(async () => {
      teamSetupInfo = await setTeamsTestUp([2]);
    });

    afterEach(async () => {
      await cleanTeamsTestUp(teamSetupInfo);
    });

    test('kick member team test normal case', async ()=>{
      await testKickFromTeamMainCase(teamSetupInfo);
    });

    test('leave team normal case', async () => {
      await leaveTeamNormalCase(teamSetupInfo);
    });
  });

  describe('Team tests where there are multiple teams with at least one team having >1 member', ()=> {
    let teamSetupInfo: TeamTestSetupInfo;
    beforeEach(async () => {
      teamSetupInfo = await setTeamsTestUp([1, 3]);
    });

    afterEach(async () => {
      await cleanTeamsTestUp(teamSetupInfo);
    });

    test('join team but original team has >1 player', async () => {
      await testJoinTeamAdminAccepts(teamSetupInfo);
    });
    
  });
});

async function testJoinTeamOneMemPerTeam(testInfo: TeamTestSetupInfo) {
  
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

async function testJoinTeamAdminAccepts(testInfo: TeamTestSetupInfo) {
  const teamToJoin = testInfo.teams?.[0];
  expect(teamToJoin).toBeDefined();
    
  const teamBeingLeft = testInfo.teams?.[1];
  expect(teamBeingLeft).toBeDefined();

  const memberLeaving = teamBeingLeft?.teamMembers?.[0];

  expect(memberLeaving, 'member leaving should be defined').toBeDefined();
  expect(memberLeaving?.isAdmin, 'leaving team member should be admin').toBe(true);

  await joinTeam(teamToJoin?.team.id!, teamBeingLeft?.teamMembers[0]?.userId!, testInfo.event.id);
  
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

  const oldTeamMembersDb = await prisma.teamMember.findMany({
    where: {
      teamId: teamBeingLeft?.team.id!,
      isAdmin: true
    },
    orderBy: {
      joinedAt: 'asc'
    },
    take: 1
  });

  expect(oldTeamMembersDb, 'old team should still have members').not.toBeNull();
  expect(oldTeamMembersDb[0]?.isAdmin, 'most recent member should have admin after admin leaves').toBe(true);
  
}

async function testKickFromTeamMainCase(testInfo: TeamTestSetupInfo) {
  // one team with 2 members. Non admin gets kicked.
  // expected passing criteria:
  // new team shall be created with kicked member apart of it
  // kicked member should be admin of new team
  // kicked member shall no longer be on old team

  expect(testInfo.teams, 'teams list cannot be empty').not.toBeNull();

  const origTeam = testInfo.teams[0];
  expect(origTeam?.teamMembers).not.toBeNull();
  expect(origTeam?.teamMembers.length).greaterThan(1);

  await kickTeamMember(origTeam?.teamMembers[0]?.userId!, origTeam?.teamMembers[1]?.userId!, origTeam?.team.id!);

  const origTeamMembersDb = await prisma.teamMember.findMany({
    where: {
      teamId: origTeam!.team.id
    }
  });

  expect(origTeamMembersDb, 'kicking member should not result in no team members existing on original team').not.toBeNull();
  expect(origTeamMembersDb[0]?.isAdmin, 'remaining member should be admin').toBe(true);

  const kickedTeamMemberDb = await prisma.teamMember.findFirst({
    where: {
      userId: origTeam?.teamMembers[1]?.userId! 
    }
  });

  expect(kickedTeamMemberDb?.isAdmin, 'kicked team member should now be admin').toBe(true); 
}

async function leaveTeamNormalCase(testInfo: TeamTestSetupInfo) {
  // in this test a non admin leaves their current team with > 1 player
  // new team should be created with the player who left as admin
  expect(testInfo.teams, 'teams list cannot be empty').not.toBeNull();

  const origTeam = testInfo.teams[0];
  expect(origTeam?.teamMembers).not.toBeNull();
  expect(origTeam?.teamMembers.length).greaterThan(1);

  await leaveTeam(origTeam?.team.id!, origTeam?.teamMembers[1]?.userId!);

  const origTeamMembersDb = await prisma.teamMember.findMany({
    where: {
      teamId: origTeam!.team.id
    }
  });

  expect(origTeamMembersDb, 'Member leaving team should not result in team having no members').not.toBeNull();
  
  const kickedTeamMemberDb = await prisma.teamMember.findFirst({
    where: {
      userId: origTeam?.teamMembers[1]?.userId! 
    }
  });
  expect(kickedTeamMemberDb?.isAdmin, 'kicked team member should now be admin').toBe(true);
}
