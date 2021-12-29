/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { DOMWindow } from 'jsdom';
import { isLessThanTenMinutesAgo } from './isLessThanTenMinutesAgo';
import { scrapeFlatPage } from './scrapeFlatPage';

export async function scrapeSite(window: DOMWindow): Promise<Flat[]> {
  const flatItems = [...window.document.querySelectorAll('.aditem-main')];
  const flats: Flat[] = [];
  for (const flatEntry of flatItems) {
    const timeString = flatEntry.querySelector('.aditem-main--top--right')?.textContent?.trim();
    if (timeString !== undefined && timeString?.includes('Heute')) {
      if (isLessThanTenMinutesAgo(timeString)) {
        const flatLink = (flatEntry.querySelector('a.ellipsis') as HTMLAnchorElement).href;
        const flat = await scrapeFlatPage(flatLink);
        flats.push(flat);
      }
    }
  }
  return flats;
}
