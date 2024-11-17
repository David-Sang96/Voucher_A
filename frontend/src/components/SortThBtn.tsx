import type { ReactNode } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

interface Props {
  sortBy: (val: string) => void;
  valOne: string;
  valTwo: string;
  children: ReactNode;
}

const SortThBtn = ({ sortBy, children, valOne, valTwo }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {children}
      <div className="flex flex-col">
        <BiUpArrow
          className="h-3.w-3.5 w-3.5 cursor-pointer text-blue-500"
          onClick={() => sortBy(valOne)}
        />
        <BiDownArrow
          className="h-3.w-3.5 w-3.5 cursor-pointer text-blue-500"
          onClick={() => sortBy(valTwo)}
        />
      </div>
    </div>
  );
};

export default SortThBtn;
