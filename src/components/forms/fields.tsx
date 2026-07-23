import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-[15px] text-stone-900 placeholder:text-stone-400 transition-colors focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/30 disabled:opacity-60";

export function FieldWrapper({
  label,
  htmlFor,
  required,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-pine-900">
        {label}
        {required && <span className="ml-0.5 text-clay-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-stone-500">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-clay-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  function TextInput(
    { label, error, hint, required, wrapperClassName, className, id, name, ...props },
    ref,
  ) {
    const fieldId = id ?? name ?? label;
    return (
      <FieldWrapper
        label={label}
        htmlFor={fieldId}
        required={required}
        error={error}
        hint={hint}
        className={wrapperClassName}
      >
        <input
          ref={ref}
          id={fieldId}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          className={cn(fieldBase, error && "border-clay-500", className)}
          {...props}
        />
      </FieldWrapper>
    );
  },
);

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { label, error, hint, required, wrapperClassName, className, id, name, ...props },
    ref,
  ) {
    const fieldId = id ?? name ?? label;
    return (
      <FieldWrapper
        label={label}
        htmlFor={fieldId}
        required={required}
        error={error}
        hint={hint}
        className={wrapperClassName}
      >
        <textarea
          ref={ref}
          id={fieldId}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          className={cn(fieldBase, "min-h-[120px] resize-y", error && "border-clay-500", className)}
          {...props}
        />
      </FieldWrapper>
    );
  },
);

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(
  function SelectInput(
    {
      label,
      error,
      hint,
      required,
      wrapperClassName,
      className,
      id,
      name,
      options,
      placeholder,
      ...props
    },
    ref,
  ) {
    const fieldId = id ?? name ?? label;
    return (
      <FieldWrapper
        label={label}
        htmlFor={fieldId}
        required={required}
        error={error}
        hint={hint}
        className={wrapperClassName}
      >
        <select
          ref={ref}
          id={fieldId}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          defaultValue=""
          className={cn(fieldBase, "appearance-none bg-[right_1rem_center] pr-10", error && "border-clay-500", className)}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23645D50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FieldWrapper>
    );
  },
);

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  children: React.ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ error, children, id, name, className, ...props }, ref) {
    const fieldId = id ?? name ?? "checkbox";
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={fieldId} className="flex items-start gap-3 text-sm text-stone-600">
          <input
            ref={ref}
            id={fieldId}
            name={name}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0 rounded border-stone-300 text-pine-700 focus:ring-pine-500/40",
              className,
            )}
            {...props}
          />
          <span className="leading-relaxed">{children}</span>
        </label>
        {error && (
          <p className="ml-8 text-xs font-medium text-clay-700" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
