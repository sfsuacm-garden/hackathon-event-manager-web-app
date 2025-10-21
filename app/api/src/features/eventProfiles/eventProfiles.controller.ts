import { TRPCError } from "@trpc/server";
import prisma from "../../config/prismaClient";

export async function getEventProfileById(userId: string, eventId: string) {
  try {
    const profile = await prisma.eventProfile.findUnique({
      where: {
        profileId_eventId: {
          profileId: userId,
          eventId: eventId,
        }
      }
    });

    if (!profile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Event profile not found for user ${userId} and event ${eventId}`
      });
    }
    
    return profile;
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch event profile',
      cause: error
    });
  }
}
