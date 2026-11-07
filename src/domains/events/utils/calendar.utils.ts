export interface CalendarEvent {
  id: number;
  name: string;
  description: string;
  category: string;
  dateLabel: string;
  startDate: string;
  endDate: string;   
  location: string;
  imageUrl: string;
}

const toUTCString = (date: string) =>
  new Date(date)
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0] + "Z";

export const addToGoogleCalendar = (event: CalendarEvent) => {
  const url = `https://www.google.com/calendar/render?action=TEMPLATE
&text=${encodeURIComponent(event.name)}
&details=${encodeURIComponent(event.description)}
&location=${encodeURIComponent(event.location)}
&dates=${toUTCString(event.startDate)}/${toUTCString(event.endDate)}`;

  window.open(url, "_blank");
};

export const addToAppleCalendar = (event: CalendarEvent) => {
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.name}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${toUTCString(event.startDate)}
DTEND:${toUTCString(event.endDate)}
END:VEVENT
END:VCALENDAR
`.trim();

  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.name}.ics`;
  link.click();

  URL.revokeObjectURL(url);
};

export const addToCalendar = (event: CalendarEvent) => {
  const isApple = /iPhone|iPad|Mac/i.test(navigator.userAgent);
  isApple ? addToAppleCalendar(event) : addToGoogleCalendar(event);
};
