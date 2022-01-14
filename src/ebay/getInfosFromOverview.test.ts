import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { getInfosFromOverview } from './getInfosFromOverview';

const path = require('path');

test('Scrapes overview and returns all ids and urls', async () => {
  const mock = readFileSync(path.resolve(__dirname, 'mock.html'), { encoding: 'utf-8' });
  const { window } = new JSDOM(mock);
  expect(await getInfosFromOverview(window)).toStrictEqual([
    {
      flatId: '1941380733',
      flatUrl: '/s-anzeige/modernisierte-2-zimmer-wohnung-in-city-naehe/1941380733-203-3109',
    },
    {
      flatId: '1943252790',
      flatUrl: '/s-anzeige/erstbezug-schoene-helle-50-qm-dg-whg-balkon-ol-dietrichsfeld/1943252790-203-3112',
    },
    {
      flatId: '1956151029',
      flatUrl: '/s-anzeige/1-zimmer-penthousewohnung-mit-blick-ueber-die-stadt/1956151029-203-3116',
    },
    {
      flatId: '1956082259',
      flatUrl: '/s-anzeige/wunderschoene-dg-wohnung-rauhehorst-100-26127-oldenburg/1956082259-203-3112',
    },
    {
      flatId: '1943252790',
      flatUrl: '/s-anzeige/erstbezug-schoene-helle-50-qm-dg-whg-balkon-ol-dietrichsfeld/1943252790-203-3112',
    },
    {
      flatId: '1955972992',
      flatUrl: '/s-anzeige/3-zkbb-zentral-ol-buergerfelde/1955972992-203-3112',
    },
    {
      flatId: '1954460826',
      flatUrl: '/s-anzeige/anfragestopp-3-zimmerwohnung-in-eversten/1954460826-203-3109',
    },
  ]);
});

// test('Scrapes site and returns one found flat', async () => {
//   jest.setTimeout(10000);
//   jest.useFakeTimers().setSystemTime(new Date('2021-12-08T18:15Z').getTime());
//   const mock = readFileSync(path.resolve(__dirname, 'mock.html'), { encoding: 'utf-8' });
//   const { window } = new JSDOM(mock);
//   expect(await scrapeSite(window)).toStrictEqual([{
//     url: 'https://ebay-kleinanzeigen.de/s-anzeige/1-zimmer-penthousewohnung-mit-blick-ueber-die-stadt/1956151029-203-3116',
//     titel: '1 ZIMMER PENTHOUSEWOHNUNG MIT BLICK ÜBER DIE STADT',
//     groeße: '55 m²',
//     zimmerAnzahl: '1',
//     wohnungsTyp: 'Penthouse',
//     verfuegbarAb: 'März 2022',
//     kaltMiete: '550 €',
//     nebenkosten: '',
//     warmMiete: '700 €',
//     adresse: '26122 Niedersachsen - Oldenburg',
//     features: ['Balkon', 'Terrasse', 'Einbauküche', 'Aufzug', 'Keller'],
//     firstImageUrl: 'https://i.ebayimg.com/00/s/OTAwWDE2MDA=/z/QsEAAOSwlHlhsMdy/$_59.JPG',
//   }]);
// });
