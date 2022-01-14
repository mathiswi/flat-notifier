import { findNewFlatUrls } from './findNewFlats';

test('Check if new flats are available and return urls', () => {
  const mockedNewFlats = [
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
  ];

  const mockedIds = [
    '1941380733',
    '1943252790',
    '1956151029',
    '1956082259',
    '1943252790',
    '1954460826',
  ];

  expect(findNewFlatUrls(mockedNewFlats, mockedIds)).toStrictEqual([
    '/s-anzeige/3-zkbb-zentral-ol-buergerfelde/1955972992-203-3112',
  ]);
});
