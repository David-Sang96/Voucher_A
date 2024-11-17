const UpdateSkeleton = () => {
  return (
    <section>
      <div className="animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 h-6 w-40 rounded bg-gray-200"></div>

        <div className="mt-6 rounded-md p-4 shadow-md md:w-3/5">
          {/* Title skeleton */}
          <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>

          {/* Description skeleton */}
          <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
          <div className="mb-6 h-4 w-3/4 rounded bg-gray-200"></div>

          {/* Form skeleton */}
          <form>
            {/* Input skeleton */}
            <div className="mb-3">
              <div className="mb-2 h-4 w-20 rounded bg-gray-200"></div>
              <div className="h-10 w-full rounded bg-gray-200"></div>
            </div>
            <div className="mb-6">
              <div className="mb-2 h-4 w-20 rounded bg-gray-200"></div>
              <div className="h-10 w-full rounded bg-gray-200"></div>
            </div>

            {/* Checkbox skeleton */}
            <div className="mb-3 flex items-center">
              <div className="mr-2 h-4 w-4 rounded bg-gray-200"></div>
              <div className="h-4 w-40 rounded bg-gray-200"></div>
            </div>
            <div className="mb-3 flex items-center">
              <div className="mr-2 h-4 w-4 rounded bg-gray-200"></div>
              <div className="h-4 w-60 rounded bg-gray-200"></div>
            </div>

            {/* Cancel button skeleton */}
            <div className="mb-4 h-10 w-full rounded bg-gray-200"></div>

            {/* Submit button skeleton */}
            <div className="h-10 w-full rounded bg-gray-300"></div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateSkeleton;
