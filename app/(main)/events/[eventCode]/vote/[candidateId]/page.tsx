import { mockVotingEvents } from "@/constants/votingEvents";
import { notFound } from "next/navigation";
import VoteClient from "./VoteClient";

export default async function VotePage({
  params,
}: {
  params: Promise<{ eventCode: string; candidateId: string }>;
}) {
  const { eventCode, candidateId } = await params;
  const event = mockVotingEvents.find((e) => e.eventCode === eventCode);

  // Flatten categories to find candidate
  const candidate = event?.categories
    .flatMap((c) => c.candidates)
    .find((c) => c.id === candidateId);

  if (!event || !candidate) return notFound();

  return (
    <VoteClient
      event={{
        ...event,
        // Ensure defaults are present as expected by types
        votePrice: event.votePrice || 1.0,
        location: event.location || "Accra, Ghana",
      }}
      candidate={candidate}
    />
  );
}
