interface BreadcrumbProps {
  pageName: string;
}
const BreadcrumbFront = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="p-4 my-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className=" text-black text-2xl md:leading-normal leading-normal font-semibold">
        {pageName}
      </h2>

    </div>
  );
};

export default BreadcrumbFront;
