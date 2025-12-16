import { mockVotingEvents } from "@/constants/votingEvents";
import { notFound } from "next/navigation";
import EventDetailClient from "./EventDetailClient";
import { Event, VotingEvent } from "@/types";

interface PageProps {
  params: {
    eventCode: string;
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { eventCode } = await params;

  /**
   * Find event by eventCode
   * (eventCode is generated if missing, so we normalize)
   */
  const event: VotingEvent | undefined = mockVotingEvents
    .map((e) => ({
      ...e,
      eventCode: e.eventCode ?? `${e.title.slice(0, 3).toUpperCase()}${e.id}`,
      location: e.location ?? "Accra, Ghana",
      votePrice: e.votePrice ?? 1.0,
    }))
    .find((e) => e.eventCode === eventCode);

  if (!event) {
    return notFound();
  }

  return <EventDetailClient event={event} />;
}
