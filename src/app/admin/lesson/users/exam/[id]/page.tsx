import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import UserExamList from '@/components/Admin/Lesson/UserExamList';

export const metadata: Metadata = {
  title: 'Training and Examination System | Admin page',
  description: 'Lesson page',
  icons: '/images/favicon.ico',
};

interface PageProps {
  params: {
    id: number;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={['admin']}>
      <Breadcrumb parentName="" pageName="" />

      <div className="flex flex-col gap-10">
        <UserExamList id={params.id} url="/admin/lesson" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
