'use client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataSavedAtom, lessonListAtom, totalPageAtom } from '@/atom';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Pagination from '../../Pagination/Pagination';

import getToken from '@/helper/getToken';

import { getLessonList } from '@/hooks/useFrontData';
import OneItem from './OneItem';

const LessonList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [pageLimit, setPageLimit] = useState('20');

  const page = searchParams.get('page');
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?pageLimit=${pageLimit}`;
  const [lessonList, setLessonList] = useRecoilState(lessonListAtom);
  const dataSaved = useRecoilValue(dataSavedAtom);

  const getData = async () => {
    const pageLimitNew = searchParams.get('pageLimit')
      ? searchParams.get('pageLimit')
      : size;

    setPageLimit(pageLimitNew as string);

    const userToken = getToken();
    const response = await getLessonList(
      String(userToken),
      Number(page),
      Number(size)
    );

    if (response) {
      const totalPage = Math.ceil(Number(response?.total) / Number(size));
      setTotalPage(totalPage);
      setLessonList(response?.data);
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
    <div className="  bg-white p-5 py-10 ">
      <div className="grid grid-cols-12 gap-6 pb-4">
        {lessonList?.map((item, index) => (
          <div
            key={index}
            className="col-span-4 max-xl:col-span-4 max-lg:col-span-6 max-sm:col-span-12 "
          >
            <OneItem
              id={item?.id}
              title={item?.title}
              img={
                item?.image
                  ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${item?.image}`
                  : ''
              }
            />
          </div>
        ))}
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

export default LessonList;
