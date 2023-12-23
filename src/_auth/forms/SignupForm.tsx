import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { SignupValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSingInAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'

interface SignupFormValues {
  name: string
  username: string
  email: string
  password: string
}

const SignupForm = () => {
  /*Toast hook */
  const { toast } = useToast()
  const navigate = useNavigate()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSingInAccount()

  async function onSubmit(values: SignupFormValues) {
    console.log(values)
    const newUser = await createUserAccount(values)
    console.log(newUser)
    if (!newUser) {
      return toast({
        title: "Registro fallido. Porfavor intetelo nuevamente",
      })
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session) {
      return toast({
        title: 'Sesión fallida. Porfavor intelelo nuevamente'
      })
    }
    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn){
      form.reset()

      navigate('/')
    } else {
      return toast({
        title: 'Inicio de sesión fallida, porfavor intetelo denuevo'
      })
    }
  }
  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src='/assets/images/logo.svg' alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
          Crea una nueva cuenta
        </h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          Para usar Snapgram, porfavor ingresa tus datos
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-5 w-9/12 md:w-2/3 mt-4 lg:w-5/12 xl:w-[400px]'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  className={`shad-input ${
                    form.formState.errors.name ? 'text-red' : ''
                  }`}
                  placeholder='Ingrese su nombre'
                  {...field}
                />
              </FormControl>
              <FormMessage
                className={`${form.formState.errors.name ? 'text-red' : ''}`}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input
                  className={`shad-input ${
                    form.formState.errors.username ? 'text-red' : ''
                  }`}
                  placeholder='Ingrese su usuario'
                  {...field}
                />
              </FormControl>
              <FormMessage
                className={`${
                  form.formState.errors.username ? 'text-red' : ''
                }`}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input
                  placeholder='Ingrese su correo'
                  {...field}
                  type='email'
                  className={`shad-input ${
                    form.formState.errors.email ? 'text-red' : ''
                  }`}
                />
              </FormControl>
              <FormMessage
                className={`${form.formState.errors.email ? 'text-red' : ''}`}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder='Ingrese su contraseña'
                  {...field}
                  type='password'
                  className={`shad-input ${
                    form.formState.errors.password ? 'text-red' : ''
                  }`}
                />
              </FormControl>
              <FormMessage
                className={`${
                  form.formState.errors.password ? 'text-red' : ''
                }`}
              />
            </FormItem>
          )}
        />
        <Button type='submit' className='shad-button_primary'>
         {isCreatingAccount || isSigningInUser || isUserLoading && <div className='flex-center gap-2'><Loader /> Cargando...</div>}
         {!isCreatingAccount && !isSigningInUser && !isUserLoading && <div className='flex-center gap-2'>Registrarse</div>}
        </Button>

        <p className='text-small-regular text-light-2 text-center mt-2'>
          ¿Ya tienes una cuenta ?
          <Link to="/iniciar-sesion" className='text-primary-500 text-small-semibold ml-1'>Acceder</Link>
        </p>
      </form>
    </Form>
  )
}

export default SignupForm
