import { z } from 'zod'

// ── Step 1: Personal Info ─────────────────────────────────────────────────────
export const personalSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required.')
    .min(2, 'Must be at least 2 characters.')
    .trim(),

  lastName: z
    .string()
    .min(1, 'Last name is required.')
    .min(2, 'Must be at least 2 characters.')
    .trim(),

  dob: z
    .string()
    .min(1, 'Date of birth is required.')
    .superRefine((val, ctx) => {
      const entered = new Date(val + 'T00:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (entered >= today) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Date of birth cannot be today or in the future.',
        })
        return
      }

      const minYear = today.getFullYear() - 150
      if (entered.getFullYear() < minYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Enter a valid date of birth.',
        })
      }
    }),
})

// ── Step 2: Account Details ───────────────────────────────────────────────────
// Base object defined separately so fullSchema can reference its .shape directly.
// ZodEffects (from .refine) does not expose .shape — this avoids that pitfall.
const accountBase = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .refine((val) => val.includes('@'), {
      message: 'Email must contain an @ symbol.',
    })
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Enter a valid email address.',
    }),

  password: z.string().superRefine((val, ctx) => {
    if (val.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password is required.',
      })
      return
    }
    if (val.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Password must be at least 8 characters (${val.length}/8).`,
      })
    }
  }),

  confirmPassword: z.string().min(1, 'Please confirm your password.'),
})

export const accountSchema = accountBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  }
)

// ── Full payload schema (used for final validation before API submit) ─────────
// confirmPassword is a UI-only field — it does not belong in the API payload.
export const fullSchema = z.object({
  firstName: personalSchema.shape.firstName,
  lastName: personalSchema.shape.lastName,
  dob: personalSchema.shape.dob,
  email: accountBase.shape.email,
  password: accountBase.shape.password,
})

