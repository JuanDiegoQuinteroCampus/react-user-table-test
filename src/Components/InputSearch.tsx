import TextInput from '@/Components/TextInput';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

// Definición de las propiedades para el componente InputSearch.
// `onSearchChange` es la función que se ejecutará cuando el valor del campo de búsqueda cambie.
// `placeHolderText` es el texto que aparece como sugerencia en el campo de entrada (por defecto: "Buscando usuarios").
// `valueInput` es el valor inicial del campo de búsqueda (por defecto es una cadena vacía).
interface InputSearchProps {
    onSearchChange: (value: string) => void;
    placeHolderText?: string;
    valueInput?: string;
}

// Componente que genera un campo de búsqueda con un ícono y un valor controlado.
export default function InputSearch({ onSearchChange, placeHolderText = "Buscando usuarios", valueInput = "" }: InputSearchProps) {
    // Hook para manejar el valor del input en el estado local.
    const [inputValue, setInputValue] = useState<string>(valueInput);

    // Función que se ejecuta cada vez que cambia el valor del campo de búsqueda.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (onSearchChange) onSearchChange(value);  // Llama la función `onSearchChange` para pasar el nuevo valor.
    };

    // Hook para actualizar el valor del input si el valor recibido por `valueInput` cambia.
    useEffect(() => {
        setInputValue(valueInput);
    }, [valueInput]);

    return (
        <div className="flex items-center space-x-2 flex-grow min-w-[200px]">
            {/* Contenedor para el ícono de búsqueda */}
            <div className="relative flex-1">
                {/* Ícono de búsqueda, se posiciona dentro del input */}
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                {/* Campo de texto para la búsqueda */}
                <TextInput
                    id="search"
                    type="text"
                    name="InputSearch"
                    value={inputValue}
                    onChange={handleChange}  // Al cambiar el valor, ejecuta la función `handleChange`
                    className="px-8 w-full"
                    placeholder={placeHolderText}  // Texto de sugerencia que aparece cuando el campo está vacío
                />
            </div>
        </div>
    );
}
