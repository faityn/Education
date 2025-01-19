'use client';
import { useRecoilState } from 'recoil';
import { userExamListAtom } from '@/atom';
import { useEffect } from 'react';

import getToken from '@/helper/getToken';

import { getUserExamList } from '@/hooks/useFrontData';

import UserExamOneItem from './UserExamOneItem';

const UserExamList = () => {
  const [itemsList, setItemsList] = useRecoilState(userExamListAtom);

  const getData = async () => {
    const userToken = getToken();
    const response = await getUserExamList(String(userToken));

    if (response) {
      setItemsList(response);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="  bg-white p-8 py-10">
      <div className="flex flex-col gap-6 pb-4 w-full ">
        {itemsList?.map((item, index) => (
          <div key={index} className=" ">
            <UserExamOneItem
              id={item?.id}
              title={item?.lesson?.title}
              img={
                item?.lesson?.image
                  ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${item?.lesson?.image}`
                  : ''
              }
              time={item?.time}
              answers={item?.answers}
            />
          </div>
        ))}
      </div>

      <div className="my-5 flex w-full justify-center"></div>
    </div>
  );
};

export default UserExamList;
