// Importación de hooks, componentes personalizados y librerías necesarias
import { useState, useEffect } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import ButtonGradient from "@/Components/ButtonGradient";
import CancelButton from "@/Components/CancelButton";
import Spinner from "@/Components/Spinner";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import { UserField } from "@/types/UserField";
import axios, { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

// Props esperadas por el componente
interface UserFormProps {
  onCancel: () => void;
  initialData: UserField | null;
  onSubmitSuccess: () => void;
  updateUserList: (user: UserField) => void;
}

// Componente de formulario para crear o editar un usuario
export default function UserForm({
  onCancel,
  initialData = null,
  onSubmitSuccess,
  updateUserList,
}: UserFormProps) {

  // Estado principal del formulario
  const [formData, setFormData] = useState<UserField>({
    id: initialData?.id ?? 0,
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    status: initialData?.status || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const isEditMode = Boolean(initialData);
  const [loading, setLoading] = useState(false);

  // Validador simple de email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Actualiza los campos si hay datos iniciales (modo edición)
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        id: initialData.id,
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        status: initialData.status,
      });
    }
  }, [isEditMode, initialData]);

  // Maneja cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    const validationErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) validationErrors.firstName = "El nombre es requerido.";
    if (!formData.lastName.trim()) validationErrors.lastName = "El apellido es requerido.";
    if (!formData.email.trim()) {
      validationErrors.email = "El correo es requerido.";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "El formato del correo no es válido.";
    }
    if (formData.status === undefined) validationErrors.status = "El estado es requerido.";

    // Si hay errores, se muestran
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      let response: AxiosResponse<UserField>;

      // Actualiza o crea dependiendo del modo
      if (isEditMode) {
        response = await axios.put<UserField>(
          `https://api.fake-rest.refine.dev/users/${formData.id}`,
          formData
        );
      } else {
        response = await axios.post<UserField>(
          "https://api.fake-rest.refine.dev/users",
          formData
        );
      }

      // Actualiza listado padre y resetea errores
      updateUserList(response.data);
      setErrors({});
      onSubmitSuccess();
      onCancel();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert("Hubo un error al guardar el usuario. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {isEditMode ? "Editar Usuario" : "Crear Nuevo Usuario"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Campos del formulario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="space-y-2">
              <InputLabel htmlFor="firstName" value="Nombre" />
              <TextInput
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Nombres"
                required
              />
              <InputError message={errors.firstName || null} />
            </div>

            {/* Apellido */}
            <div className="space-y-2">
              <InputLabel htmlFor="lastName" value="Apellido" />
              <TextInput
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Apellidos"
                required
              />
              <InputError message={errors.lastName || null} />
            </div>

            {/* Correo */}
            <div className="space-y-2">
              <InputLabel htmlFor="email" value="Correo electrónico" />
              <TextInput
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Correo electrónico"
              />
              <InputError message={errors.email || null} />
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <InputLabel htmlFor="status" value="Estado" />
              <SelectInput
                id="status"
                name="status"
                value={formData.status ? "Activo" : "Inactivo"}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value === "Activo" })
                }
                options={[
                  { label: "Activo", value: "Activo" },
                  { label: "Inactivo", value: "Inactivo" },
                ]}
                required
              />
              <InputError message={errors.status || null} />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2 pt-4">
            <CancelButton onClick={onCancel}>Cerrar</CancelButton>
            {loading ? (
              <Spinner />
            ) : (
              <ButtonGradient type="submit">
                <Save className="h-4 w-4 mr-2" />
                {isEditMode ? "Guardar Cambios" : "Crear Usuario"}
              </ButtonGradient>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}
