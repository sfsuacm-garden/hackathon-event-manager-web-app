import { TRPCError } from '@trpc/server';
import prisma from '../../config/prismaClient';
import { PrismaClient } from '@prisma/client/extension';
import { profile } from 'console';

export async function getTeamById(id: string) {
  try {
    const { eventId } = await prisma.team.findUniqueOrThrow({
      where: {
        id: id
      },
      select: {eventId: true}
    });

    let iHateFknPrismaQueries = await prisma.team.findUnique({
      where: {id: id},
      include: {
        members: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
                applications: {
                  // turned off TS error for this because findUniqueOrThrow should type prevent this from being null/undefined
                  where: {eventId: eventId!}, 
                  select: { 
                    schoolEmail: true, 
                    status: true,
                    createdAt: true
                  },
                  orderBy: {createdAt: 'desc'},
                  take: 1
                }
              }
            }
          }
        }
      }
    });
    // const team = await prisma.team.findUnique({
    //   where: { 
    //     id: id
    //   },
    //   include: {
    //     members: true
    //   }
    // });
    if (!iHateFknPrismaQueries) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Event with ID ${id} not found`
      });
    }

    return iHateFknPrismaQueries;

  } catch (error) {
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch event',
      cause: error
    });
  }
}

// export async function generateInviteLink(teamId: string, isRequestorTeamAdmin: boolean) {
//   if(!isRequestorTeamAdmin) {
//     throw new TRPCError({code: 'FORBIDDEN', message:'in order to generate invite link, user must be a team admin'});
//   }


// }

export async function joinTeam(teamId: string, profileId: string, eventId: string) {
  try {
    const newTeamInfo = await prisma.$transaction(async (tx) => {
      const requestedTeam = await tx.team.findUnique({
        where: {
          id: teamId,
          eventId: eventId
        },
        include: {
          members: true
        }
      });

      if (!requestedTeam) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Team with ID ${teamId} in event with id ${eventId} not found`
        });
      }

      if (requestedTeam.members.length >= 4) { //make an enum or some shit somewhere config or some shit
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Team with ID ${teamId} is full`,
          cause: 'TEAM_FULL'
        });
      }

      // We use find first here because prism throws a fit with findUnique. 
      // Theoretically, should only be one team member entry per event per user
      const prevTeamUserInfo = await tx.teamMember.findFirst({ 
        where: {
          userId: profileId,
          event_id: eventId
        }
      });
      if (!prevTeamUserInfo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `User with ID ${profileId} not found`
        });
      }

      console.log(`is prev team user admin: ${prevTeamUserInfo.isAdmin}`);

      if (prevTeamUserInfo.teamId === teamId) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `User with ID ${profileId} is already part of team with ID ${teamId}`,
          cause: 'USER_ALREADY_MEMBER'
        });
      }

      const newTeamUserInfo = await tx.teamMember.update({
        where: {
          teamId_userId: {
            teamId: prevTeamUserInfo.teamId,
            userId: profileId
          }
        },
        data: {
          teamId: teamId,
          isAdmin: false
        }
      });

      const prevTeamNumMembers = await tx.teamMember.count({
        where: {
          teamId: prevTeamUserInfo.teamId
        }
      });

      //delete the team if previous team member count is 0
      if (newTeamUserInfo && prevTeamNumMembers < 1) { // refactor into a leave team function helper
        const deletedTeam = await tx.team.delete({
          where: {
            id: prevTeamUserInfo.teamId
          }
        });
        console.log(`[SUCCESS] Deleted team with ID ${deletedTeam.id}`);
      } else if (prevTeamUserInfo.isAdmin) {
        await reassignAdminToEarliestJoiningMember(tx, prevTeamUserInfo.teamId);
      }

      console.log(`[SUCCESS] Added ${profileId} to team ${teamId}`);

      //return updated team information with members etc.
      const newTeamAndMembersInfo = tx.team.findUnique({
        where: {
          id: newTeamUserInfo.teamId
        },
        include: {
          members: true
        }
      })
      return newTeamAndMembersInfo;
    });

    console.log(`[SUCCESS] Added ${profileId} to team ${teamId}`);
    return newTeamInfo;

  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch team',
      cause: error
    });
  }
}

export async function leaveTeam(teamId: string, userId: string) {
  try {
    await prisma.$transaction(async (tx) => {

      const prevTeamMemberAndTeamInfo = await tx.teamMember.findUnique({
        where: {
          teamId_userId: {
            teamId: teamId,
            userId: userId
          }
        }
      });
      if (!prevTeamMemberAndTeamInfo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `User with ID ${userId} is not part of team with ID ${teamId}`
        });
      }

      const newTeamInfo = await createTeam(tx, prevTeamMemberAndTeamInfo.event_id);
      await tx.teamMember.update({
        where: {
          teamId_userId: {
            userId: userId,
            teamId: teamId
          }
        },
        data: {
          teamId: newTeamInfo.id,
          isAdmin: true
        }
      });

      const prevTeam = await tx.team.findUnique({
        where: {
          id: prevTeamMemberAndTeamInfo.teamId
        },
        include: {
          members: true
        }
      });

      if (!prevTeam) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Prev team with id ${prevTeamMemberAndTeamInfo.teamId} could not be queried`
        });
      }

      if (prevTeam.members.length < 1) {
        await tx.team.delete({
          where: {
            id: prevTeam.id
          }
        });
      } else if (prevTeamMemberAndTeamInfo.isAdmin) {
        await reassignAdminToEarliestJoiningMember(tx, teamId);
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

export async function kickTeamMember(memberKickingId: string, kickedMemberId: string, teamId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      const memberKickingInfo = await fetchTeamMemberByTeam(tx, memberKickingId, teamId);
      const kickedMemberInfo = await fetchTeamMemberByTeam(tx, kickedMemberId, teamId);

      if(!memberKickingInfo.isAdmin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `Member with id ${memberKickingId} does not have permissions to kick ${kickedMemberId}}`
        });
      }

      if (memberKickingId === kickedMemberId) { //if team admin somehow finds a way to try to kick themselves insted of leaving team, they are dumbass.
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Team admin with ID ${memberKickingId} cannot kick themselves`
        });
      }

      const newTeam = await createTeam(tx, memberKickingInfo.eventId);
      await tx.teamMember.update({
        where: {
          teamId_userId: {
            teamId: teamId,
            userId: kickedMemberInfo.userId
          }
        },
        data: {
          teamId: newTeam.id,
          isAdmin: true
        }
      });
    });
  } catch(error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch event',
      cause: error
    });
  } 
}

// HELPER FUNCTIONS
// helper functions have a prisma client passed in because they can either be ran inside of a transaction
// or outside of a transaction and I could not think of a better way to control that dual behavior.
async function fetchTeamMemberByTeam(tx: PrismaClient, memberId: string, teamId: string) {
  const teamMember = await tx.teamMember.findUnique({
    where: {
      teamId_userId: {
        userId: memberId,
        teamId: teamId
      }
    },
    include: {
      team: true
    }
  });
  if (!teamMember) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `User with id ${memberId} could not be found`
    });
  }

  return teamMember;
}

export async function createTeam(prismaClient: PrismaClient, eventId: string) {
  const numTeamsInEvent = await prismaClient.team.count({
    where: {
      eventId: eventId
    }
  });

  const newTeam = await prismaClient.team.create({
    data: {
      eventId: eventId,
      name: `New Team #${numTeamsInEvent}`
    }
  });

  return newTeam;
}

async function reassignAdminToEarliestJoiningMember(tx: PrismaClient, teamId: string) {
  const nextEarliestTeamMember = await tx.teamMember.findMany({
    where: {
      teamId: teamId
    },
    orderBy: {
      joinedAt: 'asc'
    },
    take: 1 // we want the most earliest team member
  });
  if (nextEarliestTeamMember && nextEarliestTeamMember[0]) {
    await tx.teamMember.update({
      where: {
        teamId_userId: {
          userId: nextEarliestTeamMember[0].userId,
          teamId: nextEarliestTeamMember[0].teamId
        }
      },
      data: {
        isAdmin: true
      }
    });
  }
}