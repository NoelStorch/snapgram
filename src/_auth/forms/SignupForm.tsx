import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignupValidation } from "@/lib/validation";

interface SignupFormValues {
  username: string
}
const SignupForm = () => {
  // 1. Define your form.
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
    },
  })
  // 2. Define a submit handler.
  function onSubmit(values: SignupFormValues) {
    console.log(values)  
    alert(values)  
  }
  return (
    <Form {...form}> 
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Ingresar su usuario" {...field}
                  className={`${form.formState.errors.username ? 'text-red' : ''}`}
                 />
              </FormControl>
              <FormDescription>
                Este es su nombre para mostrar públicamente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
