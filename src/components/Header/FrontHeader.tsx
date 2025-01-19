import DropdownUser from './DropdownUser';
import { ActiveRoleAtom, ActiveUserIdAtom, ExamTimerShowAtom } from '@/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import ExamTimer from '../Main/Lesson/ExamTimer';

const FrontHeader = (props: {
  userRole: string;
  firstname?: string;
  userId?: string;
}) => {
  const setUserRole = useSetRecoilState(ActiveRoleAtom);
  const setUserId = useSetRecoilState(ActiveUserIdAtom);
  const timerShow = useRecoilValue(ExamTimerShowAtom);
  useEffect(() => {
    setUserId(Number(props.userId));
    setUserRole(props.userRole);
  }, [props.userRole]);
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <div className=" max-w-[1280px]  mx-auto flex flex-grow items-center justify-between px-4 py-4 ">
        <div className="flex items-center gap-2 sm:gap-4 ">
          <a
            className="block flex-shrink-0 text-3xl text-[#0aba4f] font-bold uppercase"
            href="/"
          >
            Logo
          </a>
        </div>
        <div className="">{timerShow ? <ExamTimer /> : ''}</div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <DropdownUser firstname={String(props.firstname)} />
        </div>
      </div>
    </header>
  );
};

export default FrontHeader;
