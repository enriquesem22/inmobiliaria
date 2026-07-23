"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zonas } from "@/data/zonas";
import { TextInput, SelectInput, TextArea, Checkbox } from "./fields";
import {
  ConsentText,
  FormError,
  FormSuccess,
  SubmitButton,
  submitLead,
  type SubmitStatus,
} from "./shared";

const municipios = [
  ...zonas.map((z) => ({ value: z.name, label: z.name })),
  { value: "Sevilla capital", label: "Sevilla capital" },
  { value: "Otro", label: "Otro municipio" },
];

const schema = z.object({
  nombre: z.string().min(2, "Indica tu nombre."),
  telefono: z
    .string()
    .min(9, "Indica un telefono valido.")
    .regex(/^[0-9+\s()-]{9,}$/, "Indica un telefono valido."),
  email: z
    .string()
    .email("Indica un correo valido.")
    .optional()
    .or(z.literal("")),
  municipio: z.string().min(1, "Selecciona el municipio."),
  direccion: z.string().optional(),
  tipoVivienda: z.string().min(1, "Selecciona el tipo de vivienda."),
  superficie: z.string().optional(),
  habitaciones: z.string().optional(),
  estado: z.string().optional(),
  ascensor: z.string().optional(),
  precioEsperado: z.string().optional(),
  motivo: z.string().optional(),
  plazo: z.string().optional(),
  comentarios: z.string().optional(),
  consentimiento: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la politica de privacidad." }),
  }),
});

type FormValues = z.infer<typeof schema>;

export function PropertyForm({ type = "valoracion" }: { type?: "valoracion" | "vender" }) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    setServerError(undefined);
    const result = await submitLead(type, values);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setServerError(result.error);
    }
  };

  if (status === "success") {
    return (
      <FormSuccess
        title="Solicitud de valoracion recibida"
        message="Gracias. Revisaremos los datos de tu vivienda y te contactaremos para concretar la visita y la valoracion, sin ningun compromiso."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Nombre"
          required
          autoComplete="name"
          placeholder="Tu nombre"
          error={errors.nombre?.message}
          {...register("nombre")}
        />
        <TextInput
          label="Telefono"
          required
          type="tel"
          autoComplete="tel"
          placeholder="600 00 00 00"
          error={errors.telefono?.message}
          {...register("telefono")}
        />
        <TextInput
          label="Correo electronico"
          type="email"
          autoComplete="email"
          placeholder="tucorreo@email.com"
          hint="Opcional, pero nos ayuda a enviarte el informe."
          error={errors.email?.message}
          {...register("email")}
        />
        <SelectInput
          label="Municipio"
          required
          placeholder="Selecciona un municipio"
          options={municipios}
          error={errors.municipio?.message}
          {...register("municipio")}
        />
        <TextInput
          label="Direccion aproximada"
          placeholder="Calle o zona (no hace falta el numero exacto)"
          wrapperClassName="sm:col-span-2"
          hint="Nos ayuda a estudiar el micromercado. No la publicaremos."
          error={errors.direccion?.message}
          {...register("direccion")}
        />
        <SelectInput
          label="Tipo de vivienda"
          required
          placeholder="Selecciona una opcion"
          options={[
            { value: "Piso", label: "Piso" },
            { value: "Atico", label: "Atico" },
            { value: "Duplex", label: "Duplex" },
            { value: "Casa o chalet", label: "Casa o chalet" },
            { value: "Adosado", label: "Adosado / pareado" },
            { value: "Otro", label: "Otro" },
          ]}
          error={errors.tipoVivienda?.message}
          {...register("tipoVivienda")}
        />
        <TextInput
          label="Superficie (m2)"
          type="number"
          inputMode="numeric"
          placeholder="Ej. 95"
          error={errors.superficie?.message}
          {...register("superficie")}
        />
        <SelectInput
          label="Habitaciones"
          placeholder="Selecciona"
          options={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5+", label: "5 o mas" },
          ]}
          error={errors.habitaciones?.message}
          {...register("habitaciones")}
        />
        <SelectInput
          label="Estado"
          placeholder="Selecciona"
          options={[
            { value: "A reformar", label: "A reformar" },
            { value: "Buen estado", label: "Buen estado" },
            { value: "Reformado", label: "Reformado" },
            { value: "Nuevo", label: "Nuevo / a estrenar" },
          ]}
          error={errors.estado?.message}
          {...register("estado")}
        />
        <SelectInput
          label="Ascensor"
          placeholder="Selecciona"
          options={[
            { value: "Si", label: "Si" },
            { value: "No", label: "No" },
            { value: "No aplica", label: "No aplica" },
          ]}
          error={errors.ascensor?.message}
          {...register("ascensor")}
        />
        <TextInput
          label="Precio esperado"
          placeholder="Ej. 180.000 EUR (si tienes una idea)"
          error={errors.precioEsperado?.message}
          {...register("precioEsperado")}
        />
        <SelectInput
          label="Motivo de venta"
          placeholder="Selecciona"
          options={[
            { value: "Cambio de vivienda", label: "Cambio de vivienda" },
            { value: "Herencia", label: "Herencia" },
            { value: "Inversion", label: "Inversion / desinversion" },
            { value: "Traslado", label: "Traslado" },
            { value: "Otro", label: "Otro" },
          ]}
          error={errors.motivo?.message}
          {...register("motivo")}
        />
        <SelectInput
          label="Plazo para vender"
          placeholder="Selecciona"
          options={[
            { value: "Cuanto antes", label: "Cuanto antes" },
            { value: "1-3 meses", label: "En 1-3 meses" },
            { value: "3-6 meses", label: "En 3-6 meses" },
            { value: "Sin prisa", label: "Sin prisa / solo informarme" },
          ]}
          error={errors.plazo?.message}
          {...register("plazo")}
        />
      </div>

      <TextArea
        label="Comentarios"
        placeholder="Cuentanos cualquier detalle relevante de la vivienda."
        {...register("comentarios")}
      />

      <Checkbox error={errors.consentimiento?.message} {...register("consentimiento")}>
        <ConsentText />
      </Checkbox>

      <FormError message={serverError} />

      <SubmitButton status={status}>Solicitar valoracion gratuita</SubmitButton>
      <p className="text-xs text-stone-500">
        Sin compromiso. Usaremos tus datos unicamente para gestionar tu solicitud.
      </p>
    </form>
  );
}
