export type Church = {
  name: string;
  direccion: string;
};

export async function churchData(): Promise<Church[]> {
  const res = await fetch('/data/church.json');
  const data = await res.json();
  return data.bga;
}
