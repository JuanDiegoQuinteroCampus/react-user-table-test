# React User Table Test

## Descripción

Esta aplicación es un proyecto desarrollado en **React con TypeScript (TSX)** que permite gestionar usuarios a través de una tabla interactiva. Incluye funcionalidades para buscar, crear, editar y eliminar usuarios mediante una interfaz sencilla y responsiva.

### ¿Qué se hizo y cómo funciona?

- Se crearon páginas y componentes reutilizables para manejar la gestión de usuarios.
- La aplicación usa varios componentes clave para UI y UX como:
  - `ButtonGradient` y `CancelButton` para acciones con estilos agradables.
  - `DataTable` para mostrar los usuarios en formato tabular con paginación y acciones.
  - `InputError` para mostrar mensajes de error en formularios.
  - `InputLabel` e `InputSearch` para mejorar la experiencia en los formularios y búsquedas.
  - `RowActionsMenu` para desplegar menús de acciones (editar, eliminar) en cada fila.
  - `SelectInput` para desplegables personalizados.
  - `Spinner` para indicar carga o espera.
  - `TextInput` para inputs de texto estilizados y con foco programado.

La app permite buscar usuarios en tiempo real, mostrar mensajes de error claros y manejar las acciones en la tabla con un menú desplegable.

---

## Cómo clonar y correr el proyecto (Linux)

1. Abre tu terminal y clona el repositorio:

```bash
git clone https://github.com/JuanDiegoQuinteroCampus/react-user-table-test.git
````

2. Navega al directorio del proyecto:

```bash
cd react-user-table-test
```

3. Instala las dependencias necesarias:

```bash
npm install
```

4. Ejecuta la aplicación en modo desarrollo:

```bash
npm run dev
```

5. Abre tu navegador en la dirección que te indique la consola (normalmente `http://localhost:3000`).

---

## Tecnologías usadas

* React con TypeScript (TSX)
* Tailwind CSS para estilos
* Lucide React para iconos
* Componentes personalizados reutilizables para UI consistente

---
