import { mockVotingEvents } from "@/constants/votingEvents";
import { NominationFormClient } from "./NominationForm";
import { notFound, redirect } from "next/navigation";
import { VotingEvent } from "@/types";

interface PageProps {
  searchParams: {
    eventCode?: string;
  };
}

export default async function NominationPage({ searchParams }: PageProps) {
  const { eventCode } = await searchParams;

  if (!eventCode) {
    redirect("/events");
  }

  const event: VotingEvent | undefined = mockVotingEvents.find(
    (e) => e.eventCode === eventCode
  );

  if (!event) {
    return notFound();
  }

  return <NominationFormClient event={event} />;
}
