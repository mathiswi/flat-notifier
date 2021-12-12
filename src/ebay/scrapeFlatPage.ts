import { JSDOM } from 'jsdom';
import axios from 'axios';
import { trimString } from './trimString';

// import { readFileSync } from 'fs';
// const path = require('path');

// eslint-disable-next-line max-len
// export const detailedMock = readFileSync(path.resolve(__dirname, 'detailedMock.html'), { encoding: 'utf-8' });

export async function scrapeFlatPage(href: string): Promise<Flat> {
  const url = `https://ebay-kleinanzeigen.de${href}`;
  const { data } = await axios.get(
    url,
    {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0' },
    },
  );

  const flat: Flat = {
    url,
    titel: '',
    groeße: '',
    zimmerAnzahl: '',
    wohnungsTyp: '',
    verfuegbarAb: '',
    kaltMiete: '',
    warmMiete: '',
    nebenkosten: '',
    adresse: '',
  };

  const { window } = new JSDOM(data);
  flat.titel = trimString(window.document.querySelector('#viewad-title')?.textContent as string);
  flat.adresse = trimString(window.document.querySelector('#viewad-locality')?.textContent as string);
  flat.kaltMiete = trimString(window.document.querySelector('#viewad-price')?.textContent as string);
  const detailList = [...window.document.querySelectorAll('li.addetailslist--detail')];
  detailList.forEach((detail) => {
    const name = trimString(detail.childNodes[0].textContent as string);
    const value = trimString(detail.querySelector('.addetailslist--detail--value')?.innerHTML as string);
    switch (name) {
      case 'Wohnfläche':
        flat.groeße = value;
        break;
      case 'Zimmer':
        flat.zimmerAnzahl = value;
        break;
      case 'Wohnungstyp':
        flat.wohnungsTyp = value;
        break;
      case 'Verfügbar ab':
        flat.verfuegbarAb = value;
        break;
      case 'Warmmiete':
        flat.warmMiete = value;
        break;
      case 'Nebenkosten':
        flat.nebenkosten = value;
        break;
      default:
        break;
    }
  });

  const featureList = [...window.document.querySelectorAll('li.checktag')];
  flat.features = featureList.map((feature) => (
    trimString(feature.textContent as string)
  ));
  flat.firstImageUrl = (window.document.querySelector('#viewad-image') as HTMLImageElement)?.src;
  return flat;
}
