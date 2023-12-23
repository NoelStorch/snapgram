import * as z from 'zod'

export const SignupValidation = z.object({
    name: z.string().min(2, { message: 'Debe ingresar un nombre con almenos 2 carácteres' }),
    username: z.string().min(2, { message: 'El nombre de usuario debe tener al menos 2 carácteres' }).max(50),
    email: z.string().email({ message: 'El email es inválido'}),
    password: z.string().min(8, { message: 'Contraseña no debe ser inferior a 8 digitos'})
  })

export const SigninValidation = z.object({
    email: z.string().email({ message: 'El email es inválido'}),
    password: z.string().min(8, { message: 'Contraseña no debe ser inferior a 8 digitos'})
  })