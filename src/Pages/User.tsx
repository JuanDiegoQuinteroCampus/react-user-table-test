import InputSearch from "@/Components/InputSearch";
import DataTable from "@/Components/DataTable";
import type { Column } from "@/Components/DataTable";
import Spinner from "@/Components/Spinner";
import ButtonGradient from "@/Components/ButtonGradient";
import UserForm from "@/Pages/UserForm";
import { UserField } from "@/types/UserField";
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

// Definición de las columnas para la tabla de usuarios
const columns: Column<UserField>[] = [
  { title: "Nombre", key: "firstName" },
  { title: "Apellido", key: "lastName" },
  { title: "Email", key: "email" },
  {
    title: "Estado",
    key: "status",
    render: (value: string | number | boolean, row: UserField) => {
      if (typeof value === "boolean") {
        return value ? (
          <span className="text-green-600 font-semibold">Activo</span>
        ) : (
          <span className="text-red-500 font-semibold">Inactivo</span>
        );
      }
      return <span className="text-gray-400 italic">Sin definir</span>;
    },
  },
];

export default function User() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<UserField[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserField | null>(null);
  const [searchText, setSearchText] = useState("");

  // Función para manejar la edición de un usuario
  function handleEdit(row: UserField) {
    setSelectedUser(row);
    setShowForm(true);
  }

  // Función para manejar la eliminación de un usuario
  async function handleDelete(row: UserField) {
    if (!confirm(`¿Eliminar a ${row.firstName} ${row.lastName}?`)) return;
    setLoading(true);
    try {
      await axios.delete(`https://api.fake-rest.refine.dev/users/${row.id}`);
      setUsers((prev) => prev.filter((user) => user.id !== row.id));
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("No se pudo eliminar el usuario.");
    } finally {
      setLoading(false);
    }
  }

  // Función para obtener los usuarios desde la API
  async function fetchData() {
    setLoading(true);
    try {
      const res = await axios.get("https://api.fake-rest.refine.dev/users");
      const transformed = res.data.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
      }));
      setUsers(transformed);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Filtrado de usuarios según el texto de búsqueda
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchText)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
      >
        <AnimatePresence mode="wait">
          {/* Condición para mostrar la lista de usuarios o el formulario */}
          {!showForm ? (
            <motion.div
              key="user-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Barra de búsqueda y botón para crear usuario */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <InputSearch
                  onSearchChange={(val) => setSearchText(val.toLowerCase())}
                  placeHolderText="Buscar por nombre, apellido o correo"
                />
                <ButtonGradient
                  onClick={() => setShowForm(true)}
                  className="min-w-[160px]"
                >
                  + Crear Usuario
                </ButtonGradient>
              </div>

              {/* Spinner mientras se cargan los datos */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <Spinner size="lg" />
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={filteredUsers}
                  rowActions={(row) => [
                    {
                      icon: Pencil,
                      label: "Editar",
                      onClick: () => handleEdit(row),
                    },
                    {
                      icon: Trash2,
                      label: "Eliminar",
                      onClick: () => handleDelete(row),
                      danger: true,
                    },
                  ]}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Formulario para crear o editar usuario */}
              <UserForm
                onCancel={() => {
                  setShowForm(false);
                  setSelectedUser(null);
                }}
                initialData={selectedUser}
                onSubmitSuccess={() => fetchData()}
                updateUserList={(user) => setUsers((prev) => [...prev, user])}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
