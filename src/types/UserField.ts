// Interfaz para representar un campo de usuario.
export interface UserField {
  id: number;           // Identificador único del usuario.
  firstName: string;    // Primer nombre del usuario.
  lastName: string;     // Apellido del usuario.
  email: string;        // Correo electrónico del usuario.
  status: boolean;      // Estado del usuario (activo o inactivo, por ejemplo).
}
