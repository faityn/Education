interface BreadcrumbProps {
  parentName: string;
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md font-semibold capitalize text-black dark:text-white">
        {pageName}
      </h2>

    </div>
  );
};

export default Breadcrumb;
