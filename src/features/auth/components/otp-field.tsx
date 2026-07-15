import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type OtpFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
};

export function OtpField<T extends FieldValues>({
  control,
  name,
}: OtpFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={!!fieldState.error}>
          <InputOTP
            maxLength={6}
            value={field.value}
            onChange={field.onChange}
            aria-invalid={!!fieldState.error}
          >
            <InputOTPGroup className="mt-5 w-full justify-between gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
