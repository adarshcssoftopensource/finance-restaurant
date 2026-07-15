import { z } from "zod";

const password = z
  .string()
  .min(10, "At least 10 characters")
  .regex(/[0-9]|[^A-Za-z0-9]/, "Include a number or symbol");

export const signInSchema = z.object({
  email: z.email("Enter a valid work email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export const mfaSchema = z.object({
  code: z
    .string()
    .length(6, "Enter all 6 digits")
    .regex(/^\d{6}$/, "Digits only"),
});

export const signUpAccountSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.email("Enter a valid work email"),
  password,
});

export const signUpRestaurantSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant name is required"),
  locations: z.enum(["1", "2-5", "6-20", "20+"]),
  pos: z.enum(["toast", "square", "clover", "other"]),
  city: z.string().min(2, "City is required"),
});

export const kybBusinessSchema = z.object({
  legalName: z.string().min(2, "Legal business name is required"),
  dba: z.string().optional(),
  entityType: z.enum([
    "llc",
    "corporation",
    "partnership",
    "sole-proprietorship",
    "nonprofit",
  ]),
  ein: z.string().regex(/^\d{2}-\d{7}$/, "Use format 12-3456789"),
  formationState: z.string().min(1, "Select a state"),
  phone: z.string().min(10, "Enter a valid phone number"),
  address: z.string().min(5, "Enter the registered address"),
});

export const ownerSchema = z.object({
  fullName: z.string().min(2, "Full legal name is required"),
  role: z.string().min(1, "Select a role"),
  dob: z.string().min(8, "Enter date of birth"),
  ssn: z.string().min(9, "Enter SSN"),
  homeAddress: z.string().min(5, "Enter home address"),
  ownershipPct: z.string().min(1, "Enter ownership %"),
  isOwner: z.enum(["yes", "no"]),
});

export const beneficialOwnerSchema = z.object({
  fullName: z.string().min(2, "Full legal name is required"),
  ownershipPct: z.string().min(1, "Enter ownership %"),
  dob: z.string().min(8, "Enter date of birth"),
  ssn: z.string().min(9, "Enter SSN"),
  homeAddress: z.string().min(5, "Enter home address"),
});

export const kybOwnersSchema = z.object({
  controlPerson: ownerSchema,
  extraOwners: z.array(beneficialOwnerSchema),
  certified: z.boolean().refine((value) => value, {
    message: "You must certify this information",
  }),
});

export const kybBankSchema = z
  .object({
    nickname: z.string().min(2, "Account nickname is required"),
    routing: z.string().regex(/^\d{9}$/, "Routing number must be 9 digits"),
    accountType: z.enum(["checking", "savings"]),
    accountNumber: z.string().min(4, "Enter account number"),
    confirmAccountNumber: z.string().min(4, "Confirm account number"),
  })
  .refine((data) => data.accountNumber === data.confirmAccountNumber, {
    message: "Account numbers must match",
    path: ["confirmAccountNumber"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid work email"),
});

export const resetPasswordSchema = z
  .object({
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignInValues = z.infer<typeof signInSchema>;
export type MfaValues = z.infer<typeof mfaSchema>;
export type SignUpAccountValues = z.infer<typeof signUpAccountSchema>;
export type SignUpRestaurantValues = z.infer<typeof signUpRestaurantSchema>;
export type KybBusinessValues = z.infer<typeof kybBusinessSchema>;
export type KybOwnersValues = z.infer<typeof kybOwnersSchema>;
export type KybBankValues = z.infer<typeof kybBankSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
