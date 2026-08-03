import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SavedPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Saved Articles
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your saved articles will appear here
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">
          No saved articles yet.{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Browse the feed
          </Link>{" "}
          to save articles.
        </p>
      </div>
    </div>
  );
}
