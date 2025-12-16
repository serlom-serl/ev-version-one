import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function VoteConfirmationPage({
  params,
}: {
  params: Promise<{ transactionRef: string }>;
}) {
  const { transactionRef } = await params;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
        <CheckCircle size={40} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Vote Successful!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Your vote has been recorded. Transaction Reference:{" "}
        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
          {transactionRef}
        </span>
      </p>

      <Link
        href="/events/voting"
        className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition"
      >
        Continue Voting
      </Link>
    </div>
  );
}
