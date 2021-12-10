export function trimString(string: string | undefined): string {
  return string?.trim().replace(/[\n\r]/g, '') as string;
}
