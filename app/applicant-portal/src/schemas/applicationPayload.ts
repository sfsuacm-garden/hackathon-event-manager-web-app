import { RouterInputs } from "@/utils/trpc";
import { z } from "zod";

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    schema,
  );

// Enums copied from Prisma schema so they match exactly.
export const ApplicationStatusEnum = z.enum([
  "pending",
  "rejected",
  "accepted",
  "waitlisted",
]);


export type ApplicationFormValues = RouterInputs["applications"]["createOrUpdate"];