'use client';

export default function LoginButton() {
  const clientId = process.env.NEXT_PUBLIC_42_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_42_REDIRECT_URI;

  const loginUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public`;

  return (
    <a href={loginUrl} className="btn">
      Login with 42
    </a>
  );
}