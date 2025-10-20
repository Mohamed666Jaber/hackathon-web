"use client";
import { useEffect } from "react";
import { HeroSection } from "@/components/element/hero-section";
import { Navbar1 } from "@/components/element/navbar";

export default function Home() {
  useEffect(() => {
    // Handle 42 callback
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // Step 1: Exchange code for access token
      fetch('/api/auth/token', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.error('Token error:', data.error);
            return;
          }

          // Save token to localStorage
          localStorage.setItem('42_token', data.access_token);
          console.log('Token saved:', data.access_token);

          // Step 2: Get user data
          return fetch('/api/user', {
            headers: { Authorization: `Bearer ${data.access_token}` }
          });
        })
        .then(res => {
          if (!res || !res.ok) {
            throw new Error('Failed to fetch user');
          }
          return res.json();
        })
        .then(userData => {
          console.log('User logged in:', userData);
          
          // Save user data to localStorage
          localStorage.setItem('42_user', JSON.stringify(userData));

          // Step 3: Redirect to search_team page
          window.location.href = '/seach_team';
        })
        .catch(error => {
          console.error('Login failed:', error);
          alert('Login failed. Please try again.');
        });
    }
  }, []);

  return (
    <main className="w-full mx-auto">
      <Navbar1 />
      <HeroSection
        badge="Join Now"
        heading="Find Your Perfect Team"
        description="1337BookingHub helps you discover and join teams across your school. Whether you're interested in sports, CTF competitions, or competitive programming, find teammates who share your passion and achieve together."
        image={{
          src: "./1332_n.jpg",
          alt: "Hero section demo image showing interface components",
        }}
      />
    </main>
  );
}