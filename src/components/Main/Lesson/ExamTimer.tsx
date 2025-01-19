
import { ExamTimeEndAtom, ExamTimerAtom } from '@/atom';
import { useEffect, useState } from 'react';
import { MdOutlineWatchLater } from 'react-icons/md';
import {  useRecoilState, useSetRecoilState } from 'recoil';
const ExamTimer = () => {
  const [timeLeft, setTimeLeft] = useRecoilState(ExamTimerAtom);
  const setTimeEnd = useSetRecoilState(ExamTimeEndAtom);
  const [alert, setAlert] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    
    const startTimerDelay = setTimeout(() => {
      setTimerStarted(true);
    }, 5000);

    return () => clearTimeout(startTimerDelay); 
  }, []);

  useEffect(() => {
    if (!timerStarted) return;

    if (timeLeft > 0) {
      checkTime(timeLeft);
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setTimeEnd(true);
    }
  }, [timerStarted, timeLeft]);


  const checkTime = (seconds: number) => {
    if (seconds < 10) {
      setAlert(true);
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="">
      <div className="h-[55px] bg-two-color-gradient-2 rounded-[30px] w-[220px] px-3 ">
        <div className="h-full flex items-center gap-2  py-2">
          <div className="w-13">
            <MdOutlineWatchLater className="text-[44px] " />
          </div>
          <div className="bg-white w-full h-full rounded-[30px] px-4 flex items-center justify-center ">
            <div className={`text-3xl font-bold ${alert ? 'text-red' : ''} `}>
              {formatTime(timeLeft)}
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTimer;
