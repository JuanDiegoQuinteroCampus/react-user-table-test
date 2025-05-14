import { forwardRef, SelectHTMLAttributes } from 'react';

// Definición de tipo para las opciones del selector (cada opción tiene una etiqueta y un valor).
interface Option {
  label: string; // Texto que se muestra para la opción.
  value: string; // Valor que se envía cuando se selecciona la opción.
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[]; // Lista de opciones que se mostrarán en el selector.
  className?: string; // Clase CSS adicional que se puede aplicar al componente.
}

// Componente de selección reutilizable, que recibe un array de opciones y se muestra como un <select>.
const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ options = [], className = '', ...props }, ref) => {
    return (
      <select
        {...props}
        ref={ref} // Reenvía la referencia al <select> para el control de acceso.
        className={`block w-full border border-input rounded-md bg-white px-3 py-2.5 text-sm text-black focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

export default SelectInput;
