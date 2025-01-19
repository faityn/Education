'use client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataSavedAtom, examListAtom, totalPageAtom } from '@/atom';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Pagination from '../../Pagination/Pagination';
import { deleteExam, getExamList } from '@/hooks/useEvents';

import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { format } from 'date-fns';
import getToken from '@/helper/getToken';
import { FaChevronDown } from 'react-icons/fa';
import CustomModal from '@/components/Modal/CustomConfirm';

interface Props {
  id?: number;
  url?: string;
}
const ExamList = ({ url }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [pageLimit, setPageLimit] = useState('20');

  const page = searchParams.get('page');
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?pageLimit=${pageLimit}`;
  const [isOpen, setIsOpen] = useState(false);
  const [itemsList, setItemsList] = useRecoilState(examListAtom);
  const [selectedElements, setSelectedElements] = useState(0);
  const dataSaved = useRecoilValue(dataSavedAtom);

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmDelete = (val: number) => {
    setSelectedElements(val);

    setIsOpen(true);
  };

  const itemDelete = async () => {
    const userToken = getToken();

    await deleteExam(String(userToken), Number(selectedElements));

    getData();
    setIsOpen(false);
  };

  const handlePageLimit = (value: string) => {
    setPageLimit(value);
  };

  const getData = async () => {
    const pageLimitNew = searchParams.get('pageLimit')
      ? searchParams.get('pageLimit')
      : size;

    setPageLimit(pageLimitNew as string);

    const userToken = getToken();
    const response = await getExamList(
      String(userToken),
      Number(page),
      Number(size)
    );

    if (response) {
      const totalPage = Math.ceil(Number(response?.total) / Number(size));
      setTotalPage(totalPage);
      setItemsList(response?.data);
    }
  };

  useEffect(() => {
    if (dataSaved === true) {
      //eslint-disable-next-line react-hooks/exhaustive-deps
      getData();
    }
  }, [dataSaved]);

  useEffect(() => {
    getData();
  }, [pageLimit]);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex  w-full  gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
        <div className="col-span-7 w-full  text-right max-md:col-span-12 ">
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

            <>
              <Link
                href={'/admin/exam/create'}
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
              >
                Нэмэх
              </Link>
            </>
          </div>

          {isOpen ? (
            <CustomModal>
              <div className="w-full border-l-6 border-red bg-white  pb-5 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30">
                <div className="flex px-7 pb-4 pt-6">
                  <div className="w-full">
                    <h5 className="mb-3 text-lg font-semibold text-black">
                      Устгахдаа итгэлтэй байна уу
                    </h5>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center gap-4">
                  <button
                    onClick={closeModal}
                    className="rounded-md bg-slate-400 px-3 py-1 text-white"
                  >
                    Болих{' '}
                  </button>
                  <button
                    onClick={itemDelete}
                    className="rounded-md bg-red px-3 py-1 text-white "
                  >
                    Устгах{' '}
                  </button>
                </div>
              </div>
            </CustomModal>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-50px] px-4 py-3 font-medium text-black dark:text-white ">
                №
              </th>

              <th className="min-w-[200px] px-4 py-3 font-medium text-black dark:text-white ">
                Шалгалтын асуулт
              </th>
              <th className="min-w-[200px] px-4 py-3 font-medium text-black dark:text-white ">
                Хичээлийн нэр
              </th>
              <th className="min-w-[200px] px-4 py-3 font-medium text-black dark:text-white ">
                Зөв хариулт
              </th>

              <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white ">
                Огноо
              </th>

              <th className="w-[60px]  px-4 py-3 font-medium text-black dark:text-white">
                Устгах
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {index + 1}
                  </h5>
                </td>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {item?.title}
                  </h5>
                </td>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {item?.lesson?.title}
                  </h5>
                </td>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {item?.answer1}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.created_at
                      ? format(
                          item?.created_at as string,
                          'yyyy-MM-dd HH:mm:ss'
                        )
                      : ''}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <div className="flex">
                    <p
                      className={`inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-xl mr-2 font-medium text-primary `}
                    >
                      <Link href={`${url}/${item?.id}`}>
                        <FiEdit className="text-[17px]" />
                      </Link>
                    </p>

                    <p
                      className={`inline-flex rounded-full bg-red bg-opacity-10 px-3 py-1 text-xl mr-2 font-medium text-red cursor-pointer `}
                      onClick={() => confirmDelete(Number(item?.id))}
                    >
                      <RiDeleteBin6Line className="text-[17px]" />
                    </p>
                  </div>
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

export default ExamList;
