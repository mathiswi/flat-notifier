/* eslint-disable no-restricted-syntax */
import { readFileSync } from 'fs';
import { DOMWindow, JSDOM } from 'jsdom';
import * as AWS from 'aws-sdk';
import { sendDiscordMessage } from './sendDiscordMessage';
import { formatErrorMessage, formatMessage } from './formatMessage';
import { scrapeSite } from './scrapeSite';

const path = require('path');

const lambda = new AWS.Lambda();

export const handler = async (event?: any, context?: any): Promise<void> => {
  try {
    let domWindow: DOMWindow;
    if (process.env.STAGE === 'offline') {
      const file = readFileSync(path.resolve(__dirname, 'mock.html'), { encoding: 'utf-8' });
      const { window } = new JSDOM(file);
      domWindow = window;
    } else {
      const url = 'https://www.ebay-kleinanzeigen.de/s-wohnung-mieten/oldenburg/anzeige:angebote/preis::780/wohnung/k0c203l3108r10+wohnung_mieten.qm_d:40.00,76';
      const { window } = await JSDOM.fromURL(url, {
        pretendToBeVisual: true,
      });
      domWindow = window;
    }
    const flats = await scrapeSite(domWindow);
    const promises = [];
    if (flats?.length > 0) {
      console.log('Wohnung gefunden');
      for (const flat of flats) {
        promises.push(sendDiscordMessage(formatMessage(flat), flat.firstImageUrl));
      }
    } else {
      console.log('Keine neue Wohnung verfügbar');
    }
    await Promise.all(promises);
    if (context?.functionName) {
      await lambda.updateFunctionConfiguration({
        FunctionName: context?.functionName,
        Environment: {
          Variables: {
            FAILED_RUNS: '0',
          },
        },
      }).promise();
    }
  } catch (err: any) {
    console.error(err);
    await sendDiscordMessage(formatErrorMessage(err));
    if (context?.functionName) {
      let failedRuns: any = process.env.FAILED_RUNS;
      failedRuns = Number(failedRuns) + 1;
      await lambda.updateFunctionConfiguration({
        FunctionName: context?.functionName,
        Environment: {
          Variables: {
            FAILED_RUNS: String(failedRuns),
          },
        },
      }).promise();
    }
  }
};
