import RowActionsMenu from "@/Components/RowActionsMenu";
import { useState } from "react";
import type { ReactNode, ComponentType } from "react";

// Columna genérica, render recibe el valor y la fila completa (tipado)
export type Column<T> = {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

// Acción de fila: ícono, label, onClick, y si es peligrosa (rojo)
type RowAction = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  danger?: boolean;
};

// Props del DataTable genérico
type DataTableProps<T extends { id: string | number }> = {
  columns: Column<T>[];
  data: T[];
  rowActions: (row: T) => RowAction[];
};

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  rowActions,
}: DataTableProps<T>) {
  const [openActionRowId, setOpenActionRowId] = useState<string | number | null>(null);

  return (
    <div className="border rounded-md">
      <div className="relative w-full overflow-x-auto max-h-[384px] overflow-y-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                >
                  {col.title}
                </th>
              ))}
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id ?? rowIndex}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  {columns.map(({ key, render }, colIndex) => {
                    const value = row[key];
                    const content: ReactNode = render ? render(value, row) : String(value);

                    return (
                      <td
                        key={colIndex}
                        className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                      >
                        {content}
                      </td>
                    );
                  })}

                  <td className="p-4 align-middle">
                    <RowActionsMenu
                      actions={rowActions(row)}
                      rowId={row.id}
                      openActionRowId={openActionRowId}
                      setOpenActionRowId={setOpenActionRowId}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="p-4 text-center text-muted-foreground"
                >
                  No hay datos para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
