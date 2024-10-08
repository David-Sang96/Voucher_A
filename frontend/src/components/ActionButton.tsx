import { ReactNode } from "react";

type Props = {
  name: string;
  icon: ReactNode;
};

const ActionButton = ({ name, icon }: Props) => {
  return (
    <button
      type="button"
      className="mb-0.5 me-2 flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {name} {icon}
    </button>
  );
};

export default ActionButton;
