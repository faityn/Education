import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ExamList from "@/components/Admin/Exam/List";

export const metadata: Metadata = {
  title: "Training and Examination System| Admin page",
  description: "Training and Examination System Admin page",
  icons: "/images/favicon.ico",
};

export default function Page() {
  return (
    <>
      <DefaultLayout allowedRoles={["admin"]} >
        <Breadcrumb parentName="" pageName="Шалгалтууд" />
        <div className="flex flex-col gap-10">
          <ExamList url="/admin/exam" />
        </div>
      </DefaultLayout>
    </>
  );
}
