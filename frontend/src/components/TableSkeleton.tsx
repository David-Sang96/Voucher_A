const SkeletonLoader = () => {
  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, index) => (
        <tr
          key={index}
          className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <td className="px-6 py-4">
            <div className="h-4 w-10 animate-pulse rounded bg-gray-300" />
          </td>
          <th scope="row" className="whitespace-nowrap px-6 py-4">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
          </th>
          <td className="px-6 py-4">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
          </td>
          <td className="px-6 py-4 text-end">
            <div className="h-4 w-36 animate-pulse rounded bg-gray-300" />
          </td>
          <td className="flex justify-end gap-4 px-6 py-4">
            <div className="h-4 w-8 animate-pulse rounded bg-gray-300" />
            <div className="h-4 w-8 animate-pulse rounded bg-gray-300" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default SkeletonLoader;
