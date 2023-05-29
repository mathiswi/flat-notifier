import { formatMessage, formatMessageForTelegram } from './formatMessage';
import { sendTelegramMessage } from './sendTelegramMessage';

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
  firstImageUrl: 'https://img.kleinanzeigen.de/api/v1/prod-ads/images/fb/fb0747b7-b9bd-49df-978a-1fc68b0acc99?rule=$_59.JPG',
};


test('Get the ID from the flat link', async () => {
  const testMessage = formatMessageForTelegram(input);
  expect(await sendTelegramMessage(testMessage, input.firstImageUrl)).toBeTruthy();
});

