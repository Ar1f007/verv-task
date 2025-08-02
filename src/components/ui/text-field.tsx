import { HTMLInputTypeAttribute, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

interface BaseFieldProps<T extends FieldValues> {
    name: Path<T>;
    label?: string; // For displaying purpose
    register: UseFormRegister<T>;
    required?: boolean;
    rules?: RegisterOptions<T, Path<T>>;
    error?: string;
    className?: string;
}

interface InputFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
    type?: HTMLInputTypeAttribute;
    as?: 'input';
    placeholder?: string;
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type">;
}

interface TextareaFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
    as: 'textarea';
    rows?: number;
    cols?: number;
    placeholder?: string;
    textareaProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>;
}

type TextFieldProps<T extends FieldValues> = InputFieldProps<T> | TextareaFieldProps<T>;

export default function TextField<T extends FieldValues>(
    props: TextFieldProps<T>
) {
    const {
        name,
        register,
        label,
        required = true,
        rules = {},
        error,
        className = "",
    } = props;

    const displayLabel = label || name;

    const validationRules = {
        required: required ? `${displayLabel} is required` : false,
        ...rules
    };

    const renderField = () => {
        if (props.as === 'textarea') {
            const { rows = 4, cols, placeholder, textareaProps = {} } = props;
            return (
                <textarea
                    {...register(name, validationRules)}
                    id={name}
                    rows={rows}
                    cols={cols}
                    placeholder={placeholder}
                    className={`w-full border border-gray-200 rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${name}-error` : undefined}
                    {...textareaProps}
                />
            );
        } else {
            const { type = 'text', placeholder, inputProps = {} } = props;
            return (
                <input
                    {...register(name, validationRules)}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full border border-gray-200 rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${name}-error` : undefined}
                    {...inputProps}
                />
            );
        }
    };

    return (
        <div className="space-y-4">
            <label
                htmlFor={name}
                className="capitalize tracking-wide block text-sm font-medium text-gray-700 mb-1"
            >
                {displayLabel}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="space-y-1">
                {renderField()}

                {error && (
                    <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}