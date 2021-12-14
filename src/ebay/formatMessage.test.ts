import { formatMessage } from './formatMessage';

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
    nebenkosten: '',
    adresse: '26122 Niedersachsen - Oldenburg',
    features: ['Balkon', 'Terrasse', 'Einbauküche', 'Aufzug', 'Keller'],
    firstImageUrl: 'https://i.ebayimg.com/00/s/OTAwWDE2MDA=/z/QsEAAOSwlHlhsMdy/$_59.JPG',
  };
  expect(formatMessage(input)).toBe(`
https://ebay-kleinanzeigen.de/s-anzeige/1-zimmer-penthousewohnung-mit-blick-ueber-die-stadt/1956151029-203-3116
1 ZIMMER PENTHOUSEWOHNUNG MIT BLICK ÜBER DIE STADT
**Kalt**: 550 €
**Warm**: 700 €
**Nebenkosten**: 
**Größe**: 55 m²
**Adresse**: 26122 Niedersachsen - Oldenburg
**Zimmer**: 1
**Typ**: Penthouse
**Verfügbar:** März 2022
  `);
});
