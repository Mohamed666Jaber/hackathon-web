export async function POST(request: Request) {
  const { code } = await request.json();

  try {
    const response = await fetch('https://api.intra.42.fr/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_42_CLIENT_ID || '',
        client_secret: process.env.NEXT_42_CLIENT_SECRET || '',
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_42_REDIRECT_URI || '',
      }).toString(),
    });

    const data = await response.json();
    
    if (data.error) {
      return Response.json({ error: data.error }, { status: 400 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Token exchange failed' }, { status: 500 });
  }
}