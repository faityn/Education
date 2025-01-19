//'use server';

import { LessonType } from '@/types/adminType';

export const getLessonList = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/lessons?page=${page}&per_page=${size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getLessonDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/detail/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );
    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const userExamSave = async (
  token: string,
  userId: number,
  itemsDetail: LessonType,
  time: number
) => {
  try {
    const raw = JSON.stringify({
      user_id: Number(userId),
      items_detail: itemsDetail,
      time: time,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/exam/save`,
      {
        method: 'POST',
        body: raw,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );
    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getUserExamList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/exams`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getUserExamDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/exam/detail/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );
    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
