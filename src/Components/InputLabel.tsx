import { HTMLProps, ReactNode } from 'react';

// Definición de las propiedades del componente `InputLabel`.
// `value` es el texto que se mostrará como etiqueta, opcional.
// `className` permite personalizar las clases CSS aplicadas al componente.
// `children` es el contenido que se renderizará dentro de la etiqueta (puede ser texto o JSX).
interface InputLabelProps extends HTMLProps<HTMLLabelElement> {
    value?: string;        // Texto de la etiqueta, si se proporciona.
    className?: string;    // Clases personalizadas opcionales para el estilo de la etiqueta.
    children?: ReactNode;  // Contenido JSX o texto alternativo que se usará como etiqueta.
}

// Componente funcional para renderizar una etiqueta <label> para un formulario.
// Si `value` está presente, se usará como texto de la etiqueta; si no, se usará `children` como contenido.
const InputLabel = ({ value, className = '', children, ...props }: InputLabelProps) => {
    return (
        <label {...props} className={`block font-medium text-sm text-black font-medium ${className}`}>
            {value ? value : children}  {/* Si `value` existe, se renderiza como texto de la etiqueta. Si no, se renderiza `children`. */}
        </label>
    );
};

export default InputLabel;
