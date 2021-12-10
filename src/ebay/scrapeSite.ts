/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { JSDOM } from 'jsdom';
import { isLessThanTenMinutesAgo } from './isLessThanTenMinutesAgo';
import { scrapeFlatPage } from './scrapeFlatPage';

export async function scrapeSite(data: any): Promise<Flat | undefined> {
  const { window } = new JSDOM(data);
  const flatItems = [...window.document.querySelectorAll('.aditem-main')];
  let scrapedFlat: Flat | undefined;
  for (const flat of flatItems) {
    const timeString = flat.querySelector('.aditem-main--top--right')?.textContent?.trim();
    if (timeString?.includes('Gestern')) {
      console.log('Keine neue Wohnung verfügbar');
      break;
    }
    if (timeString !== undefined && timeString?.includes('Heute')) {
      if (isLessThanTenMinutesAgo(timeString)) {
        const flatLink = (flat.querySelector('a.ellipsis') as HTMLAnchorElement).href;
        scrapedFlat = await scrapeFlatPage(flatLink);
      } else {
        console.log('Keine neue Wohnung verüfgbar');
      }
      break;
    }
  }
  return scrapedFlat;
}
