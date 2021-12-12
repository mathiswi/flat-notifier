import { extractUTCDateFromHtml } from './extractUTCDateFromHtml';

export function isLessThanTenMinutesAgo(html: string): boolean {
  const date = extractUTCDateFromHtml(html);
  const TEN_MINUTES = 1000 * 60 * 10 - 10; // bit less than 10 minutes to catch matching times
  const tenMinutesAgo = new Date(Date.now() - TEN_MINUTES);
  console.log(date);
  console.log(tenMinutesAgo);
  return date > tenMinutesAgo;
}
