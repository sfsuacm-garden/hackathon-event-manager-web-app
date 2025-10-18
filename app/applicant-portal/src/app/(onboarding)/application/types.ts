import z from "zod";

export type TextField = { type: "text"; label: string; fillerText: string, helperText?: string, };

export type OtherOptionField = { hasOtherOption?: boolean;
  otherLabel?: string;
}
export type DropdownField = OtherOptionField & {
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

export type OtherTextField = TextField & {
    field_name: string;
}
export type CheckboxGroupField = {
  type: "checkbox-group";
  label: string;
  options: { name: string; label: string }[];
  helperText?: string,
};

export type CountryDropdownField = { type: "country-dropdown"; label: string };
export type SchoolComboboxField = OtherOptionField & { 
  type: "school-combobox"; 
  label: string; 
  fillerText: string;
  helperText?: string;
};

export type FormField =
  | TextField
  | DropdownField
  | CheckboxField
  | CheckboxGroupField
  | CountryDropdownField
  | SchoolComboboxField;

export type StepConfig<Schema extends z.ZodTypeAny> = {
  key: string;
  label: string;
  description?: string;
  schema: Schema;
  fields: Record<string, FormField>;
  seperateLastFieldWithLine?: boolean;
};
