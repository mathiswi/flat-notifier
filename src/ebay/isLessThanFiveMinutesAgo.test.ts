import { isLessThanFiveMinutesAgo } from './isLessThanFiveMinutesAgo';

test('HTML String is less than 5 minutes ago', () => {
  const dateToday = new Date();
  dateToday.setHours(15);
  dateToday.setMinutes(13);
  console.log(dateToday);
  jest.useFakeTimers().setSystemTime(new Date(dateToday).getTime());
  const htmlInput = 'Heute, 15:10';
  expect(isLessThanFiveMinutesAgo(htmlInput)).toBe(true);
});

test('HTML String is older than 5 minutes ago', () => {
  const dateToday = new Date();
  dateToday.setHours(15);
  dateToday.setMinutes(13);
  console.log(dateToday);
  jest.useFakeTimers().setSystemTime(new Date(dateToday).getTime());
  const htmlInput = 'Heute, 15:02';
  expect(isLessThanFiveMinutesAgo(htmlInput)).toBe(false);
});
