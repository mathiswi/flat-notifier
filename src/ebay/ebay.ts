/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'fs';
import { DOMWindow, JSDOM } from 'jsdom';
import { formatMessage, formatMessageForTelegram } from './formatMessage';
import { getInfosFromOverview } from './getInfosFromOverview';
import { getIdsFromDb } from './getIdsFromDb';
import { compareForNewFlats } from './compareForNewFlats';
import { scrapeFlatPage } from './scrapeFlatPage';
import { writeIdToDb } from './writeIdToDb';
import { sendTelegramMessage } from './sendTelegramMessage';

const path = require('path');

export const handler = async (): Promise<void> => {
  try {
    let domWindow: DOMWindow;
    if (process.env.STAGE === 'offline') {
      const file = readFileSync(path.resolve(__dirname, 'mock.html'), { encoding: 'utf-8' });
      const { window } = new JSDOM(file);
      domWindow = window;
    } else {
      const url = 'https://www.kleinanzeigen.de/s-wohnung-mieten/49080/anzeige:angebote/preis::950/c203l3124r5+wohnung_mieten.qm_d:50.00%2C95.00+wohnung_mieten.zimmer_d:3.0%2C3.0';
      const { window } = await JSDOM.fromURL(url, {
        pretendToBeVisual: true,
      });
      domWindow = window;
    }
    const [foundFlats, idsFromDB] = await Promise.all(
      [getInfosFromOverview(domWindow), getIdsFromDb()],
    );

    const newFlats = compareForNewFlats(foundFlats, idsFromDB ?? []);
    if (newFlats.length > 0) {
      await Promise.all(newFlats.map(async ({ flatId }) => await writeIdToDb(flatId)));
      console.log('Wohnung gefunden');

      const flatsWithDetails = await Promise.all(
        newFlats.map(async ({ flatUrl }) => await scrapeFlatPage(flatUrl)),
      );
      const promises = [];
      for (const flat of flatsWithDetails) {
        promises.push(sendTelegramMessage(formatMessageForTelegram(flat), flat.firstImageUrl));
      }
      await Promise.all(promises);
    } else {
      console.log('Keine neue Wohnung verfügbar');
    }
  } catch (err: any) {
    console.error(err);
    // await sendDiscordMessage(formatErrorMessage(err));
  }
};
