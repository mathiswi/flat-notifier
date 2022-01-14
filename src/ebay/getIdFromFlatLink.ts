export function getIdFromFlatLink(link: string): string {
  const linkParts = link.split('/');
  const lastPart = linkParts[linkParts.length - 1];
  const id = lastPart!.split('-')[0];
  return id;
}
