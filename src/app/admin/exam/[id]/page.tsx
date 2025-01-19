import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExamUpdate from "@/components/Admin/Exam/Update";

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
      <Breadcrumb parentName="" pageName="Шалгалтын асуулт засах" />

      <div className="flex flex-col gap-10">
        <ExamUpdate id={params.id} url="/admin/exam" />
      </div>
    </DefaultLayout>
  );
};

export default UpdatePage;
