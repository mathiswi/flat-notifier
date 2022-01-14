export function compareForNewFlats(foundFlats: FlatInfo[], idsFromDB: string[]): FlatInfo[] {
  const newFlats: FlatInfo[] = foundFlats.reduce((result: FlatInfo[], flat: FlatInfo) => {
    if (idsFromDB.includes(flat.flatId) === false) {
      result.push({ flatUrl: flat.flatUrl, flatId: flat.flatId });
    }
    return result;
  }, []);
  return newFlats;
}
