import { useEffect, useRef, useState } from "react";
import { Ellipsis } from "lucide-react";

// Definición de tipo para las acciones del menú (cada acción tiene un ícono, etiqueta, y función onClick).
type Action = {
  icon: React.ComponentType<{ className?: string }>; // Componente del ícono.
  label: string; // Texto que se mostrará en el botón de la acción.
  onClick: () => void; // Función que se ejecutará cuando se haga clic en la acción.
  danger?: boolean; // Si es true, el botón tiene un estilo de advertencia (generalmente en rojo).
};

interface RowActionsMenuProps {
  actions: Action[]; // Lista de acciones disponibles para cada fila.
  rowId: string | number; // Identificador único de la fila.
  openActionRowId: string | number | null; // ID de la fila abierta (si alguna fila tiene su menú abierto).
  setOpenActionRowId: (id: string | number | null) => void; // Función para abrir o cerrar el menú de acciones de una fila.
}

// Componente que muestra un menú de acciones para cada fila, con iconos y funciones asociadas.
export default function RowActionsMenu({
  actions = [],
  rowId,
  openActionRowId,
  setOpenActionRowId,
}: RowActionsMenuProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Referencia al botón que activa el menú.
  const menuRef = useRef<HTMLDivElement | null>(null); // Referencia al menú de acciones.
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 }); // Estado para la posición del menú.

  const isOpen = openActionRowId === rowId; // Si el menú de esta fila está abierto.

  // Función para abrir o cerrar el menú de acciones.
  const toggleMenu = () => {
    if (isOpen) {
      setOpenActionRowId(null); // Cerrar el menú si ya está abierto.
    } else if (buttonRef.current) {
      // Si el menú no está abierto, calcular la posición y abrirlo.
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 192 + window.scrollX,
      });
      setOpenActionRowId(rowId);
    }
  };

  // Efectos para manejar clics fuera del menú y la tecla Escape.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenActionRowId(null); // Cerrar menú si se hace clic fuera.
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenActionRowId(null); // Cerrar menú si se presiona Escape.
    };

    // Añadir o quitar eventos de escucha según si el menú está abierto.
    if (isOpen) {
      document.documentElement.classList.add("scroll-locked");
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.documentElement.classList.remove("scroll-locked");
    }

    return () => {
      document.documentElement.classList.remove("scroll-locked");
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setOpenActionRowId]);

  return (
    <>
      <div className="relative">
        {/* Botón que activa el menú de acciones */}
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="inline-flex items-center justify-center h-10 w-10 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          <Ellipsis className="w-4 h-4" />
          <span className="sr-only">Acciones</span>
        </button>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed z-50 w-48 rounded-md bg-white shadow-md border"
          style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
        >
          {/* Menú de acciones */}
          {actions.map(({ icon: Icon, label, onClick, danger }, index) => (
            <button
              key={index}
              onClick={() => {
                onClick(); // Ejecutar la función de la acción al hacer clic.
                setOpenActionRowId(null); // Cerrar el menú después de la acción.
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                danger ? "text-red-600" : ""
              }`}
            >
              {/* Icono de la acción */}
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
