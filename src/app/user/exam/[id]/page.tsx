import { Metadata } from 'next';

import BreadcrumbFront from '@/components/Breadcrumbs/BreadcrumbFront';
import FrontLayout from '@/components/Layouts/FrontLayout';

import UserExamDetail from '@/components/Main/Lesson/UserExamDetail';

export const metadata: Metadata = {
  title: 'Training and Examination System',
  icons: '/images/favicon.ico',
};

interface PageProps {
  params: {
    id: number;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <FrontLayout allowedRoles={['user']} menuId="">
      <div className=" max-w-[1280px]  mx-auto">
        <BreadcrumbFront pageName={'Шалгалтын үр дүн'} />
      </div>
      <div className="bg-white min-h-screen">
        <div className="bg-white max-w-[1280px]  mx-auto">
          <div className="flex flex-col gap-10">
            <UserExamDetail id={params.id}  />
          </div>
        </div>
      </div>
    </FrontLayout>
  );
};

export default Page;
