"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";

import { cn } from "@/shared/lib/utils";

type Church = {
  name: string;
  direccion: string;
  description: string;
  images?: string[];
};

/* =======================
   COLUMNAS (SIN CHECKS)
======================= */
export const columns: ColumnDef<Church>[] = [
  {
    accessorKey: "name",
    header: "Grupo de Oración",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
];

export function ChurchTable() {
  const [data, setData] = useState<Church[]>([]);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  /* =======================
     DATA
  ======================= */
  useEffect(() => {
    fetch("/data/church.json")
      .then((res) => res.json())
      .then((json) => setData(json.bga))
      .catch((err) =>
        console.error("Error cargando iglesias:", err)
      );
  }, []);

  /* =======================
     TABLE
  ======================= */
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 4 },
    },
  });

  const openModal = (church: Church) => {
    setSelectedChurch(church);
    setModalOpen(true);
  };

  return (
    <div
      className={cn(
        "w-full max-w-[500px]",
        "bg-card border border-border rounded-xl shadow-lg",
        "p-4 md:p-6"
      )}
    >
      {/* =======================
          BUSCADOR
      ======================= */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar iglesia..."
            value={
              (table
                .getColumn("name")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("name")
                ?.setFilterValue(event.target.value)
            }
            className="pl-10"
          />
        </div>
      </div>

      {/* =======================
          TABLA
      ======================= */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => openModal(row.original)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    "hover:bg-muted/50"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* =======================
          PAGINACIÓN
      ======================= */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* =======================
          MODAL
      ======================= */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedChurch?.name}
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedChurch?.direccion}
            </DialogDescription>
          </DialogHeader>

          {selectedChurch?.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedChurch.description}
            </p>
          )}

          {selectedChurch?.images?.length && (
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {selectedChurch.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 10,
                  }}
                  className="rounded-xl p-1 bg-card border border-border shadow-md"
                >
                  <img
                    src={img}
                    alt={`${selectedChurch.name} ${idx + 1}`}
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
