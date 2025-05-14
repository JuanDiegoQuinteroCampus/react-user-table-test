import { X } from 'lucide-react'; // Icono de cierre
import { motion } from 'framer-motion'; // Para animación del botón

interface CancelButtonProps {
    onClick: () => void; // Función que se ejecuta al hacer clic
    children?: React.ReactNode; // Texto o contenido dentro del botón (opcional)
    type?: 'button' | 'submit' | 'reset'; // Tipo de botón: button, submit o reset
    className?: string; // Clases adicionales para personalizar el estilo
}

export default function CancelButton({
    onClick,
    children = 'Cancelar', // Valor predeterminado para `children` si no se pasa ninguno
    type = 'button', // Valor predeterminado para `type` como 'button'
    className = '', // Clases adicionales opcionales
}: CancelButtonProps) {
    return (
        <motion.button
            type={type} // Establece el tipo del botón
            onClick={onClick} // Define la acción al hacer clic
            initial={{ opacity: 0, scale: 0.95 }} // Efecto inicial de opacidad y escala
            animate={{ opacity: 1, scale: 1 }} // Animación final: opacidad y escala normal
            transition={{ duration: 0.1, ease: 'easeOut' }} // Transición suave
            whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }} // Animación al pasar el mouse
            whileTap={{ scale: 0.95 }} // Animación al hacer clic
            className={`inline-flex items-center gap-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm font-medium transition-colors ${className}`}
        >
            <X className="h-4 w-4 mr-2" /> {/* Icono de cierre */}
            {children} {/* Muestra el texto del botón */}
        </motion.button>
    );
}
