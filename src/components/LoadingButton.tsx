import React, { FC } from "react";
import { ButtonProps } from "react-html-props";

interface Props extends ButtonProps {
  children: string;
  isLoading: boolean;
  className?: string;
}

const LoadingButton: FC<Props> = ({
  children,
  isLoading,
  className,
  ...props
}) => {
  return (
    <button
      className={`
         h-9 px-4 py-2 bg-gray-800 border border-transparent 
         rounded-md font-semibold text-xs text-white uppercase tracking-widest 
         hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 
         focus:ring ring-gray-300 disabled:cursor-no-drop transition ease-in-out 
         duration-150 ${className}
      `}
      style={{ minWidth: "140px" }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-3 -ml-1 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
