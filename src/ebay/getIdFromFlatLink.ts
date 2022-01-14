export function getIdFromFlatLink(link: string): string {
  const lastPart = link.split('/').at(-1);
  const id = lastPart!.split('-')[0];
  return id;
}
