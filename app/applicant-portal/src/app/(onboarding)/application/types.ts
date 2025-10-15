import z from "zod";

export type TextField = { type: "text"; label: string; fillerText: string, helperText?: string, };
export type DropdownField = {
  type: "dropdown";
  label: string;
  fillerText: string;
  options: { value: string; label: string }[];
  helperText?: string;
};
export type CheckboxField = {
  type: "checkbox";
  label: string | React.ReactNode;
  helperText?: string,
};
export type CheckboxGroupField = {
  type: "checkbox-group";
  title: string;
  options: { name: string; label: string }[];
  helperText?: string,
};

export type CountryDropdownField = { type: "country-dropdown"; label: string };

export type FormField =
  | TextField
  | DropdownField
  | CheckboxField
  | CheckboxGroupField
  | CountryDropdownField;

export type StepConfig<Schema extends z.ZodTypeAny> = {
  key: string;
  label: string;
  description?: string;
  schema: Schema;
  fields: Record<string, FormField>;
  seperateLastFieldWithLine?: boolean;
};