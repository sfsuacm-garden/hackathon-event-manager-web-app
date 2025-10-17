import { TRPCError } from "@trpc/server";
import prisma from "../../config/prismaClient";
import { getSchoolsByQuerySchema, type GetSchoolsQuerySchema } from "./schools.schemas";

export async function getSchoolById(id: string) {
  try {
    const school = await prisma.school.findUnique({ where: { id } });

    if (!school) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `School with ID ${id} not found`
      });
    }
    return school;
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch event',
      cause: error
    });
  }
}


export async function getSchoolsByQuery(query: GetSchoolsQuerySchema) {
    try {
        const params = getSchoolsByQuerySchema.parse(query);
        const schools = await prisma.school.findMany(params);
        console.log(schools)
        return schools;
    } catch (error) {
        if (error instanceof TRPCError) throw error;

        console.log(error);
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch schools',
            cause: error
        });
    }
}

export async function getSchoolByEmailDomain(domain: string) {
  try {
    // Normalize the domain to lowercase for consistent matching
    const normalizedDomain = domain.toLowerCase().trim();
    
    if (!normalizedDomain) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Domain cannot be empty'
      });
    }

    // Find the school email domain record
    const schoolEmailDomain = await prisma.schoolEmailDomain.findFirst({
      where: {
        domain: normalizedDomain
      },
      include: {
        school: true
      }
    });

    if (!schoolEmailDomain) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No school found for domain: ${domain}`
      });
    }

    return schoolEmailDomain.school;
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch school by email domain',
      cause: error
    });
  }
}

