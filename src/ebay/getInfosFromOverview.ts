/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { DOMWindow } from 'jsdom';
import { getIdFromFlatLink } from './getIdFromFlatLink';
// import { scrapeFlatPage } from './scrapeFlatPage';toBe

export async function getInfosFromOverview(window: DOMWindow): Promise<FlatInfo[]> {
  const flatItems = [...window.document.querySelectorAll('.aditem-main')];

  const flatsInfo: FlatInfo[] = [];

  for (const flatEntry of flatItems) {
    const flatUrl = (flatEntry.querySelector('a.ellipsis') as HTMLAnchorElement)?.href;
    if (flatUrl !== undefined) {
      const flatId = getIdFromFlatLink(flatUrl);
      flatsInfo.push({ flatId, flatUrl });
    }
  }

  return flatsInfo;
}
