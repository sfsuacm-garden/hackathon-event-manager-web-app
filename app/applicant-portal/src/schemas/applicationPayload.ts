import { RouterInputs } from "@/utils/trpc";
import { z } from "zod";

// Enums copied from Prisma schema so they match exactly.
export const ApplicationStatusEnum = z.enum([
  "pending",
  "rejected",
  "accepted",
  "waitlisted",
]);


export type ApplicationFormValues = RouterInputs["applications"]["createOrUpdate"];