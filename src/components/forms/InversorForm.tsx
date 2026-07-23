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
  presupuesto: z.string().optional(),
  zona: z.string().optional(),
  objetivo: z.string().optional(),
  rentabilidadMinima: z.string().optional(),
  financiacion: z.string().optional(),
  plazoInversion: z.string().optional(),
  comentarios: z.string().optional(),
  consentimiento: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la politica de privacidad." }),
  }),
});

type FormValues = z.infer<typeof schema>;

export function InversorForm() {
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
    const result = await submitLead("inversor", values);
    if (result.ok) setStatus("success");
    else {
      setStatus("error");
      setServerError(result.error);
    }
  };

  if (status === "success") {
    return (
      <FormSuccess
        title="Perfil de inversion recibido"
        message="Gracias. Analizaremos tu perfil y te avisaremos cuando encontremos oportunidades que encajen con tus criterios."
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
        <TextInput
          label="Presupuesto de inversion"
          placeholder="Ej. hasta 150.000 EUR"
          {...register("presupuesto")}
        />
        <SelectInput
          label="Zona de interes"
          placeholder="Selecciona"
          options={[
            ...zonas.map((z) => ({ value: z.name, label: z.name })),
            { value: "Todo el Aljarafe", label: "Todo el Aljarafe" },
            { value: "Sevilla capital", label: "Sevilla capital" },
          ]}
          {...register("zona")}
        />
        <SelectInput
          label="Objetivo"
          placeholder="Selecciona"
          options={[
            { value: "Alquiler", label: "Comprar para alquilar" },
            { value: "Flip", label: "Comprar, reformar y vender (flip)" },
            { value: "Ambos", label: "Ambas / a estudiar" },
          ]}
          {...register("objetivo")}
        />
        <TextInput
          label="Rentabilidad minima buscada"
          placeholder="Ej. 6% bruto"
          {...register("rentabilidadMinima")}
        />
        <SelectInput
          label="Financiacion disponible"
          placeholder="Selecciona"
          options={[
            { value: "Solo fondos propios", label: "Solo fondos propios" },
            { value: "Con hipoteca", label: "Con hipoteca / financiacion" },
            { value: "Por definir", label: "Por definir" },
          ]}
          {...register("financiacion")}
        />
        <SelectInput
          label="Plazo de inversion"
          placeholder="Selecciona"
          wrapperClassName="sm:col-span-2"
          options={[
            { value: "Corto plazo", label: "Corto plazo (flip)" },
            { value: "Medio plazo", label: "Medio plazo" },
            { value: "Largo plazo", label: "Largo plazo (patrimonio)" },
          ]}
          {...register("plazoInversion")}
        />
      </div>

      <TextArea
        label="Comentarios"
        placeholder="Cuentanos que tipo de operaciones te interesan."
        {...register("comentarios")}
      />

      <Checkbox error={errors.consentimiento?.message} {...register("consentimiento")}>
        <ConsentText />
      </Checkbox>

      <FormError message={serverError} />

      <SubmitButton status={status}>Enviar mi perfil de inversion</SubmitButton>
    </form>
  );
}
