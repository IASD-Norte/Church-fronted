export type Church = {
  name: string;
  direccion: string;
  description?: string;
  images?: string[];
  lat?: number;
  lng?: number;
};

let churchDataPromise: Promise<Church[]> | null = null;

export async function churchData(): Promise<Church[]> {
  if (!churchDataPromise) {
    churchDataPromise = fetch("/data/church.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load churches: ${res.status}`);
        }
        return res.json() as Promise<{ bga?: Church[] }>;
      })
      .then((data) => {
        if (!Array.isArray(data.bga)) {
          throw new Error("Invalid churches payload");
        }
        return data.bga;
      });
  }

  return churchDataPromise;
}
