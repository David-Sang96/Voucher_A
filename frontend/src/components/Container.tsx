interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`mx-auto w-full md:w-[750px] lg:w-[1200px] ${className} my-2`}
    >
      {children}
    </div>
  );
};

export default Container;
