import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function ProfilePage() {
  const user = await currentUser();

  // middleware protects, but keep a safe fallback
  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="flex items-center gap-4 border rounded-lg p-4">
        <Image
          src={user.imageUrl}
          alt="Profile"
          width={72}
          height={72}
          className="rounded-full"
        />

        <div>
          <p className="text-lg font-medium">
            {user.firstName || ""} {user.lastName || ""}
          </p>
          <p className="text-gray-600 text-sm">{email}</p>
          <p className="text-gray-500 text-xs">Username: {user.username}</p>
        </div>
      </div>
    </div>
  );
}
