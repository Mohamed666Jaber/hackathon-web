"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Sign in with your 42 School account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => signIn("42school", { callbackUrl: "/" })} className="w-full" size="lg">
            Sign in with 42 School
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
