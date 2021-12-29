import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { scrapeSite } from './scrapeSite';

const path = require('path');

test('Scrapes site and returns one found flat', async () => {
  jest.setTimeout(10000);
  jest.useFakeTimers().setSystemTime(new Date('2021-12-08T18:15Z').getTime());
  const mock = readFileSync(path.resolve(__dirname, 'mock.html'), { encoding: 'utf-8' });
  const { window } = new JSDOM(mock);
  expect(await scrapeSite(window)).toStrictEqual([{
    url: 'https://ebay-kleinanzeigen.de/s-anzeige/1-zimmer-penthousewohnung-mit-blick-ueber-die-stadt/1956151029-203-3116',
    titel: '1 ZIMMER PENTHOUSEWOHNUNG MIT BLICK ÜBER DIE STADT',
    groeße: '55 m²',
    zimmerAnzahl: '1',
    wohnungsTyp: 'Penthouse',
    verfuegbarAb: 'März 2022',
    kaltMiete: '550 €',
    nebenkosten: '',
    warmMiete: '700 €',
    adresse: '26122 Niedersachsen - Oldenburg',
    features: ['Balkon', 'Terrasse', 'Einbauküche', 'Aufzug', 'Keller'],
    firstImageUrl: 'https://i.ebayimg.com/00/s/OTAwWDE2MDA=/z/QsEAAOSwlHlhsMdy/$_59.JPG',
  }]);
});
