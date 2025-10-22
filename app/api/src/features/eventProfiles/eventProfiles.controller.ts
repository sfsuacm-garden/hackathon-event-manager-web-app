import prisma from "../../config/prismaClient";


export async function getEventProfileById(
  userId: string,
  eventId: string,
  includeProfile = false
) {
  const eventProfile = await prisma.eventProfile.findUnique({
    where: {
      profileId_eventId: {
        profileId: userId,
        eventId,
      },
    },
    include: includeProfile
      ? { profile: true }
      : undefined,
  });

  // There are legitimate instances in which not returning a profile is legitimate thus
  // no data is not an error.
  return eventProfile;
}
