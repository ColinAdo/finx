import Link from "next/link";
import { ChangeEvent } from "react";

interface Props {
  lebalId: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  required?: boolean;
}

export default function Input({
  lebalId,
  type,
  value,
  onChange,
  children,
  link,
  required,
}: Props) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor={lebalId}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {children}
        </label>
        {link && (
          <Link
            href={link.linkUrl}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {link.linkText}
          </Link>
        )}
      </div>
      <div className="mt-2">
        <input
          id={lebalId}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          name={lebalId}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
        />
      </div>
    </div>
  );
}
