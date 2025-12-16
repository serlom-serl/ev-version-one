"use client";

import { mockTicketingEvents } from "@/constants/ticketingEvents";
import Link from "next/link";
import { Calendar, MapPin, Search, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function TicketingEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Concerts", "Sports", "Theater"];

  const filteredTickets = mockTicketingEvents.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false);

    const matchesFilter = filter === "All" || ticket.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-primary-900 min-h-screen pb-20">
      {/* Header */}
      <div className="border-b border-primary-600 pb-8 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white! mb-4">
            Event Tickets & Concerts
          </h1>
          <p className="text-slate-300">
            Buy Your Tickets easily and experience unforgettable live events!
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-primary-700 p-4 rounded-2xl shadow-sm border border-primary-700 mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search concerts, shows, matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border text-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            />
          </div>
          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  filter === cat
                    ? "bg-primary-600 text-white"
                    : "bg-primary-800 text-primary-200 hover:bg-primary-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-black/50 flex flex-col"
              style={{
                clipPath:
                  "polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 95%, 10px 90%, 0 85%, 10px 80%, 0 75%, 10px 70%, 0 65%, 10px 60%, 0 55%, 10px 50%, 0 45%, 10px 40%, 0 35%, 10px 30%, 0 25%, 10px 20%, 0 15%, 10px 10%, 0 5%)",
              }}
            >
              {/* Image Section */}
              <div className="relative h-48 bg-gray-800">
                <img
                  src={ticket.image}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  alt={ticket.title}
                />
                <div className="absolute top-4 right-4 bg-brand-bright text-white text-sm font-bold pl-3 px-3 py-1 rounded-md font-bold text-sm">
                  GHS {ticket.ticketTypes[0].price}.00
                </div>
              </div>

              {/* Stub Details - The "Rip-off" effect using a border-dashed line */}
              <div className="relative bg-white text-slate-900 p-6 flex-1">
                {/* Visual rip line */}
                <div className="absolute -top-2 left-0 w-full h-4 bg-slate-900 ticket-stub-mask rotate-180 z-10"></div>

                <div className="pt-2">
                  <h3 className="text-xl font-bold mb-2">{ticket.title}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-600 text-sm">
                      <Calendar size={16} className="mr-2 text-magenta-600" />
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <MapPin size={16} className="mr-2 text-magenta-600" />
                      <span>{ticket.venue}</span>
                    </div>
                  </div>

                  <Link
                    href={`/events/tickets/${ticket.eventCode}`}
                    className="w-full py-3 bg-secondary-700 text-white! font-bold rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center group/btn"
                  >
                    Get Tickets
                    <ArrowRight
                      size={16}
                      className="ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div></div>
      <div className="border-b border-primary-600 pb-8 pt-6"></div>
    </div>
  );
}
