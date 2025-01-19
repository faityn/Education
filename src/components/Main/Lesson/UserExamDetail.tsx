'use client';
import { useRecoilState } from 'recoil';
import { userExamDetailAtom } from '@/atom';
import { useEffect, useState } from 'react';

import getToken from '@/helper/getToken';
import { MdAccessTime } from 'react-icons/md';
import { TbDeviceIpadQuestion } from 'react-icons/tb';

import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { getUserExamDetail } from '@/hooks/useFrontData';

import { FaRegCheckCircle } from 'react-icons/fa';

interface Props {
  id?: number;
}
const UserExamDetail = ({ id }: Props) => {
  const [itemsDetail, setItemsDetail] = useRecoilState(userExamDetailAtom);

  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const getData = async () => {
    const userToken = getToken();
    const response = await getUserExamDetail(String(userToken), Number(id));

    setItemsDetail(response?.result);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const notNullCount = itemsDetail?.answers?.filter(
      (item) => item?.is_correct !== null
    ).length;
    setAnsweredCount(Number(notNullCount));

    const correctCount = itemsDetail?.answers?.filter(
      (item) => item?.is_correct
    ).length;
    setCorrectCount(Number(correctCount));

    const wrongCount = itemsDetail?.answers?.filter(
      (item) => item?.is_correct !== null && !item?.is_correct
    ).length;
    setWrongCount(Number(wrongCount));
  }, [itemsDetail]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="  bg-white p-4 py-10">
      <div className="max-w-[1260px] mx-auto mt-5 rounded-md group border border-slate-100 shadow-md shadow-slate-200  ">
        <div className="relative  rounded-lg ">
          {itemsDetail?.lesson?.image && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${itemsDetail?.lesson?.image}`}
              contextMenu="false"
              alt={itemsDetail?.lesson?.title}
              className=" max-h-[500px] object-cover object-center w-full  "
            />
          )}
        </div>
        <div className=" border border-b-2 border-[#91e2a8] rounded-md py-10 px-5">
          <div className="flex justify-center ">
            <div className="">
              <h3 className="text-3xl leading-normal font-semibold text-black">
                {itemsDetail?.lesson?.title}
              </h3>
            </div>
          </div>
          <div className=" w-full group sm:flex gap-6 items-center justify-between p-3 rounded-lg ">
            <ul className="list-none">
              <li className="text-slate-400 mt-2 flex items-center">
                <span className="text-[#22a247] text-[16px] me-2">
                  <MdAccessTime className="text-[#22a247] " />
                </span>
                10 мин
              </li>
              <li className="text-slate-400 mt-2 flex items-center">
                <span className="text-[#22a247] text-[16px] me-2">
                  <TbDeviceIpadQuestion className="text-[#22a247] " />
                </span>
                10 асуулт
              </li>
            </ul>
            <ul className="list-none">
              <li className="text-slate-400 mt-2 flex items-center">
                <span className="text-[#22a247] text-[16px] me-2">
                  <FaRegCheckCircle className="text-[#22a247] " />
                </span>
                Зарцуулсан хугацаа: {formatTime(Number(itemsDetail?.time))}{' '}
              </li>
              <li className="text-slate-400 mt-2 flex items-center">
                <span className="text-[#22a247] text-[16px] me-2">
                  <FaRegCheckCircle className="text-[#22a247] " />
                </span>
                Нийт хариулсан асуулт: {answeredCount}
              </li>
            </ul>
            <ul className="list-none ">
              <li className="text-slate-400 mt-2 flex items-center">
                <span className="text-[#22a247] text-[16px] me-2">
                  <FaRegCheckCircle className="text-[#22a247] " />
                </span>
                Зөв хариулсан асуулт: {correctCount}
              </li>
              <li className="text-slate-400 mt-2 flex items-center">
                <span className="text-[#22a247] text-[16px] me-2">
                  <FaRegCheckCircle className="text-[#22a247] " />
                </span>
                Буруу хариулсан асуулт: {wrongCount}
              </li>
            </ul>
            <div className="  flex items-center justify-center h-full">
              <button className="h-12 px-4 tracking-wide inline-flex items-center justify-center font-medium rounded-md border border-violet-600/20 hover:bg-[#22a247] text-[#22a247] hover:text-white text-lg md:mt-0 mt-4">
                {correctCount} Оноо
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-2 text-left ">
                  <th className="w-[300px]  px-4 py-3 font-medium text-black  ">
                    Шалгалтын асуулт
                  </th>

                  <th className="w-[200px] px-4 py-3 font-medium text-black  ">
                    Хариултын хувилбар
                  </th>

                  <th className="w-[200px] px-4 py-4 font-medium text-black  ">
                    Зөв хариулт
                  </th>

                  <th className="w-[200px] px-4 py-3 font-medium text-black ">
                    Миний хариулт
                  </th>
                  <th className="w-[100px] px-4 py-3 font-medium text-black ">
                    Төлөв
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemsDetail?.answers?.map((item, index) => (
                  <tr
                    key={index}
                    className={`${item?.is_correct ? 'bg-green-50' : 'bg-rose-50'}`}
                  >
                    <td className="border-b  border-[#eee] px-4 py-4   ">
                      <div className="mb-6">
                        <h5 className="font-medium text-black ">
                          {item?.exam?.title}
                        </h5>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.exam?.description as string,
                        }}
                      ></div>
                    </td>
                    <td className="border-b  border-[#eee] px-4 py-4   ">
                      <div className="">
                        <ul className="list-decimal ml-4 text-[16px]">
                          {item?.answer1 ? (
                            <li className="mb-1">{item?.answer1}</li>
                          ) : (
                            ''
                          )}
                          {item?.answer2 ? (
                            <li className="mb-1">{item?.answer2}</li>
                          ) : (
                            ''
                          )}
                          {item?.answer3 ? (
                            <li className="mb-1">{item?.answer3}</li>
                          ) : (
                            ''
                          )}
                          {item?.answer4 ? (
                            <li className="mb-1">{item?.answer4}</li>
                          ) : (
                            ''
                          )}
                          {item?.answer5 ? (
                            <li className="mb-1">{item?.answer5}</li>
                          ) : (
                            ''
                          )}
                        </ul>
                      </div>
                    </td>

                    <td className="border-b border-[#eee] px-4 py-4 ">
                      <p className="font-medium text-slate-500  text-[16px]">
                        {item?.exam?.answer1}
                      </p>
                    </td>
                    <td className={`border-b border-[#eee] px-4 py-4 `}>
                      <p className="font-medium text-slate-500  text-[16px]">
                        {item?.user_answer ? item?.user_answer : 'Хариулаагүй'}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-4 ">
                      <div className="font-medium  ">
                        {item?.is_correct ? (
                          <div className="flex items-center gap-2 text-[#22a247]">
                            <IoCheckmarkCircleOutline className="text-3xl " />{' '}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red">
                            <IoCloseCircleOutline className="text-3xl " />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full flex items-center justify-center mb-8"></div>
      </div>
    </div>
  );
};

export default UserExamDetail;
