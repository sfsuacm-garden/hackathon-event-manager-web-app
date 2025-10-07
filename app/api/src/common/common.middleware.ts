import { TRPCError } from '@trpc/server';
import { t } from '../core/trpc';
import prisma from '../config/prismaClient';

export const requireAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user // makes sure `ctx.user` is strongly typed in downstream resolvers
    }
  });
});

export const requireEventAccess = requireAuth.unstable_pipe(({ ctx, next }) => {
  if (!ctx.event) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  prisma.eventProfile.findUnique({
    where: {
      profileId_eventId: {
        profileId: ctx.user?.id,
        eventId: ctx.event.id
      }
    }
  });

  return next({
    ctx: {
      ...ctx,
      event: ctx.event
    }
  });
});

export const requireEventUnlocked = t.middleware(({ ctx, next }) => {
  if (!ctx.event) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  if (!ctx.event.isTeamManagementOpen) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      ...ctx
    }
  });
});

export const requireTeam = requireAuth.unstable_pipe(async({ ctx, next }) => {
  const teamAndMember = await prisma.teamMember.findFirst({
    where: {
      userId: ctx.user?.id!,
      event_id: ctx.event?.id!
    },
    include: {
      team: true
    }
  });

  if(!teamAndMember) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User is not part of any team for this event' });
  }

  return next({
    ctx:{
      ...ctx,
      teamId: teamAndMember.teamId,
      isTeamAdmin: teamAndMember.isAdmin
    }
  });
});

// Protected base procedure
export const protectedProcedure = t.procedure.use(requireAuth);

// event-scoped procedure
export const eventProcedure = protectedProcedure.use(requireEventAccess);

// team-management scoped procedure
export const teamManagementProcedure = eventProcedure.use(requireEventUnlocked);

// getting team information middleware
export const teamProcedure = t.procedure.use(requireAuth).use(requireTeam);
