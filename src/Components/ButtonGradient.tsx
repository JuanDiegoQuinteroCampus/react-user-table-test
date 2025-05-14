import { ReactNode, ComponentProps } from 'react'; // Importa React, tipos y componentes necesarios
import { motion } from 'framer-motion'; // Importa motion de framer-motion para animaciones

// Definición de los props del componente ButtonGradient
interface ButtonGradientProps extends ComponentProps<typeof motion.button> {
    disabled?: boolean; // Prop opcional para deshabilitar el botón
    children: ReactNode; // Contenido dentro del botón (texto, íconos, etc.)
    className?: string; // Clases adicionales para personalizar el estilo
}

// Componente ButtonGradient
export default function ButtonGradient({
    className = '', // Clases adicionales personalizadas
    disabled = false, // Si el botón está deshabilitado
    children, // Contenido que será renderizado dentro del botón
    ...props // Otros props adicionales para el botón
}: ButtonGradientProps) {
    return (
        <motion.button
            {...props} // Permite pasar props adicionales como `onClick`, etc.
            disabled={disabled} // Controla el estado de deshabilitado
            initial={{ opacity: 0, scale: 0.95 }} // Establece la animación inicial (opacidad y escala)
            animate={{ opacity: 1, y: 0 }} // Animación cuando el componente se monta (opacidad y desplazamiento en Y)
            whileHover={{ scale: 1.05 }} // Animación de escala al pasar el mouse sobre el botón
            whileTap={{ scale: 0.95 }} // Animación de escala cuando se hace clic
            transition={{ duration: 0.3, ease: 'easeOut' }} // Transición suave con duración
            className={`
                justify-center inline-flex items-center px-4 py-2 text-white 
                bg-gradient-to-r from-blue-600 to-indigo-600 
                hover:from-blue-700 hover:to-indigo-700
                border border-transparent rounded-md font-semibold text-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                transition ease-in-out duration-150
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''} // Controla la opacidad y el cursor si está deshabilitado
                ${className} // Permite agregar clases adicionales personalizadas
            `}
        >
            {children} {/* Renderiza el contenido dentro del botón (por ejemplo, texto o íconos) */}
        </motion.button>
    );
}
