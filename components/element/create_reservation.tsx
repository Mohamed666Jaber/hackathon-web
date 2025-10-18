"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const formSchema = z.object({
  eventName: z.string().min(3, "Event name must be at least 3 characters."),
  maxSpots: z.coerce
    .number()
    .min(1, "There must be at least 1 spot.")
    .max(1000, "That’s too many spots."),
  reservationDay: z.string().nonempty("Please select a day."),
  reservationHour: z.string().nonempty("Please select an hour."),
  description: z
    .string()
    .min(10, "Please describe your event.")
    .max(100, "Description too long."),
})

type FormData = z.infer<typeof formSchema>

export function CreateResevationForm() {
  const intra =
    typeof window !== "undefined"
      ? (window as any).__USER_INTRA__ || "unknown"
      : "unknown"

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      maxSpots: 10,
      reservationDay: "",
      reservationHour: "",
      description: "",
    },
  })

  const handleAddEvent = () => {
    const data = form.getValues()
    toast.success("Event created!", {
      description: (
        <pre className="bg-gray-900 text-emerald-400 mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify({ ...data, intra }, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    })
    form.reset()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-emerald-500 bg-slate-900">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-emerald-300">Create Event</CardTitle>
          <CardDescription className="text-center text-teal-300 text-lg">
            Fill in the details and add your event.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            <Controller
              name="eventName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-emerald-400 text-lg font-semibold">Event Name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Example: Coding Workshop"
                    aria-invalid={fieldState.invalid}
                    className="bg-slate-800 text-white border-emerald-500 placeholder-gray-400 focus:border-emerald-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-500" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="maxSpots"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-emerald-400 text-lg font-semibold">Max Spots</FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 20"
                    className="bg-slate-800 text-white border-emerald-500 placeholder-gray-400 focus:border-emerald-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-500" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="reservationDay"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-emerald-400 text-lg font-semibold">Event Day</FieldLabel>
                  <Input
                    type="date"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className="bg-slate-800 text-white border-emerald-500 focus:border-emerald-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-500" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="reservationHour"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-emerald-400 text-lg font-semibold">Event Hour</FieldLabel>
                  <Input
                    type="time"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className="bg-slate-800 text-white border-emerald-500 focus:border-emerald-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-500" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-emerald-400 text-lg font-semibold">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      placeholder="Describe the event..."
                      rows={4}
                      className="bg-slate-800 text-white border-emerald-500 focus:border-emerald-400"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums text-teal-300">
                        {field.value.length}/100
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-500" />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            type="button"
            onClick={handleAddEvent}
            className="bg-emerald-500 hover:bg-emerald-400 text-white text-lg font-semibold"
          >
            Create Event
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}