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

export function CreateReservationForm() {
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
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify({ ...data, intra }, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    })
    form.reset()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center">Create Event</CardTitle>
          <CardDescription className="text-center text-gray-600">
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
                  <FieldLabel>Event Name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Example: Coding Workshop"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="maxSpots"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Max Spots</FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="reservationDay"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Event Day</FieldLabel>
                  <Input
                    type="date"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="reservationHour"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Event Hour</FieldLabel>
                  <Input
                    type="time"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      placeholder="Describe the event..."
                      rows={4}
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button type="button" onClick={handleAddEvent}>
            Create Event
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
