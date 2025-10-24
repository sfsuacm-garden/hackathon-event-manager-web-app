import { Prisma, participation_level } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import prisma from '../../config/prismaClient';
import type { Context } from '../../core/context';
import type { ApplicationCreate as CreateApplicationInput } from './application.schemas';

function toParticipationLevel(s?: string): participation_level | null {
  const norm = (s ?? '').toLowerCase();
  if (norm === 'hacker') return participation_level.hacker;
  if (norm === 'judge') return participation_level.judge;
  if (norm === 'organizer' || norm === 'mentor') return participation_level.organizer;
  return null;
}

function buildUpdateData(input: CreateApplicationInput): Prisma.ApplicationUncheckedUpdateInput {
  // Filter out undefined values
  return Object.fromEntries(
    Object.entries(input).filter(([_, value]) => value !== undefined)
  ) as Prisma.ApplicationUncheckedUpdateInput;
}

async function buildCreateData(
  userId: string,
  eventId: string,
  input: Partial<CreateApplicationInput>
): Promise<Prisma.ApplicationUncheckedCreateInput> {
  const filteredInput = Object.fromEntries(
    Object.entries(input).filter(([_, v]) => v !== undefined)
  ) as Partial<CreateApplicationInput>;

  // 1️⃣ Create or find the user's eventProfile
  await prisma.eventProfile.create({
    data: {
      eventId,
      profileId: userId // assuming userId === profileId (if not, fix this)
    }
  });

  // 2️⃣ Return Prisma-compliant data
  return {
    userId,
    eventId,
    ...filteredInput
  };
}

export async function createOrUpdateApplication(
  userId: string,
  eventId: string,
  input: CreateApplicationInput
) {
  if (!eventId) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'eventId header is required' });
  }

  //TODO clarify this later on with different roles.
  await prisma.$transaction(async (tx) => {
    const existing = await tx.application.findUnique({
      where: { eventId_userId: { eventId, userId } }
    });

    const application = existing
      ? await tx.application.update({
          where: { id: existing.id },
          data: buildUpdateData(input)
        })
      : await tx.application.create({
          data: await buildCreateData(userId, eventId, input)
        });

    const roleStr = 'hacker';
    const roleEnum = toParticipationLevel(roleStr);

    const eventProfile = await tx.eventProfile.upsert({
      where: { profileId_eventId: { profileId: userId, eventId } },
      update: roleEnum ? { role: roleEnum } : {},
      create: {
        profileId: userId,
        eventId,
        ...(roleEnum ? { role: roleEnum } : {})
      }
    });

    return { application, eventProfile };
  });
}

export async function getMyApplication(ctx: Context) {
  const { user, event } = ctx;
  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  if (!event) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Missing x-event-id' });
  }

  const application = await prisma.application.findFirst({
    where: { userId: user.id, eventId: event.id }
  });

  return application;
}
