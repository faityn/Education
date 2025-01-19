import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LessonList from "@/components/Admin/Lesson/List";

export const metadata: Metadata = {
  title: "Training and Examination System | Admin page",
  description: "Lesson page",
  icons: "/images/favicon.ico",
};

export default function Page() {
  return (
    <>
      <DefaultLayout allowedRoles={["admin"]} >
        <Breadcrumb parentName="" pageName="Хичээл" />
        <div className="flex flex-col gap-10">
          <LessonList url="/admin/lesson" />
        </div>
      </DefaultLayout>
    </>
  );
}
