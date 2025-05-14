interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'; // Tamaño del spinner: pequeño, mediano o grande
}

export default function Spinner({ size = 'md' }: SpinnerProps) {
  // Determina las clases de tamaño basadas en el valor de `size`
  const sizeClass =
    size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6';

  return (
    // Spinner con animación y borde redondeado, tamaño ajustado
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent border-gray-400 ${sizeClass}`}
    />
  );
}
