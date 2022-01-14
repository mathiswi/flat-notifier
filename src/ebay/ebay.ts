/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'fs';
import { DOMWindow, JSDOM } from 'jsdom';
import { sendDiscordMessage } from './sendDiscordMessage';
import { formatMessage } from './formatMessage';
import { getInfosFromOverview } from './getInfosFromOverview';
import { getIdsFromDb } from './getIdsFromDb';
import { findNewFlatUrls } from './findNewFlats';
import { scrapeFlatPage } from './scrapeFlatPage';

const path = require('path');

export const handler = async (): Promise<void> => {
  try {
    let domWindow: DOMWindow;
    if (process.env.STAGE === 'offline') {
      const file = readFileSync(path.resolve(__dirname, 'mock.html'), { encoding: 'utf-8' });
      const { window } = new JSDOM(file);
      domWindow = window;
    } else {
      const url = 'https://www.ebay-kleinanzeigen.de/s-wohnung-mieten/oldenburg/anzeige:angebote/preis::780/c203l3108r5+wohnung_mieten.qm_d:40.00,80';
      const { window } = await JSDOM.fromURL(url, {
        pretendToBeVisual: true,
      });
      domWindow = window;
    }
    const [foundFlats, idsFromDB] = await Promise.all(
      [getInfosFromOverview(domWindow), getIdsFromDb()],
    );

    const newUrls = findNewFlatUrls(foundFlats, idsFromDB);

    const flats = await Promise.all(newUrls.map(async (url) => await scrapeFlatPage(url)));
    const promises = [];
    if (flats.length > 0) {
      console.log('Wohnung gefunden');
      for (const flat of flats) {
        promises.push(sendDiscordMessage(formatMessage(flat), flat.firstImageUrl));
      }
    } else {
      console.log('Keine neue Wohnung verfügbar');
    }
    await Promise.all(promises);
  } catch (err: any) {
    console.error(err);
    // await sendDiscordMessage(formatErrorMessage(err));
  }
};
