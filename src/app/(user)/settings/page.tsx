"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <UserProfile
        appearance={{
          elements: {
            card: "shadow-none border rounded-lg",
          },
        }}
      />
    </div>
  );
}
