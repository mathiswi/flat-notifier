import { getIdFromFlatLink } from './getIdFromFlatLink';

test('Get the ID from the flat link', () => {
  const link = '/s-anzeige/erstbezug-schoene-helle-50-qm-dg-whg-balkon-ol-dietrichsfeld/1943252790-203-3112';
  expect(getIdFromFlatLink(link)).toBe('1943252790');
});
