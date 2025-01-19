
import { AnswersType } from '@/types/adminType';
import { useEffect, useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import { TbDeviceIpadQuestion } from 'react-icons/tb';

type props = {
  id?: number;
  title?: string;
  img?: string;
  time?: number;
  answers?: AnswersType;
};

const UserExamOneItem = ({ id, title, time, answers }: props) => {
const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const notNullCount = answers?.filter(
      (item) => item?.is_correct !== null
    ).length;
    setAnsweredCount(Number(notNullCount));

    const correctCount = answers?.filter((item) => item?.is_correct).length;
    setCorrectCount(Number(correctCount));

    const wrongCount = answers?.filter(
      (item) => item?.is_correct !== null && !item?.is_correct
    ).length;
    setWrongCount(Number(wrongCount));
  }, [answers]);
    
  return (
    <div className=" w-full group sm:flex gap-6 items-center justify-between p-6 rounded-lg shadow shadow-slate-200 transition-all duration-500">
      <div className="md:w-36 ">
        <h3 className="text-xl text-[#22a247] font-semibold">{title}</h3>
        <div className="flex flex-col ">
          <span className="text-lg inline-flex items-center">
            <MdAccessTime className="text-[#22a247] mr-1 text-md" />{' '}
            <span className="text-slate-400 text-[16px]"> 10 мин</span>
          </span>
          <span className="text-lg inline-flex items-center">
            <TbDeviceIpadQuestion className="text-[#22a247] mr-1 text-md" />{' '}
            <span className="text-slate-400 text-[16px]"> 10 асуулт</span>
          </span>
        </div>
      </div>
      <ul className="list-none">
        <li className="text-slate-400 mt-2 flex items-center">
          <span className="text-[#22a247] text-[16px] me-2">
            <FaRegCheckCircle className="text-[#22a247] " />
          </span>
          Зарцуулсан хугацаа: {formatTime(Number(time))}{' '}
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
      <div className="md:w-36 md:text-end">
        <a
          className="h-8 px-3 tracking-wide inline-flex items-center justify-center font-medium rounded-md border border-violet-600/20 hover:bg-violet-600 text-[#22a247] hover:text-white text-sm md:mt-0 mt-4"
          href={`/user/exam/${id}`}
        >
          Дэлгэрэнгүй
        </a>
      </div>
    </div>
  );
};

export default UserExamOneItem;
