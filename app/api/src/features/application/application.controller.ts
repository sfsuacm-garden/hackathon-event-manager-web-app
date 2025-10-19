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
  const data: Prisma.ApplicationUncheckedUpdateInput = {};

  if (input.schoolEmail !== undefined) data.school_email = input.schoolEmail;
  if (input.school !== undefined) data.school = input.school;
  if (input.schoolId !== undefined) data.schoolId = input.schoolId;

  if (input.graduationYear !== undefined) data.graduationYear = input.graduationYear;
  if (input.experienceLevel !== undefined) data.experienceLevel = input.experienceLevel;

  if (input.levelOfStudy !== undefined) data.levelOfStudy = input.levelOfStudy;
  if (input.countryOfResidence !== undefined) data.countryOfResidence = input.countryOfResidence;
  if (input.linkedinUrl !== undefined) data.linkedinUrl = input.linkedinUrl;

  if (input.mlhAuthorizedPromoEmail !== undefined) data.mlhAuthorizedPromoEmail = input.mlhAuthorizedPromoEmail;
  if (input.mlhAuthorizedDataShare !== undefined) data.mlhAuthorizedDataShare = input.mlhAuthorizedDataShare;
  if (input.mlhCodeOfConductAgreement !== undefined) data.mlhCodeOfConductAgreement = input.mlhCodeOfConductAgreement;

  if (input.dietaryVegetarian !== undefined) data.dietaryVegetarian = input.dietaryVegetarian;
  if (input.dietaryVegan !== undefined) data.dietaryVegan = input.dietaryVegan;
  if (input.dietaryCeliacDisease !== undefined) data.dietaryCeliacDisease = input.dietaryCeliacDisease;
  if (input.dietaryKosher !== undefined) data.dietaryKosher = input.dietaryKosher;
  if (input.dietaryHalal !== undefined) data.dietaryHalal = input.dietaryHalal;

  if (input.gender !== undefined) data.gender = input.gender;
  if (input.pronouns !== undefined) data.pronouns = input.pronouns;
  if (input.raceEthnicity !== undefined) data.raceEthnicity = input.raceEthnicity;
  if (input.sexualOrientation !== undefined) data.sexualOrientation = input.sexualOrientation;
  if (input.educationLevel !== undefined) data.educationLevel = input.educationLevel;
  if (input.tshirtSize !== undefined) data.tshirtSize = input.tshirtSize;
  if (input.majorFieldOfStudy !== undefined) data.majorFieldOfStudy = input.majorFieldOfStudy;

  return data;
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
  const eventProfile = await prisma.eventProfile.create({
    data: {
      eventId,
      profileId: userId, // assuming userId === profileId (if not, fix this)
    },
  });

  // 2️⃣ Return Prisma-compliant data
  return {
    userId,
    eventId,
   
    ...filteredInput,
  };
}

export async function createOrUpdateApplication(ctx: Context, input: CreateApplicationInput) {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not signed in' });
  }

  const userId = ctx.user.id;
  const eventId = ctx.event?.id;
  if (!eventId) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'eventId header is required' });
  }

  const existing = await prisma.application.findUnique({
    where: { eventId_userId: { eventId, userId } }
  });

  const application = existing
    ? await prisma.application.update({
      where: { id: existing.id },
      data: buildUpdateData(input)
    })
    : await prisma.application.create({
      data: await buildCreateData(userId, eventId, input)
    });

  const roleStr =
    (typeof ctx.user.user_metadata?.role === 'string' && ctx.user.user_metadata.role) || 'hacker';
  const roleEnum = toParticipationLevel(roleStr);

  await prisma.eventProfile.upsert({
    where: { profileId_eventId: { profileId: userId, eventId } },
    update: roleEnum ? { role: roleEnum } : {},
    create: {
      profileId: userId,
      eventId,
      ...(roleEnum ? { role: roleEnum } : {})
    }
  });

  return application;
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