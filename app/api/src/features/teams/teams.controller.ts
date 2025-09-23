import { TRPCError } from "@trpc/server";
import prisma from "../../config/prismaClient";
import { PrismaClient } from "@prisma/client/extension";

export async function getTeamById(id: string) {
  try {
    const team = await prisma.event.findUnique({ where: { id } });
    if (!team) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Event with ID ${id} not found`
      });
    }

    return team;
  } catch (error) {
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch event',
      cause: error
    });
  }
}

export async function joinTeam(teamId: string, profileId: string) {
  try {
    const teamMember = await prisma.$transaction(async (tx) => {
      const requestedTeam = await tx.team.findUnique({
        where: {
          id: teamId
        },
        include: {
          teamMembers: true
        }
      });

      if (!requestedTeam) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Team with ID ${teamId} not found`
        });
      }

      if (requestedTeam.teamMembers.length >= 4) { //make an enum or some shit somewhere config or some shit
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Team with ID ${teamId} is full`
        });
      }

      const userCurrTeamInfo = await tx.teamMember.findUnique({ where: { userId: profileId } });
      if (!userCurrTeamInfo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `User with ID ${profileId} not found`
        });
      }

      if (userCurrTeamInfo.teamId === teamId) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `User with ID ${profileId} is already part of team with ID ${teamId}`
        });
      }

      const prevTeamId = userCurrTeamInfo.teamId;

      const updateTeamMember = await tx.teamMember.update({
        where: {
          userId: profileId
        },
        data: {
          teamId: teamId
        }
      });

      const prevTeamNumMembers = await tx.teamMember.count({
        where: {
          teamId: userCurrTeamInfo.teamId
        }
      });

      //delete the team if previous team member count is 0
      if (updateTeamMember && prevTeamNumMembers < 1) { // refactor into a leave team function helper
        const deletedTeam = await tx.team.delete({
          where: {
            id: prevTeamId
          }
        });

        console.log(`[SUCCESS] Deleted team with ID ${deletedTeam.id}`);
      }

      console.log(`[SUCCESS] Added ${profileId} to team ${teamId}`);
      return updateTeamMember;
    });

    console.log(`[SUCCESS] Added ${profileId} to team ${teamId}`);
    return teamMember;

  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch event',
      cause: error
    });
  }
}

export async function leaveTeam(teamId: string, userId: string) {
  try {
    await prisma.$transaction(async (tx) => {

      const prevTeamMemberAndTeamInfo = await tx.teamMember.findUnique({
        where: {
          userId: userId
        },
        include: {
          teams: true
        }
      });
      if (!prevTeamMemberAndTeamInfo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `User with ID ${userId} is not part of team with ID ${teamId}`
        });
      }

      //create team
      const newTeamInfo = await createTeam(tx, "new Team", prevTeamMemberAndTeamInfo.eventId);
      await tx.teamMember.update({
        where: {
          userId: userId
        },
        data: {
          teamId: newTeamInfo.id,
          isAdmin: true
        }
      });

      //previous team checks
      const prevTeam = await tx.team.findUnique({
        where: {
          id: prevTeamMemberAndTeamInfo.teamId
        },
        include: {
          teamMembers: true
        }
      });

      if (!prevTeam) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Prev team with id ${prevTeamMemberAndTeamInfo.teamId} could not be queried`
        });
      }

      if (prevTeam.teamMembers.length < 1) {
        await tx.team.delete({
          where: {
            id: prevTeam.id
          }
        });
      } else if (prevTeamMemberAndTeamInfo.isAdmin) {
        const nextEarliestTeamMember = await tx.teamMember.findMany({
          where: {
            teamId: prevTeamMemberAndTeamInfo.teamId,
            NOT: {
              userId: userId
            }
          },
          orderBy: {
            joinedAt: 'desc'
          },
          take: 1 // we want the most earliest team member
        });
        if (nextEarliestTeamMember) {
          tx.teamMember.update({
            where: {
              userId: nextEarliestTeamMember[0]?.userId
            },
            data: {
              isAdmin: true
            }
          });
        }
      }

    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch event',
      cause: error
    });
  }
}

//because this is mostly used as a helper and often used in a sequence of sql operations
//intended to be done in a single transaction, we pass a transaction obejct to it or a regular prisma
//client object so there is the option inside transaction or outside.
async function createTeam(prismaClient: PrismaClient, adminName: string, eventId: string) {
  const newTeam = await prismaClient.teams.create({
    data: {
      eventId: eventId,
      name: adminName + "'s team"
    }
  });

  return newTeam;
}