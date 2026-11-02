interface IcsEvent {
  title: string;
  description: string;
  location: string;
  /** yyyy-mm-dd */
  date: string;
  /** HH:mm in Gulf Standard Time (UTC+4) */
  time: string;
  durationMinutes: number;
  uid: string;
}

function toUtcStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function gstToDate(date: string, time: string) {
  return new Date(`${date}T${time}:00+04:00`);
}

export function downloadIcs(event: IcsEvent) {
  const start = gstToDate(event.date, event.time);
  const end = new Date(start.getTime() + event.durationMinutes * 60_000);
  const lines = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//H HUNTERS Technology Solutions//Booking//EN',
  'BEGIN:VEVENT',
  `UID:${event.uid}`,
  `DTSTAMP:${toUtcStamp(new Date())}`,
  `DTSTART:${toUtcStamp(start)}`,
  `DTEND:${toUtcStamp(end)}`,
  `SUMMARY:${event.title}`,
  `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
  `LOCATION:${event.location}`,
  'END:VEVENT',
  'END:VCALENDAR'];

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.uid}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}