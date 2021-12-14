/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import { readFileSync } from 'fs';
import { sendDiscordMessage } from './sendDiscordMessage';
import { formatMessage } from './formatMessage';
import { scrapeSite } from './scrapeSite';

const path = require('path');

export const handler = async (): Promise<void> => {
  try {
    let site;
    if (process.env.STAGE === 'offline') {
      site = readFileSync(path.resolve(__dirname, 'mock.html'), { encoding: 'utf-8' });
    } else {
      const url = 'https://www.ebay-kleinanzeigen.de/s-wohnung-mieten/oldenburg/anzeige:angebote/preis::780/wohnung/k0c203l3108r10+wohnung_mieten.qm_d:40.00,76';

      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0' },
      });
      site = data;
    }
    const flats = await scrapeSite(site);
    const promises = [];
    console.log(flats);
    if (flats?.length > 0) {
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
  }
};
