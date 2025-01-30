import clsx from "clsx";
import React from "react";

interface Props {
  name: string;
  isRequired?: boolean;
  label?: string;
  placeholder: string;
  id: string;
  value?: string;
  error?: any;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      isRequired = false,
      label,
      placeholder,
      id,
      value,
      error,
      onBlur,
      onFocus,
      onChange,
    },
    ref
  ) => {
    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(event);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div className="w-full flex items-start flex-col px-2 py-1 gap-1">
        {label && (
          <label htmlFor={name} className="w-full">
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          autoComplete="off"
          ref={ref}
          type="email"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          className={clsx(
            "border p-2.5 rounded w-full outline-none focus:shadow-md transition-all duration-300",
            {
              "focus:border-red-500 border-red-500": error,
              "focus:border-blue-600 border-gray-300": !error,
            }
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {error && (
          <div className="w-full mt-1 text-sm text-red-500">
            {error?.message}
          </div>
        )}
      </div>
    );
  }
);

export default EmailInput;
