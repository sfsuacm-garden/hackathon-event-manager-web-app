'use client';

import { createClient } from '@/utils/supabase/client';
import { z } from 'zod';
import { ApplicationPayload as ApplicationPayloadSchema } from '@/schemas/applicationPayload';

type FormValues = z.input<typeof ApplicationPayloadSchema>;

const EVENT_ID = '8924dd52-1358-4853-9871-c9e0fe46cb30';

function toDbRow(v: FormValues, userId: string) {
  const row: Record<string, unknown> = {
    user_id: userId,
    event_id: EVENT_ID,

    school_email: v.schoolEmail ?? null,
    school: v.school ?? null,
    graduation_year:
      typeof v.graduationYear === 'string'
        ? (v.graduationYear ? Number(v.graduationYear) : null)
        : v.graduationYear ?? null,
    major_field_of_study: v.majorFieldOfStudy ?? null,
    level_of_study: v.levelOfStudy ?? null,

    country_of_residence: v.countryOfResidence ?? null,
    gender: v.gender ?? null,
    pronouns: v.pronouns ?? null,
    race_ethnicity: v.raceEthnicity ?? null,
    sexual_orientation: v.sexualOrientation ?? null,
    education_level: v.educationLevel ?? null,
    tshirt_size: v.tshirtSize ?? null,

    dietary_vegetarian: v.dietaryVegetarian ?? null,
    dietary_vegan: v.dietaryVegan ?? null,
    dietary_celiac_disease: v.dietaryCeliacDisease ?? null,
    dietary_kosher: v.dietaryKosher ?? null,
    dietary_halal: v.dietaryHalal ?? null,

    mlh_authorized_promo_email: v.mlhAuthorizedPromoEmail ?? null,
    mlh_authorized_data_share: v.mlhAuthorizedDataShare ?? null,
    mlh_code_of_conduct_aggreemeant: v.mlhCodeOfConductAgreement ?? null,
  };

  for (const k of Object.keys(row)) {
    if (row[k] === undefined) delete row[k];
  }
  return row;
}

export async function submitApplicationDemo(form: FormValues) {
  const supabase = createClient();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr) throw new Error(userErr.message);
  if (!user) throw new Error('Not signed in');

  const appRow = toDbRow(form, user.id);

  const { data: app, error: upsertErr } = await supabase
    .from('applications')
    .upsert(appRow, { onConflict: 'event_id,user_id' })
    .select()
    .single();

  if (upsertErr) throw new Error(upsertErr.message);

  const role = (user.user_metadata?.role as string) || 'hacker';
  const { error: epErr } = await supabase
    .from('event_profiles')
    .upsert(
      { event_id: EVENT_ID, profile_id: user.id, role },
      { onConflict: 'event_id,profile_id' }
    );

  if (epErr) throw new Error(epErr.message);

  return app;
}