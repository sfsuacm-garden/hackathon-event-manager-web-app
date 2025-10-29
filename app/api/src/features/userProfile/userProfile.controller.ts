import type z from 'zod';
import prisma from '../../config/prismaClient';
import type { UserProfileCreateInputObjectSchema } from '../../zod/schemas';

export async function createUserProfile(input: z.infer<typeof UserProfileCreateInputObjectSchema>) {
  try {
    const existingProfile = await prisma.userProfile.findUnique({
      where: { id: input.id }
    });

    if (existingProfile) {
      return existingProfile;
    }

    const profile = await prisma.userProfile.create({
      data: { ...input }
    });

    return profile;
  } catch (error: any) {
    console.error('❌ Error creating user profile:', error);
    throw new Error(error.message ?? 'Failed to create user profile');
  }
}

export async function getUserProfileById(id: string) {
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { id: id }
    });
    return profile;
  } catch (error: any) {
    console.error('❌ Error getting user profile:', error);
    throw new Error(error.message ?? 'Failed to get user profile');
  }
}
