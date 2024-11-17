const ProgressBar = () => {
  return (
    <div className="fixed left-0 top-0 w-full">
      <div className="h-1.5 w-full overflow-hidden bg-pink-100">
        <div className="loading-progress left-right h-full w-full bg-blue-500" />
      </div>
    </div>
  );
};

export default ProgressBar;
