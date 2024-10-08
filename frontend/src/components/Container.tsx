interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`mx-auto w-full md:w-[750px] lg:w-[1100px] ${className}`}>
      {children}
    </div>
  );
};

export default Container;
