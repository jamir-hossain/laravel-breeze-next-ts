import { FC } from "react";
import { DivProps } from "react-html-props";

interface Props extends DivProps {
  type: string;
  errors: any[];
  className?: string;
}

const ShowError: FC<Props> = ({ errors = [], className, type, ...props }) => {
  const error = errors.find((item) => item.type === type);
  return (
    <>
      {error && (
        <div {...props}>
          <div className={`font-medium text-red-500 ${className}`}>
            {error.message}
          </div>
        </div>
      )}
    </>
  );
};

export default ShowError;
