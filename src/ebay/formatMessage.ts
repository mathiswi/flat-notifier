/*
{
    url: 'https://ebay-kleinanzeigen.de/s-anzeige/1-zimmer-penthousewohnung-mit-blick-ueber-die-stadt/1956151029-203-3116',
    groeße: '55 m²',
    zimmerAnzahl: '1',
    wohnungsTyp: 'Penthouse',
    verfuegbarAb: 'März 2022',
    kaltMiete: '550 €',
    warmMiete: '700 €',
    adresse: '26122 Niedersachsen - Oldenburg',
    features: ['Balkon', 'Terrasse', 'Einbauküche', 'Aufzug', 'Keller'],
    firstImageUrl: 'https://i.ebayimg.com/00/s/OTAwWDE2MDA=/z/QsEAAOSwlHlhsMdy/$_59.JPG',
  }
*/

export function formatMessage(input: Flat): string {
  const detailBlock: string = `
${input.url}
${input.titel}
**Kalt**: ${input.kaltMiete}
**Warm**: ${input.warmMiete}
**Nebenkosten**: ${input.nebenkosten}
**Größe**: ${input.groeße}
**Adresse**: ${input.adresse}
**Zimmer**: ${input.zimmerAnzahl}
**Typ**: ${input.wohnungsTyp}
**Verfügbar:** ${input.verfuegbarAb}
  `;
  return detailBlock;
}

export function formatMessageForTelegram(input: Flat): string {
  const detailBlock: string = `
${input.url}

${input.titel}

*Kalt*: ${input.kaltMiete}
*Warm*: ${input.warmMiete}
*Nebenkosten*: ${input.nebenkosten}
*Größe*: ${input.groeße}
*Adresse*: ${input.adresse}
*Zimmer*: ${input.zimmerAnzahl}
*Typ*: ${input.wohnungsTyp}
*Verfügbar:* ${input.verfuegbarAb}
  `;
  return detailBlock;
}


export function formatErrorMessage(input: any) {
  const text = JSON.stringify(input, Object.getOwnPropertyNames(input), 4);

  return `\`\`\`json\n${text}\`\`\``;
}
