import axios from 'axios';
import { sendDiscordMessage } from './sendDiscordMessage';
import { formatMessage } from './formatMessage';
import { scrapeSite } from './scrapeSite';

// import { readFileSync } from 'fs';
// const path = require('path');

// const mock = readFileSync(path.resolve(__dirname, 'mock.html'), { encoding: 'utf-8' });
export const handler = async (): Promise<void> => {
  const url = 'https://www.ebay-kleinanzeigen.de/s-wohnung-mieten/oldenburg/anzeige:angebote/preis::780/wohnung/k0c203l3108r10+wohnung_mieten.qm_d:40.00,76';
  const { data } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0' },
  });
  const flat = await scrapeSite(data);
  if (flat !== undefined) {
    console.log('Wohnung gefunden');
    await sendDiscordMessage(formatMessage(flat), flat.firstImageUrl);
  }
};
