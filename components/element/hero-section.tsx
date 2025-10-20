import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BookingFeatures from "./about-section";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

const HeroSection = ({
  badge = "",
  heading = "Find Your Perfect Team",
  description = "1337BookingHub helps you discover and join teams across your school. Whether you're interested in sports, CTF competitions, or competitive programming, find teammates who share your passion and achieve together.",
  buttons = {
    primary: {
      text: "Login with 42 Intra",
      url: "#", // We'll handle this with the login URL
    }
  },
  image = {
    src: "./1332_n.jpg",
    alt: "Hero section demo image showing interface components",
  },
}: Hero1Props) => {
  // Generate the 42 login URL
  const clientId = process.env.NEXT_PUBLIC_42_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_42_REDIRECT_URI;
  const loginUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public`;

  return (
    <>
      <section className="py-32 bg-gradient-to-b from-black via-black to-slate-950">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {badge && (
                <Badge variant="outline" className="border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                  {badge}
                  <ArrowUpRight className="ml-2 size-4" />
                </Badge>
              )}
              <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {heading}
              </h1>
              <p className="text-gray-300 mb-8 max-w-xl lg:text-xl">
                {description}
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                {buttons.primary && (
                  <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600">
                    <a href={loginUrl}>{buttons.primary.text}</a>
                  </Button>
                )}
                {buttons.secondary && (
                  <Button asChild variant="outline" className="w-full sm:w-auto border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                    <a href={buttons.secondary.url}>
                      {buttons.secondary.text}
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-96 w-full rounded-md object-cover border border-emerald-500/30"
            />
          </div>
        </div>
      </section>
      <BookingFeatures />
    </>
  );
};

export { HeroSection };