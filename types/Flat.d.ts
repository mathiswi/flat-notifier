interface Flat {
  url: string
  titel: string
  adresse: string
  zimmerAnzahl: string
  warmMiete: string
  kaltMiete: string
  nebenkosten: string
  verfuegbarAb: string
  wohnungsTyp?: string
  groeße: string
  features?: string[]
  firstImageUrl?: string
}

interface FlatInfo {
  flatUrl: string
  flatId: string
}
