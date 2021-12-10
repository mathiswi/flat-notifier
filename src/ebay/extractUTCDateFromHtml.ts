export function extractUTCDateFromHtml(html: string): Date {
  const time = html.split(',')[1];
  const [hours, minutes] = time.split(':');
  const date = new Date();
  // Hardcoded timezone offset
  date.setUTCHours(Number(hours) - 1);
  date.setUTCMinutes(Number(minutes));
  date.setUTCMilliseconds(0);
  date.setUTCSeconds(0);
  return date;
}
