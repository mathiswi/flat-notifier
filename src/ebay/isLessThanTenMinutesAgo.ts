import { extractUTCDateFromHtml } from './extractUTCDateFromHtml';

export function isLessThanTenMinutesAgo(html: string): boolean {
  const extractedDate = extractUTCDateFromHtml(html);
  const TEN_MINUTES = 1000 * 60 * 10 - 30; // bit more than 10 minutes to catch matching times
  const tenMinutesAgo = new Date(Date.now() - TEN_MINUTES);
  tenMinutesAgo.setUTCMilliseconds(0);
  console.log({ html });
  console.log({ extractedDate });
  console.log({ tenMinutesAgo });
  return extractedDate >= tenMinutesAgo;
}
