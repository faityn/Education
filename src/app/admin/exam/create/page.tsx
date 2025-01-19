import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ExamCreate from "@/components/Admin/Exam/Create";

export const metadata: Metadata = {
  title: "Training and Examination System | Admin page",
  description: "Lesson create page",
  icons: "/images/favicon.ico",
};

export default function Page() {
  return (
    <>
      <DefaultLayout allowedRoles={["admin"]} >
        <Breadcrumb parentName="" pageName="Шалгалтын асуулт нэмэх" />
        <div className="flex flex-col gap-10">
          <ExamCreate url="/admin/exam" />
        </div>
      </DefaultLayout>
    </>
  );
}
