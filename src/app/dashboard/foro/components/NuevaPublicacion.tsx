"use client";
import { inputClassNames, selectClassNames } from "@/utils/classNames";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import { useCallback, useRef, useState } from "react";
import { FormForo } from "@/interfaces/foro.interface";
import { useForm } from "react-hook-form";
import { postForo } from "@/services/foro.service";
import { toast } from "sonner";
import { handleAxiosError } from "@/utils/errorHandler";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  gfindForos: () => void;
}

export default function NuevaPublicacion({ gfindForos }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<FormForo>();
  const { language } = useLanguageStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 🌐 Traducciones
  const t = {
    es: {
      newPost: "Nueva publicación",
      title: "Titular",
      titlePlaceholder: "Escribe aquí el título...",
      titleError: "El titular es obligatorio",
      content: "Contenido",
      contentPlaceholder: "Describe tu idea o pregunta aquí...",
      contentError: "El contenido es obligatorio",
      uploadImage: "Subir Imagen",
      selectedImage: "Imagen seleccionada",
      category: "Categoría",
      cancel: "Cancelar",
      publish: "Publicar",
      publishing: "Cargando...",
      success: "El foro se publicó correctamente",
      invalidFile: "Por favor selecciona un archivo de imagen válido",
      advice: "Consejos",
    },
    en: {
      newPost: "New post",
      title: "Title",
      titlePlaceholder: "Write the title here...",
      titleError: "Title is required",
      content: "Content",
      contentPlaceholder: "Describe your idea or question here...",
      contentError: "Content is required",
      uploadImage: "Upload Image",
      selectedImage: "Selected image",
      category: "Category",
      cancel: "Cancel",
      publish: "Publish",
      publishing: "Loading...",
      success: "Forum post published successfully",
      invalidFile: "Please select a valid image file",
      advice: "Tips",
    },
  }[language];

  const handleImageClick = () => fileInputRef.current?.click();

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
        alert(t.invalidFile);
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = useCallback(
    async (data: FormForo) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("titulo_foro", data.titulo_foro);
        formData.append("contenido_foro", data.contenido_foro);
        formData.append("categoria_foro", data.categoria_foro);
        if (selectedImage) formData.append("img", selectedImage);

        await postForo(formData);
        gfindForos();
        reset();
        toast.success(t.success);
        removeImage();
        onClose();
      } catch (err: unknown) {
        handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    [selectedImage, gfindForos, t.success]
  );

  return (
    <section className="w-full flex flex-col gap-4 -mt-2">
      <div
        className="w-full h-[70px] flex justify-between items-center border-1 border-[#FFB4DF] rounded-2xl px-4
         cursor-pointer"
        onClick={onOpen}
      >
        <p className="text-[#8A8A8A] text-sm font-semibold">Escribe algo...</p>
        <Button
          className="relative min-w-1 w-[40px] h-[40px] p-0 bg-[#FC68B9]"
          onPress={onOpen}
        >
          <LuPlus className="text-white text-xl" />
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent className="w-full p-4">
          {(onClose) => (
            <form
              className="w-full p-4 flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="text-2xl text-[#68E1E0] font-bold">{t.newPost}</h2>

              <Input
                isRequired
                classNames={inputClassNames}
                label={t.title}
                placeholder={t.titlePlaceholder}
                labelPlacement="outside"
                type="text"
                errorMessage={t.titleError}
                {...register("titulo_foro")}
                radius="full"
              />

              <Textarea
                isRequired
                classNames={inputClassNames}
                label={t.content}
                placeholder={t.contentPlaceholder}
                labelPlacement="outside"
                errorMessage={t.contentError}
                {...register("contenido_foro")}
                radius="full"
                minRows={4}
              />

              {/* Input file oculto */}
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              {/* Botón subir imagen */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="flex items-center gap-2 p-3 cursor-pointer"
                >
                  <Image
                    src="/icons/clip.svg"
                    alt={t.uploadImage}
                    width={24}
                    height={24}
                  />
                  <p className="text-[#FC68B9] font-semibold underline">
                    {selectedImage
                      ? `${t.selectedImage}: ${selectedImage.name}`
                      : t.uploadImage}
                  </p>
                </button>

                {/* Preview de imagen */}
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
                      className="absolute top-2 right-2 bg-[#FC68B9] text-white rounded-full w-8 h-8 flex items-center justify-center text-3xl hover:bg-[#e35aa5] transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <Select
                isRequired
                label={t.category}
                classNames={selectClassNames}
                labelPlacement="outside"
                {...register("categoria_foro")}
                defaultSelectedKeys={["Consejos"]}
                listboxProps={{
                  itemClasses: {
                    base: [
                      "rounded-md",
                      "text-default-500",
                      "transition-opacity",
                      "data-[hover=true]:text-foreground",
                      "data-[hover=true]:bg-[#F1F6FB]",
                      "dark:data-[hover=true]:bg-[#F1F6FB]",
                      "data-[selectable=true]:focus:bg-[#F1F6FB]",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-default-500",
                    ],
                  },
                }}
              >
                <SelectItem key="Consejos">{t.advice}</SelectItem>
              </Select>

              <div className="w-full flex justify-end gap-4 mt-4">
                <Button
                  type="button"
                  className="bg-white text-[#FC68B9] font-semibold border-1 border-[#FC68B9]"
                  radius="full"
                  onPress={onClose}
                >
                  {t.cancel}
                </Button>

                <Button
                  type="submit"
                  className="bg-[#FC68B9] text-white font-semibold"
                  radius="full"
                  isDisabled={loading}
                >
                  {loading ? t.publishing : t.publish}
                </Button>
              </div>
            </form>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
