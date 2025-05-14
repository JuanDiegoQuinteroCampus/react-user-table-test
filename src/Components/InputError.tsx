import { HTMLProps } from 'react';

// Definición de las propiedades del componente `InputError`.
// `message` es el mensaje de error que se mostrará. Puede ser un string o null.
// `className` permite personalizar las clases CSS aplicadas al mensaje de error.
interface InputErrorProps extends HTMLProps<HTMLParagraphElement> {
    message: string | null;  // Mensaje de error que se mostrará si no es null.
    className?: string;      // Clases personalizadas opcionales para el estilo.
}

// Componente funcional para mostrar un mensaje de error. 
// Solo se muestra si `message` tiene un valor distinto de null.
const InputError = ({ message, className = '', ...props }: InputErrorProps) => {
    return message ? (
        // Si hay un mensaje, lo renderizamos en un párrafo con clases predeterminadas para estilo de error.
        <p {...props} className={`text-sm text-red-600 dark:text-red-400 ${className}`}>
            {message}  {/* El mensaje de error que se pasa como prop */}
        </p>
    ) : null;  // Si no hay mensaje, no se renderiza nada.
};

export default InputError;
