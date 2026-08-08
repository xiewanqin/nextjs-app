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
import { loginAction } from "@/actions/users"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters." }),
})

export default function Login({
  setNotAccountType,
}: {
  setNotAccountType: Dispatch<SetStateAction<NotAccountType>>
}) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await loginAction(values.email, values.password)
    if (res.status === 200) {
      toast.success(res.body)
      router.refresh()
    } else {
      toast.error(res.body)
    }
  }

  return (
    <div className="container2 my-20">
      <h1 className="text-xl mb-3 text-center font-bold">Welcome back</h1>
      <p className="text-center mb-6">
        Sign in to access an enhanced shopping experience.
      </p>
      <form
        id="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="login-form-email"
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
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-form-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="login-form-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Please enter your password"
                  autoComplete="current-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </FieldGroup>
      </form>
      <p className="text-center text-sm mt-3">
        Not a member?{" "}
        <span
          className="underline text-orange-400 cursor-pointer"
          onClick={() => setNotAccountType("register")}
        >
          Join us.
        </span>
      </p>
    </div>
  )
}
