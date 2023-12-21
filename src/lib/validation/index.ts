import * as z from 'zod'

export const SignupValidation = z.object({
    username: z.string().min(2, { message: 'El nombre de usuario debe tener al menos 2 caracteres' }).max(50),
  })