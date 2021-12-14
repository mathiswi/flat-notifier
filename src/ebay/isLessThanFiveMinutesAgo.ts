import { extractUTCDateFromHtml } from './extractUTCDateFromHtml';

export function isLessThanFiveMinutesAgo(html: string): boolean {
  const date = extractUTCDateFromHtml(html);
  const FIVE_MINUTES = 1000 * 60 * 5 - 5; // bit less than 10 minutes to catch matching times
  const fiveMinutesAgo = new Date(Date.now() - FIVE_MINUTES);
  console.log({ html });
  console.log({ date });
  console.log({ fiveMinutesAgo });
  return date > fiveMinutesAgo;
}
