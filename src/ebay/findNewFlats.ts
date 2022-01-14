export function findNewFlatUrls(foundFlats: FlatInfo[], idsFromDB: string[]): string[] {
  const newFlats: string[] = foundFlats.reduce((result: string[], flat: FlatInfo) => {
    if (idsFromDB.includes(flat.flatId) === false) {
      result.push(flat.flatUrl);
    }
    return result;
  }, []);
  return newFlats;
}
