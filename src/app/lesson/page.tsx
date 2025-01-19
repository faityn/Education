import { Metadata } from "next";

import FrontLayout from "@/components/Layouts/FrontLayout";
import LessonList from "@/components/Main/Lesson/LessonList";
import BreadcrumbFront from "@/components/Breadcrumbs/BreadcrumbFront";

export const metadata: Metadata = {
  title: "Training and Examination System",
  description: "Training and Examination System",
  icons: "/images/favicon.ico",
};

export default function Page() {
  return (
    <>
      <FrontLayout allowedRoles={["user"]} menuId="">
        <div className=" max-w-[1280px]  mx-auto">
            <BreadcrumbFront pageName={'Хичээлүүд'} />
        </div>
        <div className="bg-white min-h-screen">
          <div className="bg-white max-w-[1280px]  mx-auto">
            <div className="flex flex-col gap-10">
              <LessonList  />
            </div>
          </div>
        </div>
      </FrontLayout>
    </>
  );
}
