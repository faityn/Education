'use client';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ActiveUserIdAtom,
  ExamTimeEndAtom,
  ExamTimerAtom,
  ExamTimerShowAtom,
  lessonAnsweredArrayAtom,
  lessonDetailAtom,
 
} from '@/atom';
import { useEffect, useState } from 'react';
import {  useRouter } from 'next/navigation';


import getToken from '@/helper/getToken';
import { MdAccessTime } from 'react-icons/md';
import { TbDeviceIpadQuestion } from 'react-icons/tb';
import { FaCheck } from 'react-icons/fa6';
import {
  getLessonDetail,
  userExamSave,
} from '@/hooks/useFrontData';
import { ExamType } from '@/types/adminType';
import CustomModal from '@/components/Modal/CustomConfirm';
import Loader from '@/components/common/Loader';

interface Props {
  id?: number;
}
const LessonExam = ({ id }: Props) => {
  const router = useRouter();

  const userId = useRecoilValue(ActiveUserIdAtom);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [itemsDetail, setItemsDetail] = useRecoilState(lessonDetailAtom);
  const answeredArray = useRecoilValue(lessonAnsweredArrayAtom);
  const setExamTimerShow = useSetRecoilState(ExamTimerShowAtom);
  const timeLeft = useRecoilValue(ExamTimerAtom);
  const timeEnd = useRecoilValue(ExamTimeEndAtom);
  const [savedId, setSavedId] = useState(0);

  const closeModal = () => {
    setIsOpen(false);
    router.push(`/user/exam/${savedId}`);
  };

  const selectAnswer = (answerId: number, answer: string) => {
    const updatedArray = itemsDetail?.randomExam?.map((item) =>
      item.id === answerId
        ? {
            ...item,
            userAnswer: answer,
            isCorrect: item?.answer1 === answer ? 1 : 0,
          }
        : item
    );

    const updatedObj = {
      ...itemsDetail,
      randomExam: updatedArray,
    };
    setItemsDetail(updatedObj);
  };

  useEffect(() => {}, [answeredArray]);

  const randomAnswer = (exam: ExamType[]) => {
    const updatedData = exam?.map((item) => ({
      ...item,
      answerArray: [
        item?.answer1,
        item?.answer2,
        item?.answer3,
        item?.answer4,
        item?.answer5,
      ],
    }));
    const cleanedData = updatedData?.map((item) => ({
      ...item,
      answerArray: item?.answerArray
        .filter((value) => value !== null)
        .sort(() => Math.random() - 0.5),
    }));
    return cleanedData;
  };

  const finishExam = async () => {
    setExamTimerShow(false);
    const time = Number(600 - timeLeft);
    setLoading(true);
    const userToken = getToken();
    const response = await userExamSave(
      String(userToken),
      Number(userId),
      itemsDetail,
      Number(time),
    );

    if (response?.status) {
      setSavedId(response?.result?.id);
      setLoading(false);
      setIsOpen(true);
    }
  };

  const getData = async () => {
    const userToken = getToken();
    const response = await getLessonDetail(String(userToken), Number(id));

    if (response?.status) {
      const exam = randomAnswer(response?.result?.exam);

      const updatedObj = {
        ...response?.result,
        randomExam: exam,
      };
      setItemsDetail(updatedObj);
    }
  };

  useEffect(() => {
    if (timeEnd) {
      finishExam();
    }
  }, [timeEnd]);

  useEffect(() => {
    
    getData();
    setExamTimerShow(true);
  }, []);
  return (
    <div className="  bg-white p-4 py-10">
      <div className="max-w-[1000px] mx-auto mt-5 rounded-md group border border-slate-100 shadow-md shadow-slate-200  ">
        <div className="relative  rounded-lg ">
          {itemsDetail?.image && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${itemsDetail?.image}`}
              contextMenu="false"
              alt={itemsDetail?.title}
              className=" h-[280px] object-cover object-center w-full  "
            />
          )}
        </div>
        <div className=" border border-b-2 border-[#91e2a8] rounded-md py-10 px-5">
          <div className="flex justify-center ">
            <div className="">
              <h3 className="text-3xl leading-normal font-semibold text-black">
                {itemsDetail?.title}
              </h3>
            </div>
          </div>
          <div className="md:flex justify-center text-center">
            <div className="lg:w-4/5">
              <ul className="tracking-[0.5px] mb-0 inline-block mt-1">
                <li className="inline-flex items-center mt-2 me-5">
                  <MdAccessTime className="text-black mr-1 text-xl" />{' '}
                  <span className="text-slate-400 "> 10 минут</span>
                </li>
                <li className="inline-flex items-center mt-2 me-5">
                  <TbDeviceIpadQuestion className="text-black mr-1 text-xl" />{' '}
                  <span className="text-slate-400 "> 10 Асуулт</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-5 px-10">
          {itemsDetail?.randomExam?.map((item, index) => (
            <div
              key={index}
              className="text-black w-full flex flex-col mb-8 border-b border-dashed border-[#91e2a8] pb-10"
            >
              <h5 className="text-xl font-semibold mb-4">
                Асуулт {index + 1}. {item?.title}
              </h5>
              <div className=" mb-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.description as string,
                  }}
                ></div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                {item?.answerArray?.map((answer, i) => (
                  <div
                    key={i}
                    className="col-span-6 max-sm:col-span-12 cursor-pointer"
                    onClick={() =>
                      selectAnswer(Number(item?.id), String(answer))
                    }
                  >
                    <div
                      className={`flex gap-4 items-center border-2  rounded-md px-4 h-[75px] ${item?.userAnswer === answer ? 'border-[#22a247] bg-[#def7e5]' : 'border-[#d2d2d2]'} `}
                    >
                      {' '}
                      <div className="">
                        {item?.userAnswer === answer ? (
                          <button
                            type="button"
                            className="bg-two-color-gradient-2 h-[30px] w-[30px] rounded-md font-bold text-white flex items-center justify-center"
                          >
                            <FaCheck className="text-xl" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="bg-[#def7e5] h-[30px] w-[30px] rounded-md font-bold "
                          >
                            {i + 1}
                          </button>
                        )}
                      </div>
                      <div className="w-full  overflow-y-hidden h-[65px]  flex items-center  font-bold ">
                        {answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center mb-8">
          <button
            className="bg-[#0aba4f] rounded-md h-[50px] px-5 text-white"
            onClick={() => finishExam()}
          >
            Шалгалт дуусгах
          </button>
        </div>

        {isOpen ? (
          <CustomModal>
            <div className="w-full border-l-6 border-success bg-white  pb-5 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30">
              <div className="flex flex-col px-7 pb-4 pt-6 ">
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-black">
                    Амжилттай материал илгээгдлээ
                  </h5>
                </div>
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                <button
                  onClick={closeModal}
                  className="rounded-md bg-slate-400 px-3 py-1 text-white"
                >
                  Хаах{' '}
                </button>
              </div>
            </div>
          </CustomModal>
        ) : (
          ''
        )}
        {loading ? <Loader /> : ''}
      </div>
    </div>
  );
};

export default LessonExam;
