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

const schema = z.object({
  nombre: z.string().min(2, "Indica tu nombre."),
  telefono: z.string().min(9, "Indica un telefono valido."),
  email: z.string().email("Indica un correo valido.").optional().or(z.literal("")),
  relacion: z.string().optional(),
  municipio: z.string().optional(),
  tipoInmueble: z.string().optional(),
  situacion: z.string().optional(),
  comentarios: z.string().min(5, "Cuentanos brevemente la oportunidad."),
  consentimiento: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la politica de privacidad." }),
  }),
});

type FormValues = z.infer<typeof schema>;

export function ColaboradorForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    setServerError(undefined);
    const result = await submitLead("colaborador", values);
    if (result.ok) setStatus("success");
    else {
      setStatus("error");
      setServerError(result.error);
    }
  };

  if (status === "success") {
    return (
      <FormSuccess
        title="Gracias por tu colaboracion"
        message="Hemos recibido la oportunidad. La estudiaremos y te contactaremos. Si la operacion se cierra, hablaremos de tu compensacion."
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
          error={errors.nombre?.message}
          {...register("nombre")}
        />
        <TextInput
          label="Telefono"
          required
          type="tel"
          autoComplete="tel"
          error={errors.telefono?.message}
          {...register("telefono")}
        />
        <TextInput
          label="Correo electronico"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <SelectInput
          label="Relacion con el propietario"
          placeholder="Selecciona"
          options={[
            { value: "Vecino", label: "Vecino / conocido" },
            { value: "Portero", label: "Portero / conserje" },
            { value: "Administrador", label: "Administrador de fincas" },
            { value: "Abogado", label: "Abogado / gestor" },
            { value: "Profesional", label: "Reformista / electricista / fontanero" },
            { value: "Agente", label: "Agente independiente" },
            { value: "Otro", label: "Otro" },
          ]}
          {...register("relacion")}
        />
        <SelectInput
          label="Municipio del inmueble"
          placeholder="Selecciona"
          options={[
            ...zonas.map((z) => ({ value: z.name, label: z.name })),
            { value: "Sevilla capital", label: "Sevilla capital" },
            { value: "Otro", label: "Otro" },
          ]}
          {...register("municipio")}
        />
        <SelectInput
          label="Tipo de inmueble"
          placeholder="Selecciona"
          options={[
            { value: "Piso", label: "Piso" },
            { value: "Casa o chalet", label: "Casa o chalet" },
            { value: "Adosado", label: "Adosado" },
            { value: "Local o edificio", label: "Local / edificio" },
            { value: "Otro", label: "Otro" },
          ]}
          {...register("tipoInmueble")}
        />
        <SelectInput
          label="Situacion"
          placeholder="Selecciona"
          wrapperClassName="sm:col-span-2"
          options={[
            { value: "Piensa vender", label: "El propietario piensa vender" },
            { value: "Podria vender", label: "Podria vender con la oferta adecuada" },
            { value: "Herencia", label: "Vivienda en herencia" },
            { value: "No lo se", label: "No estoy seguro" },
          ]}
          {...register("situacion")}
        />
      </div>

      <TextArea
        label="Detalles de la oportunidad"
        required
        placeholder="Cuentanos lo que sepas: zona, tipo de vivienda, situacion del propietario, etc. No hace falta que sea exacto."
        error={errors.comentarios?.message}
        {...register("comentarios")}
      />

      <Checkbox error={errors.consentimiento?.message} {...register("consentimiento")}>
        <ConsentText />
      </Checkbox>

      <FormError message={serverError} />

      <SubmitButton status={status}>Enviar oportunidad</SubmitButton>
    </form>
  );
}
