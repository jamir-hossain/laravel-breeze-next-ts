import { FC } from "react";
import { DivProps } from "react-html-props";

interface Props extends DivProps {
  message: { type: string; message: string } | null;
  className?: string;
}

const ShowAlert: FC<Props> = ({ message, className, ...props }) => {
  return (
    <>
      {message && (
        <div
          className={`
            w-full min-h-10 flex items-center px-4 py-2  rounded-md 
            ${
              message.type === "error"
                ? "bg-red-200 text-red-600"
                : "bg-green-200 text-green-600"
            }
          `}
          {...props}
        >
          {message.message}
        </div>
      )}
    </>
  );
};

export default ShowAlert;
