"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const errorMessages: Record<string, string> = {
    Callback: "There was an error with the callback URL.",
    OAuthSignin: "Error connecting to the OAuth provider.",
    OAuthCallback: "Error in the OAuth callback.",
    OAuthCreateAccount: "Could not create OAuth account.",
    EmailCreateAccount: "Could not create email account.",
    // Callback: "Error in callback from OAuth provider.",
    OAuthAccountNotLinked: "Email on account is already linked to another provider.",
    EmailSignInError: "Check your email address.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    default: "An error occurred during sign in.",
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md border-destructive">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl text-destructive">Sign In Error</CardTitle>
          <CardDescription>{errorMessages[error as string] || errorMessages.default}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Link href="/auth/signin" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              Try Again
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full">Go Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
