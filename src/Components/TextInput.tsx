import { forwardRef, useEffect, useRef, InputHTMLAttributes } from 'react';

// Definición de las propiedades para el componente TextInput.
// `isFocused` determina si el input debe estar enfocado inicialmente.
// `className` permite añadir clases personalizadas para estilizar el input.
// `type` define el tipo del input (por defecto es 'text'), como 'password', 'email', etc.
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean; 
    className?: string; 
    type?: string; 
}

// Componente funcional que renderiza un input de texto con estilo personalizado.
// Usamos `forwardRef` para poder pasar una referencia externa al input (necesario para el manejo de enfoque).
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ type = 'text', className = '', isFocused = false, ...props }, ref) => {
        // Creamos una referencia interna del input si no se pasa una externa a través de `ref`.
        const input = (ref as React.RefObject<HTMLInputElement>) || useRef<HTMLInputElement>(null);

        // Efecto para enfocar el input cuando `isFocused` cambia a `true`.
        useEffect(() => {
            if (isFocused && input.current) {
                input.current.focus();
            }
        }, [isFocused]);  // El efecto se ejecuta cada vez que `isFocused` cambia.

        return (
            // Renderizamos el input, pasando todas las props de entrada (como `value`, `onChange`, etc.)
            <input
                {...props}
                type={type}  // Tipo de input (por ejemplo, 'text', 'password')
                className={  // Clases de estilo aplicadas al input, con clases predeterminadas y las personalizadas.
                    'block w-full border border-input rounded-md bg-white px-3 py-2.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-neutral-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm ' +
                    className  // Se añaden las clases personalizadas si se pasan.
                }
                ref={input}  // La referencia para poder acceder al input desde el exterior.
            />
        );
    }
);

// Asignamos un nombre al componente para que se muestre en las herramientas de desarrollo.
TextInput.displayName = 'TextInput';

export default TextInput;
