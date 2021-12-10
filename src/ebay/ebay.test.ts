import { readFileSync } from 'fs';
import { scrapeSite } from './scrapeSite';
import { formatMessage } from './formatMessage';

const path = require('path');

test('Scrapes site and returns flat', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-12-08T11:39Z').getTime());
  const mock = readFileSync(path.resolve(__dirname, 'mock.html'), { encoding: 'utf-8' });
  expect(await scrapeSite(mock)).toStrictEqual({
    url: 'https://ebay-kleinanzeigen.de/s-anzeige/1-zimmer-penthousewohnung-mit-blick-ueber-die-stadt/1956151029-203-3116',
    titel: '1 ZIMMER PENTHOUSEWOHNUNG MIT BLICK ÜBER DIE STADT',
    groeße: '55 m²',
    zimmerAnzahl: '1',
    wohnungsTyp: 'Penthouse',
    verfuegbarAb: 'März 2022',
    kaltMiete: '550 €',
    warmMiete: '700 €',
    adresse: '26122 Niedersachsen - Oldenburg',
    features: ['Balkon', 'Terrasse', 'Einbauküche', 'Aufzug', 'Keller'],
    firstImageUrl: 'https://i.ebayimg.com/00/s/OTAwWDE2MDA=/z/QsEAAOSwlHlhsMdy/$_59.JPG',
  });
});

test('Format flat details to discord message', () => {
  const input: Flat = {
    url: 'https://ebay-kleinanzeigen.de/s-anzeige/1-zimmer-penthousewohnung-mit-blick-ueber-die-stadt/1956151029-203-3116',
    titel: '1 ZIMMER PENTHOUSEWOHNUNG MIT BLICK ÜBER DIE STADT',
    groeße: '55 m²',
    zimmerAnzahl: '1',
    wohnungsTyp: 'Penthouse',
    verfuegbarAb: 'März 2022',
    kaltMiete: '550 €',
    warmMiete: '700 €',
    adresse: '26122 Niedersachsen - Oldenburg',
    features: ['Balkon', 'Terrasse', 'Einbauküche', 'Aufzug', 'Keller'],
    firstImageUrl: 'https://i.ebayimg.com/00/s/OTAwWDE2MDA=/z/QsEAAOSwlHlhsMdy/$_59.JPG',
  };
  expect(formatMessage(input)).toBe(`
https://ebay-kleinanzeigen.de/s-anzeige/1-zimmer-penthousewohnung-mit-blick-ueber-die-stadt/1956151029-203-3116
1 ZIMMER PENTHOUSEWOHNUNG MIT BLICK ÜBER DIE STADT
**Kalt**: 550 €
**Warm**: 700 €
**Größe**: 55 m²
**Adresse**: 26122 Niedersachsen - Oldenburg
**Zimmer**: 1
**Typ**: Penthouse
**Verfügbar:**: März 2022
  `);
});
