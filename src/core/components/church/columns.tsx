import type { ColumnDef } from "@tanstack/react-table"

export type Church = {
  name: string;
  direccion: string;
};

export const columns: ColumnDef<Church>[] = [
  {
    accessorKey: "name",
    header: "Iglesia",
  },
  {
    accessorKey: "direccion",
    header: "Direccion",
  }
]