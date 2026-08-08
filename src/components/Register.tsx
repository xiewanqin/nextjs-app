"use client"

import { Dispatch, SetStateAction } from "react"
import { NotAccountType } from "@/types/global"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { registerAction } from "@/actions/users"

const formSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
  name: z.string().min(2, { error: "Name must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters." }),
})

export default function Register({
  setNotAccountType,
}: {
  setNotAccountType: Dispatch<SetStateAction<NotAccountType>>
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await registerAction(values.email, values.name, values.password)
    if (res.status === 200) {
      toast.success(res.body)
      setNotAccountType("login")
    } else {
      toast.error(res.body)
    }
  }

  return (
    <div className="container2 my-20">
      <h1 className="text-xl mb-3 text-center font-bold">Become a member</h1>
      <p className="text-center mb-6">
        Create your DUYI store member profile.
      </p>
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="register-form-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="register-form-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Please enter your email"
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="register-form-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="register-form-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Please enter your name"
                  autoComplete="name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="register-form-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="register-form-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Please enter your password"
                  autoComplete="new-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button className="w-full" type="submit">
            Join
          </Button>
        </FieldGroup>
      </form>
      <p className="text-center text-sm mt-3">
        Already a member?{" "}
        <span
          className="underline text-orange-400 cursor-pointer"
          onClick={() => setNotAccountType("login")}
        >
          Sign in.
        </span>
      </p>
    </div>
  )
}
