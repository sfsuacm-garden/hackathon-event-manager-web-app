import { ComponentPropsWithoutRef } from 'react';
import { Input } from '../shadcn/ui/input';
import { Label } from '../shadcn/ui/label';

type LabeledInputProps = {
  label?: string;
} & ComponentPropsWithoutRef<typeof Input>;

export default function LabeledInput({ label, ...inputProps }: LabeledInputProps) {
  return (
    <div className="space-y-2">
      {label && <Label className="font-semibold">{label}</Label>}
      <Input {...inputProps} />
    </div>
  );
}
