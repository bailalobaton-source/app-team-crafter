"use client";

import { User } from "@/interfaces/user.type";
import { updatePerfil } from "@/services/auth/auth.service";
import { usePerfilStore } from "@/stores/perfil.store";
import { inputClassNames3, inputClassNames4 } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";
import { Avatar, Button, Input } from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function InformacionPersonal() {
  const { language } = useLanguageStore();

  const t = {
    es: {
      title: "Información personal",
      profilePic: "Fotografía de perfil",
      clickUpload: "Click para subir",
      orDrag: "o arrastra y suelta",
      formats: "SVG, PNG, JPG o GIF (max. 800x400px)",
      name: "Nombre",
      surname: "Apellidos",
      email: "Correo electrónico",
      phone: "Teléfono",
      dni: "DNI/ID/CE",
      passwordSection: "Contraseña",
      currentPassword: "Contraseña actual",
      modifyPassword: "Modificar contraseña",
      save: "Guardar",
      uploadingError: "Por favor selecciona un archivo de imagen válido",
      updatedSuccess: "Los datos se actualizaron correctamente",
    },
    en: {
      title: "Personal Information",
      profilePic: "Profile picture",
      clickUpload: "Click to upload",
      orDrag: "or drag and drop",
      formats: "SVG, PNG, JPG or GIF (max. 800x400px)",
      name: "First Name",
      surname: "Last Name",
      email: "Email",
      phone: "Phone",
      dni: "DNI/ID/CE",
      passwordSection: "Password",
      currentPassword: "Current password",
      modifyPassword: "Change password",
      save: "Save",
      uploadingError: "Please select a valid image file",
      updatedSuccess: "Your information has been updated successfully",
    },
  }[language];

  const perfil = usePerfilStore((state) => state.perfil);
  const setPerfil = usePerfilStore((state) => state.setPerfil);

  const { register, handleSubmit, reset, control } = useForm<User>();
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (perfil) reset(perfil);
  }, [perfil, reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert(t.uploadingError);
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = useCallback(
    async (data: User) => {
      if (perfil) {
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append("nombre", data.nombre);
          formData.append("apellidos", data.apellidos);
          formData.append("telefono", data.telefono);
          formData.append("codigo_pais", data.codigo_pais);
          formData.append("dni_id_ce", data.dni_id_ce || "");
          formData.append("newPassword", data.reset_password || "");

          if (selectedImage) formData.append("img", selectedImage);

          const res = await updatePerfil(perfil.id, formData);
          setPerfil({ ...res });
          reset();
          removeImage();

          toast.success(t.updatedSuccess);
        } catch (err: unknown) {
          handleAxiosError(err);
        } finally {
          setLoading(false);
        }
      }
    },
    [selectedImage, perfil, reset, setPerfil, t.updatedSuccess]
  );

  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col gap-4">
      <h2 className="text-2xl text-[#8A8A8A] font-bold max-sm:text-xl">
        {t.title}
      </h2>
      {perfil && (
        <form
          className="w-full flex flex-col gap-4 text-[#8A8A8A] font-medium"
          onSubmit={handleSubmit(onSubmit)}
        >
          <article className="flex justify-between gap-4 max-sm:flex-col">
            <h3>{t.profilePic}</h3>
            <div className="w-full max-w-[572px] flex gap-4">
              <Avatar
                className="w-16 h-16 flex-shrink-0 max-sm:w-14 max-sm:h-14"
                src={
                  perfil?.foto_perfil
                    ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${perfil.foto_perfil}`
                    : "/icons/user.svg"
                }
                alt={`Avatar de ${perfil?.nombre}`}
              />
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div
                className="w-full border-1 border-[#8A8A8A] px-4 py-10 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer"
                onClick={handleImageClick}
              >
                <span className="w-16 h-16 bg-[#FFE1F2] rounded-full flex items-center justify-center">
                  <LiaCloudUploadAltSolid className="text-[#FC68B9] text-3xl" />
                </span>
                <p>
                  <strong className="text-[#FC68B9]">{t.clickUpload}</strong>{" "}
                  {t.orDrag}
                </p>
                <p>{t.formats}</p>

                {imagePreview && (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border"
                      width={1000}
                      height={1000}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-[#FC68B9] text-white rounded-full w-8 h-8 flex items-center justify-center text-3xl hover:bg-[#e35aa5] cursor-pointer transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Nombre y Apellidos */}
          <div className="w-full flex gap-2 justify-between max-sm:flex-col">
            <h4>{t.name}</h4>
            <div className="w-full max-w-[572px] flex gap-4 max-sm:flex-col">
              <Input
                isRequired
                classNames={inputClassNames3}
                labelPlacement="outside"
                type="text"
                {...register("nombre")}
                errorMessage={`${t.name} es obligatorio`}
                radius="md"
                defaultValue={perfil?.nombre}
              />
              <Input
                isRequired
                classNames={inputClassNames3}
                placeholder={t.surname}
                labelPlacement="outside"
                type="text"
                {...register("apellidos")}
                errorMessage={`${t.surname} es obligatorio`}
                radius="md"
                defaultValue={perfil?.apellidos}
              />
            </div>
          </div>

          {/* Correo */}
          <div className="w-full flex gap-2 justify-between max-sm:flex-col">
            <h4>{t.email}</h4>
            <div className="w-full max-w-[572px] flex gap-4 ">
              <Input
                disabled
                isRequired
                classNames={inputClassNames3}
                labelPlacement="outside"
                type="text"
                errorMessage={`${t.email} es obligatorio`}
                radius="md"
                defaultValue={perfil?.correo}
                startContent={<CiMail className="min-w-8 text-2xl" />}
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="w-full relative flex gap-2 justify-between max-sm:flex-col">
            <h4>{t.phone}</h4>
            <div className="relative w-full max-w-[572px] flex gap-0 border-1 rounded-xl ">
              <Controller
                name="codigo_pais"
                control={control}
                defaultValue={perfil?.codigo_pais || ""}
                rules={{ required: `${t.phone} es obligatorio` }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="relative">
                    <PhoneInput
                      value={value}
                      onChange={(phone) => onChange(phone)}
                      inputStyle={{
                        width: "100px",
                        height: "48px",
                        borderRadius: "12px",
                        border: "1px solid #8A8A8A",
                        paddingLeft: "50px",
                        fontSize: "14px",
                        fontWeight: "400",
                        backgroundColor: "#ffff",
                        color: "#18181b",
                        outline: "none",
                        transition: "all 0.2s ease",
                      }}
                      buttonStyle={{
                        border: "none",
                        backgroundColor: "transparent",
                        borderRadius: "5px",
                        paddingLeft: "10px",
                        paddingRight: "8px",
                      }}
                      containerStyle={{
                        width: "100px",
                      }}
                      dropdownStyle={{
                        borderRadius: "5px",
                        border: "2px solid #8A8A8A",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    {error && (
                      <p className="text-xs text-red-500 mt-1 ml-3">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Input
                className="w-full"
                classNames={inputClassNames4}
                isRequired
                label=""
                labelPlacement="outside"
                type="number"
                {...register("telefono")}
                defaultValue={perfil?.telefono}
                radius="none"
              />
            </div>
          </div>

          {/* DNI */}
          <div className="w-full flex gap-2 justify-between max-sm:flex-col">
            <h4>{t.dni}</h4>
            <div className="w-full max-w-[572px] flex gap-4 ">
              <Input
                isRequired
                classNames={inputClassNames3}
                labelPlacement="outside"
                type="text"
                {...register("dni_id_ce")}
                errorMessage={`${t.dni} es obligatorio`}
                radius="md"
                defaultValue={perfil?.dni_id_ce || ""}
              />
            </div>
          </div>

          {/* Contraseña */}
          <h3 className="text-2xl text-[#8A8A8A] font-bold ">
            {t.passwordSection}
          </h3>
          <div className="w-full flex gap-2 justify-between max-sm:flex-col">
            <h4>
              {t.currentPassword}
              <p className="text-[#FC68B9]">{t.modifyPassword}</p>
            </h4>
            <div className="w-full max-w-[572px] flex gap-4 ">
              <Input
                classNames={inputClassNames3}
                labelPlacement="outside"
                placeholder="****************"
                type="password"
                {...register("reset_password")}
                radius="md"
                defaultValue=""
              />
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="w-full flex justify-end gap-4 mt-4">
            <Button
              type="submit"
              className="bg-[#FC68B9] text-2xl p-6 text-white font-semibold max-sm:text-lg"
              radius="full"
            >
              {loading
                ? `${language === "es" ? "cargando..." : "loading..."}`
                : t.save}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
