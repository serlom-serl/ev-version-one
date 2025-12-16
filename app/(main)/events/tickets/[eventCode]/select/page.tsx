import { mockTicketingEvents } from "@/constants/ticketingEvents";
import { notFound, redirect } from "next/navigation";
import { TicketSelectionClient } from "./TicketSelectionClient";

export default async function TicketSelectionPage({
  params,
}: {
  params: Promise<{ eventCode: string }>;
}) {
  const { eventCode } = await params;
  const event = mockTicketingEvents.find((e) => e.eventCode === eventCode);

  if (!event) return notFound();

  return (
    <TicketSelectionClient
      event={event}
      onBack={async () => {
        "use server";
        redirect(`/events/tickets/${eventCode}`);
      }}
      onSuccess={async (transactionId) => {
        "use server";
        console.log(`Transaction successful: ${transactionId}`);
        // In a real app we'd redirect to a success page
        redirect(`/events/ticketing?success=${transactionId}`);
      }}
    />
  );
}
