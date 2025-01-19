import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LessonUpdate from "@/components/Admin/Lesson/Update";

export const metadata: Metadata = {
  title: "Training and Examination System| Admin page",
  icons: "/images/favicon.ico",
};

interface PageProps {
  params: {
    id: number;
  };
}

const UpdatePage: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={["admin"]} >
      <Breadcrumb parentName="" pageName="Хичээл засах" />

      <div className="flex flex-col gap-10">
        <LessonUpdate id={params.id} url="/admin/lesson" />
      </div>
    </DefaultLayout>
  );
};

export default UpdatePage;
