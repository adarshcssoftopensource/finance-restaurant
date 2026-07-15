import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type TextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  className?: string;
} & Omit<React.ComponentProps<typeof Input>, "name" | "value" | "defaultValue">;

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  id,
  onChange,
  ...inputProps
}: TextFieldProps<T>) {
  const fieldId = id ?? String(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={!!fieldState.error}
          className={cn(className, "gap-0")}
        >
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          <Input
            id={fieldId}
            {...field}
            {...inputProps}
            onChange={(event) => {
              onChange?.(event);
              if (!onChange) field.onChange(event);
            }}
            aria-invalid={!!fieldState.error}
          />
          {description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  className?: string;
};

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  className,
}: SelectFieldProps<T>) {
  const fieldId = String(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={!!fieldState.error}
          className={cn(className, "gap-0")}
        >
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={fieldId} aria-invalid={!!fieldState.error}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}

export function AuthHeading({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      {children}
      <h2 className="text-[25px] font-extrabold tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground [&_b]:font-bold [&_b]:text-ink2">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function AuthProgress({
  step,
  total,
  label,
}: {
  step: number;
  total: number;
  label: string;
}) {
  return (
    <div className="mb-[18px]">
      <div className="flex justify-between font-mono text-[10px] font-bold tracking-[0.08em] text-muted-foreground">
        <b className="text-coral-d">
          STEP {step} OF {total}
        </b>
        <span>{label}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded bg-line">
        <div
          className="h-full rounded bg-primary transition-[width] duration-300"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function AuthBackLink({
  to,
  onClick,
  children = "BACK",
}: {
  to?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  const className = cn(
    "mb-4 inline-flex items-center gap-1.5 rounded-lg px-1 py-1 font-mono text-[10.5px] font-semibold text-muted-foreground hover:bg-line2 hover:text-foreground",
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <BackIcon />
        {children}
      </button>
    );
  }

  return (
    <a href={to} className={className}>
      <BackIcon />
      {children}
    </a>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function ToastAuthButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-foreground bg-card px-3 py-3 text-sm font-bold transition-colors hover:bg-line2"
    >
      <span className="grid size-6 place-items-center rounded-[7px] bg-foreground text-xs font-extrabold text-white">
        T
      </span>
      {children}
    </button>
  );
}

export function AuthOrDivider({ children = "OR" }: { children?: string }) {
  return (
    <div className="my-[18px] flex items-center gap-3 font-mono text-[10px] tracking-widest text-faint">
      <span className="h-px flex-1 bg-line" />
      {children}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export function AuthCta({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="submit"
      className={cn(
        "mt-[22px] flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3.5 text-[15px] font-extrabold text-primary-foreground transition-[background,transform] hover:bg-coral-d active:scale-[0.985]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AuthLegal({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-center text-[11.5px] leading-relaxed text-muted-foreground [&_a]:font-semibold [&_a]:text-ink2">
      {children}
    </p>
  );
}
