"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { addAddressAction, removeAddressAction } from "@/actions/addresses"
import { Address as AddressType, AuthData } from "@/types/global"

const formSchema = z.object({
  name: z.string().min(1, { error: "Name cannot be empty" }),
  city: z.string().min(1, { error: "City cannot be empty" }),
  address: z.string().min(1, { error: "Address cannot be empty" }),
  phone: z.string().min(1, { error: "Phone cannot be empty" }),
})

export default function Address({
  authData,
  addressesData,
}: {
  authData: AuthData
  addressesData: AddressType[]
}) {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
      address: "",
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await addAddressAction(
      values.name,
      values.city,
      values.address,
      values.phone,
      authData.userid
    )
    if (res.status === 200) {
      toast.success(res.body)
      setOpen(false)
      form.reset()
    } else {
      toast.error(res.body)
    }
  }

  const handleClick = async (id: number) => {
    const res = await removeAddressAction(id)
    if (res.status === 200) {
      toast.success(res.body)
    } else {
      toast.error(res.body)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className="border rounded-sm h-40 cursor-pointer relative text-slate-600 w-full text-left">
          <p className="m-3">New address</p>
          <div className="absolute bottom-2 left-3">
            <Plus width={14} />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[calc(100%-2rem)] data-[size=default]:max-w-md data-[size=default]:sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Add address</AlertDialogTitle>
            <AlertDialogDescription>
              Save a shipping address for checkout.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form
            id="address-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FieldGroup className="w-full gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                    className="items-start *:data-[slot=field-label]:flex-none *:data-[slot=field-label]:grow-0"
                  >
                    <FieldLabel
                      htmlFor="address-form-name"
                      className="w-20 shrink-0 pt-2"
                    >
                      Name
                    </FieldLabel>
                    <FieldContent className="min-w-0 flex-1">
                      <Input
                        {...field}
                        id="address-form-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter your name"
                        autoComplete="name"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                    className="items-start *:data-[slot=field-label]:flex-none *:data-[slot=field-label]:grow-0"
                  >
                    <FieldLabel
                      htmlFor="address-form-city"
                      className="w-20 shrink-0 pt-2"
                    >
                      City
                    </FieldLabel>
                    <FieldContent className="min-w-0 flex-1">
                      <Input
                        {...field}
                        id="address-form-city"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter your city"
                        autoComplete="address-level2"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                    className="items-start *:data-[slot=field-label]:flex-none *:data-[slot=field-label]:grow-0"
                  >
                    <FieldLabel
                      htmlFor="address-form-address"
                      className="w-20 shrink-0 pt-2"
                    >
                      Address
                    </FieldLabel>
                    <FieldContent className="min-w-0 flex-1">
                      <Input
                        {...field}
                        id="address-form-address"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter your address"
                        autoComplete="street-address"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                    className="items-start *:data-[slot=field-label]:flex-none *:data-[slot=field-label]:grow-0"
                  >
                    <FieldLabel
                      htmlFor="address-form-phone"
                      className="w-20 shrink-0 pt-2"
                    >
                      Phone
                    </FieldLabel>
                    <FieldContent className="min-w-0 flex-1">
                      <Input
                        {...field}
                        id="address-form-phone"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter your phone"
                        autoComplete="tel"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </FieldGroup>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Save</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      {addressesData.map((item) => (
        <div
          key={item.id}
          className="border rounded-sm h-40 relative text-slate-600"
        >
          <p className="m-3">{item.name}</p>
          <div className="text-sm ml-5">
            <p>{item.city}</p>
            <p>{item.address}</p>
            <p>{item.phone}</p>
          </div>
          <div className="absolute bottom-2 left-3 flex text-xs gap-2">
            <div className="flex items-center cursor-pointer">
              <Edit width={14} /> Edit
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <Trash2 width={14} /> Remove
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
