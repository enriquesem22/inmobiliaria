"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  telefono: z.string().min(9, "Indica un telefono valido.").optional().or(z.literal("")),
  email: z.string().email("Indica un correo valido."),
  interes: z.string().optional(),
  mensaje: z.string().min(5, "Escribe tu mensaje."),
  consentimiento: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la politica de privacidad." }),
  }),
});

type FormValues = z.infer<typeof schema>;

export function ContactoForm() {
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
    const result = await submitLead("contacto", values);
    if (result.ok) setStatus("success");
    else {
      setStatus("error");
      setServerError(result.error);
    }
  };

  if (status === "success") {
    return (
      <FormSuccess
        title="Mensaje enviado"
        message="Gracias por escribirnos. Te responderemos lo antes posible."
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
          label="Correo electronico"
          required
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextInput
          label="Telefono"
          type="tel"
          autoComplete="tel"
          error={errors.telefono?.message}
          {...register("telefono")}
        />
        <SelectInput
          label="Motivo del contacto"
          placeholder="Selecciona"
          options={[
            { value: "Vender", label: "Quiero vender mi vivienda" },
            { value: "Valoracion", label: "Quiero una valoracion" },
            { value: "Inversion", label: "Busco una oportunidad de inversion" },
            { value: "Colaborar", label: "Quiero colaborar" },
            { value: "Reforma", label: "Reformas" },
            { value: "Otro", label: "Otro" },
          ]}
          {...register("interes")}
        />
      </div>

      <TextArea
        label="Mensaje"
        required
        placeholder="Cuentanos en que podemos ayudarte."
        error={errors.mensaje?.message}
        {...register("mensaje")}
      />

      <Checkbox error={errors.consentimiento?.message} {...register("consentimiento")}>
        <ConsentText />
      </Checkbox>

      <FormError message={serverError} />

      <SubmitButton status={status}>Enviar mensaje</SubmitButton>
    </form>
  );
}
