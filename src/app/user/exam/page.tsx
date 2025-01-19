import { Metadata } from 'next';

import FrontLayout from '@/components/Layouts/FrontLayout';
import BreadcrumbFront from '@/components/Breadcrumbs/BreadcrumbFront';
import UserExamList from '@/components/Main/Lesson/UserExamList';

export const metadata: Metadata = {
  title: 'Training and Examination System',
  description: 'Training and Examination System',
  icons: '/images/favicon.ico',
};

export default function Page() {
  return (
    <>
      <FrontLayout allowedRoles={['user']} menuId="">
        <div className=" max-w-[1280px]  mx-auto">
          <BreadcrumbFront pageName={'Миний өгсөн шалгалтууд'} />
        </div>
        <div className=" min-h-screen">
          <div className="bg-white max-w-[1254px] min-h-screen mx-auto">
            <div className="flex flex-col gap-10">
              <UserExamList  />
            </div>
          </div>
        </div>
      </FrontLayout>
    </>
  );
}
