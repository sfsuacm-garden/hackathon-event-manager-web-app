import { TRPCError } from '@trpc/server';
import prisma from '../../config/prismaClient';

type LookupResult =
  | { result: 'not_found' }
  | { result: 'not_accepted'; applicationId: string }
  | { result: 'already_checked_in'; applicationId: string; checkedInAt: string }
  | { result: 'ready'; applicationId: string };

export async function lookupCheckInByUserId(eventId: string, userId: string): Promise<LookupResult> {
  if (!eventId) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Missing x-event-id' });
  }

  const application = await prisma.application.findUnique({
    where: { eventId_userId: { eventId, userId } },
    select: {
      id: true,
      status: true,
      checkedIn: true,
      checkedInAt: true
    }
  });

  if (!application) return { result: 'not_found' };

  if (application.status !== 'accepted') {
    return { result: 'not_accepted', applicationId: application.id };
  }

  const alreadyCheckedIn = application.checkedIn || application.checkedInAt !== null;
  if (alreadyCheckedIn) {
    return {
      result: 'already_checked_in',
      applicationId: application.id,
      checkedInAt: application.checkedInAt?.toISOString() ?? ''
    };
  }

  return { result: 'ready', applicationId: application.id };
}

type CheckInResult =
  | { result: 'not_found' }
  | { result: 'not_accepted'; applicationId: string }
  | { result: 'already_checked_in'; applicationId: string; checkedInAt: string }
  | { result: 'checked_in'; applicationId: string; checkedInAt: string };

export function checkInUserById(
  eventId: string,
  actorUserId: string,
  scannedUserId: string
): Promise<CheckInResult> {
  if (!eventId) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Missing x-event-id' });
  }
  if (!actorUserId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return prisma.$transaction(async (tx) => {
    const application = await tx.application.findUnique({
      where: { eventId_userId: { eventId, userId: scannedUserId } },
      select: {
        id: true,
        status: true,
        checkedIn: true,
        checkedInAt: true
      }
    });

    if (!application) return { result: 'not_found' };

    if (application.status !== 'accepted') {
      return { result: 'not_accepted', applicationId: application.id };
    }

    const alreadyCheckedIn = application.checkedIn || application.checkedInAt !== null;
    if (alreadyCheckedIn) {
      return {
        result: 'already_checked_in',
        applicationId: application.id,
        checkedInAt: application.checkedInAt?.toISOString() ?? ''
      };
    }

    const updated = await tx.application.update({
      where: { id: application.id },
      data: {
        checkedIn: true,
        checkedInAt: new Date()
      },
      select: { id: true, checkedInAt: true }
    });

    return {
      result: 'checked_in',
      applicationId: updated.id,
      checkedInAt: updated.checkedInAt?.toISOString() ?? ''
    };
  });
}