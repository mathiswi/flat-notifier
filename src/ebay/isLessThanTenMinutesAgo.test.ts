import { isLessThanTenMinutesAgo } from './isLessThanTenMinutesAgo';

test('HTML String is less than 10 minutes ago', () => {
  const dateToday = new Date();
  dateToday.setHours(15);
  dateToday.setMinutes(13);
  console.log(dateToday);
  jest.useFakeTimers().setSystemTime(new Date(dateToday).getTime());
  const htmlInput = 'Heute, 15:10';
  expect(isLessThanTenMinutesAgo(htmlInput)).toBe(true);
});

test('HTML String is older than 10 minutes ago', () => {
  const dateToday = new Date();
  dateToday.setHours(15);
  dateToday.setMinutes(13);
  console.log(dateToday);
  jest.useFakeTimers().setSystemTime(new Date(dateToday).getTime());
  const htmlInput = 'Heute, 15:02';
  expect(isLessThanTenMinutesAgo(htmlInput)).toBe(false);
});
