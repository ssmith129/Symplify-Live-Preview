import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import type { EventApi } from "@fullcalendar/core";
import type { CalendarApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ImageWithBasePath from "../../imageWithBasePath";
import SchedulingInsightPopover from "../../../core/ai/SchedulingInsightPopover";
import type { SchedulingAnchor } from "../../../core/ai/SchedulingInsightPopover";

const EventCalendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [anchor, setAnchor] = useState<SchedulingAnchor | null>(null);

  const events = [
    {
      image: "assets/img/users/user-01.jpg",
      start: new Date(Date.now() - 168000000).toISOString().slice(0, 10),
    },
    {
      image: "assets/img/users/user-02.jpg",
      start: new Date(Date.now() + 338000000).toISOString().slice(0, 10),
    },
    {
      image: "assets/img/users/user-03.jpg",
      start: new Date(Date.now() - 338000000).toISOString().slice(0, 10),
    },
    {
      image: "assets/img/users/user-04.jpg",
      start: new Date(Date.now() + 68000000).toISOString().slice(0, 10),
    },
    {
      image: "assets/img/users/user-05.jpg",
      start: new Date(Date.now() + 88000000).toISOString().slice(0, 10),
    },
  ];

  const renderEventContent = (eventInfo: any) => {
    const { image } = eventInfo.event.extendedProps;
    return (
      <div className="calendar-event-content d-flex align-items-center">
        {image && (
          <span className="calendar-event-avatar">
            <ImageWithBasePath
              src={image}
              alt="icon"
              className="avatar-xs rounded-circle"
            />
          </span>
        )}
      </div>
    );
  };

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
    const rect = (clickInfo.el as HTMLElement).getBoundingClientRect();

    // Get calendar container bounds for better positioning context
    const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
    const calendarEl = calendarApi?.el ?? null;
    const calendarRect = calendarEl ? calendarEl.getBoundingClientRect() : null;

    setAnchor({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
      // Optional: pass calendar container context for future enhancements
      calendarBounds: calendarRect
        ? {
            top: calendarRect.top + window.scrollY,
            left: calendarRect.left + window.scrollX,
            width: calendarRect.width,
            height: calendarRect.height,
          }
        : undefined,
    });
  };

  const closePopover = () => {
    setSelectedEvent(null);
    setAnchor(null);
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          start: "today,prev,next",
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        ref={calendarRef}
      />

      {selectedEvent && anchor && (
        <SchedulingInsightPopover
          anchor={anchor}
          dateISO={selectedEvent.start?.toISOString?.() || new Date().toISOString()}
          title={selectedEvent.title || 'Aug Team B'}
          onClose={closePopover}
        />
      )}
    </div>
  );
};

export default EventCalendar;
