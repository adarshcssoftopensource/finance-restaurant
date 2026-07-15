import { useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function passwordStrength(value: string) {
  let score = 0;
  if (value.length >= 10) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  if (value.length >= 14) score++;
  return score;
}

type PasswordFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  showMeter?: boolean;
};

export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  showMeter = false,
}: PasswordFieldProps<T>) {
  const fieldId = String(name);
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const strength = showMeter ? passwordStrength(field.value ?? "") : 0;

        return (
          <Field data-invalid={!!fieldState.error} className="gap-0">
            <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
            <div className="relative">
              <Input
                id={fieldId}
                type={visible ? "text" : "password"}
                className="pr-16"
                {...field}
                aria-invalid={!!fieldState.error}
              />
              <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-lg px-2 py-1.5 font-mono text-[10.5px] font-bold text-muted-foreground hover:bg-line2 hover:text-foreground"
              >
                {visible ? "HIDE" : "SHOW"}
              </button>
            </div>
            {showMeter ? (
              <div
                className={cn(
                  "mt-2 flex gap-1",
                  strength > 0 && `s${strength}`,
                )}
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <i
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded bg-line transition-colors",
                      strength >= 1 && i === 0 && "bg-coral-d",
                      strength >= 2 && i <= 1 && "bg-warning",
                      strength >= 3 && i <= 2 && "bg-success",
                      strength >= 4 && "bg-success",
                    )}
                  />
                ))}
              </div>
            ) : null}
            {description ? (
              <FieldDescription className="mt-1">
                {description}
              </FieldDescription>
            ) : null}
            <FieldError errors={[fieldState.error]} />
          </Field>
        );
      }}
    />
  );
}
