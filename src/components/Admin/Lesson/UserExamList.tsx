'use client';
import { useRecoilState } from 'recoil';
import {
  AdminLessonUsersExamListAtom,

  totalPageAtom,
} from '@/atom';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Pagination from '../../Pagination/Pagination';
import {
  getLessonExamUsersList,
} from '@/hooks/useEvents';


import { format } from 'date-fns';
import getToken from '@/helper/getToken';
import { FaChevronDown } from 'react-icons/fa';

import { AnswersType } from '@/types/adminType';

interface Props {
  id: number;
  url?: string;
}
const UserExamList = ({ id }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [pageLimit, setPageLimit] = useState('20');

  const page = searchParams.get('page');
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?pageLimit=${pageLimit}`;

  const [itemsList, setItemsList] = useRecoilState(
    AdminLessonUsersExamListAtom
  );
 
  
  const handlePageLimit = (value: string) => {
    setPageLimit(value);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getData = async () => {
    const pageLimitNew = searchParams.get('pageLimit')
      ? searchParams.get('pageLimit')
      : size;

    setPageLimit(pageLimitNew as string);

    const userToken = getToken();
    const response = await getLessonExamUsersList(
      String(userToken),
      Number(id),
      Number(page),
      Number(size)
    );

    if (response) {
      const totalPage = Math.ceil(Number(response?.total) / Number(size));
      setTotalPage(totalPage);
      setItemsList(response?.data);
    }
  };

  const answeredCount = (answers: AnswersType) => {
    const notNullCount = answers?.filter(
      (item) => item?.is_correct !== null
    ).length;

    return notNullCount;
  };

  const correctCount = (answers: AnswersType) => {
    const notNullCount = answers?.filter((item) => item?.is_correct).length;

    return notNullCount;
  };

  const wrongCount = (answers: AnswersType) => {
    const notNullCount = answers?.filter(
      (item) => item?.is_correct !== null && !item?.is_correct
    ).length;

    return notNullCount;
  };


  useEffect(() => {
    getData();
  }, [pageLimit]);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-7 flex  w-full items-center gap-4 max-md:col-span-12 max-xsm:flex-col ">
          <h2 className='text-xl font-semibold text-black'>
            {itemsList?.[0]?.lesson?.title} хичээлд шалгалт өгсөн хэрэглэгчид
          </h2>
        </div>
        <div className="col-span-5 w-full  text-right max-md:col-span-12 ">
          <div className="flex w-full  justify-end gap-4">
            <div className="relative z-20 w-28 bg-transparent dark:bg-form-input ">
              <select
                value={pageLimit}
                onChange={(e) => handlePageLimit(e.target.value)}
                className={`relative z-10 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-1.5 text-sm text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="20" className="text-black dark:text-bodydark">
                  20
                </option>
                <option value="50" className="text-black dark:text-bodydark">
                  50
                </option>
                <option value="100" className="text-black dark:text-bodydark">
                  100
                </option>
              </select>
              <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-sm text-black dark:text-white">
                <FaChevronDown />
              </span>
            </div>

          </div>

        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-50px] px-4 py-3 font-medium text-black dark:text-white ">
                №
              </th>

              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white ">
                Хэрэглэгчийн нэр
              </th>
              <th className="min-w-[130px] px-4 py-3 font-medium text-black dark:text-white ">
                Хугацаа
              </th>

              <th className="min-w-[130px] px-4 py-4 font-medium text-black dark:text-white ">
                Нийт хариулсан 
              </th>
              <th className="min-w-[130px] px-4 py-4 font-medium text-black dark:text-white ">
                Зөв хариулсан 
              </th>
              <th className="min-w-[130px] px-4 py-4 font-medium text-black dark:text-white ">
                Буруу хариулсан 
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
                Авсан оноо
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
                Огноо
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-slate-600 dark:text-white">
                    {index + 1}
                  </h5>
                </td>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-slate-600 dark:text-white">
                    {item?.user?.firstname}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-slate-600 dark:text-white">
                    {formatTime(Number(item?.time))}{' '}
                  </h5>
                </td>

                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-slate-600 dark:text-white">
                    {answeredCount(item?.answers as AnswersType)}
                  </h5>
                </td>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-slate-600 dark:text-white">
                    {correctCount(item?.answers as AnswersType)}
                  </h5>
                </td>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-slate-600 dark:text-white">
                    {wrongCount(item?.answers as AnswersType)}
                  </h5>
                </td>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-slate-600 dark:text-white">
                    {correctCount(item?.answers as AnswersType)}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-slate-600 dark:text-white">
                    {item?.created_at
                      ? format(
                          item?.created_at as string,
                          'yyyy-MM-dd HH:mm:ss'
                        )
                      : ''}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-5 flex w-full justify-center">
        {totalPage > 1 ? (
          <Pagination currentPage={Number(page)} pageUrl={pageUrl} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default UserExamList;
