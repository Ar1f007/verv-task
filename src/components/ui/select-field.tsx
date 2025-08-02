import { FieldValues, Path, UseFormRegister, RegisterOptions } from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
    name: Path<T>;
    register: UseFormRegister<T>;
    options: string[];
    label?: string;
    placeholder?: string;
    required?: boolean;
    rules?: RegisterOptions<T, Path<T>>;
    error?: string;
    className?: string;
    disabled?: boolean;
}

export default function SelectField<T extends FieldValues>({
    name,
    register,
    options,
    label,
    placeholder = "Select an option...",
    required = true,
    rules = {},
    error,
    className = "",
    disabled = false,
}: SelectFieldProps<T>) {

    const displayLabel = label || name;

    const validationRules = {
        required: required ? `${displayLabel} is required` : false,
        ...rules
    };

    return (
        <div className="space-y-4">
            <label htmlFor={name} className="capitalize tracking-wide block text-md text-gray-700 mb-1">
                {displayLabel}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="space-y-1">
                <select
                    {...register(name, validationRules)}
                    id={name}
                    disabled={disabled}
                    className={`cursor-pointer w-full border rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${name}-error` : undefined}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((option, index) => (
                        <option key={index} value={option} className="cursor-pointer capitalize">
                            {option}
                        </option>
                    ))}
                </select>

                {error && (
                    <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}