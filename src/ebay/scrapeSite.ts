/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { JSDOM } from 'jsdom';
import { isLessThanFiveMinutesAgo } from './isLessThanFiveMinutesAgo';
import { scrapeFlatPage } from './scrapeFlatPage';

export async function scrapeSite(data: any): Promise<Flat[]> {
  const { window } = new JSDOM(data);
  const flatItems = [...window.document.querySelectorAll('.aditem-main')];
  const flats: Flat[] = [];
  for (const flatEntry of flatItems) {
    const timeString = flatEntry.querySelector('.aditem-main--top--right')?.textContent?.trim();
    if (timeString !== undefined && timeString?.includes('Heute')) {
      if (isLessThanFiveMinutesAgo(timeString)) {
        const flatLink = (flatEntry.querySelector('a.ellipsis') as HTMLAnchorElement).href;
        const flat = await scrapeFlatPage(flatLink);
        flats.push(flat);
      }
    }
  }
  return flats;
}
