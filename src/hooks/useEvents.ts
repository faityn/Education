'use server';

export const getLessonAllList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons?page=1&per_page=100`,
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

export const getLessonList = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons?page=${page}&per_page=${size}`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/detail/${id}`,
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

export const createLesson = async (formdata: FormData) => {
  const image: File | null = formdata.get('img') as unknown as File;
  const formData2 = new FormData();
  const token = formdata.get('token') as string;
  formData2.append('title', formdata.get('title') as string);
  if (image !== null) {
    formData2.append('image', image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/create`,
      {
        method: 'POST',
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = await response.text();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateLesson = async (formdata: FormData) => {
  const image: File | null = formdata.get('img') as unknown as File;
  const formData2 = new FormData();
  const token = formdata.get('token') as string;
  const id = formdata.get('id') as string;
  formData2.append('title', formdata.get('title') as string);
  if (image !== null) {
    formData2.append('image', image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/update/${id}`,
      {
        method: 'POST',
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = await response.text();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const deleteLesson = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const uploadImage = async (formdata: FormData) => {
  const image: File | null = formdata.get('file') as unknown as File;
  const formData2 = new FormData();
  if (image !== null) {
    formData2.append('image', image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/image/upload`,
      {
        method: 'POST',
        body: formData2,
      }
    );

    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getExamList = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exams?page=${page}&per_page=${size}`,
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

export const getExamDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exam/detail/${id}`,
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

export const createExam = async (formdata: FormData) => {
  const image: File | null = formdata.get('img') as unknown as File;
  const formData2 = new FormData();
  const token = formdata.get('token') as string;
  formData2.append('lesson_id', formdata.get('lessonId') as string);
  formData2.append('title', formdata.get('title') as string);
  formData2.append('description', formdata.get('description') as string);
  formData2.append('answer1', formdata.get('answer1') as string);
  formData2.append('answer2', formdata.get('answer2') as string);
  formData2.append('answer3', formdata.get('answer3') as string);
  formData2.append('answer4', formdata.get('answer4') as string);
  formData2.append('answer5', formdata.get('answer5') as string);
  if (image !== null) {
    formData2.append('image', image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exam/create`,
      {
        method: 'POST',
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = await response.text();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateExam = async (formdata: FormData) => {
  const image: File | null = formdata.get('img') as unknown as File;
  const formData2 = new FormData();
  const token = formdata.get('token') as string;
  const id = formdata.get('id') as string;
  formData2.append('lesson_id', formdata.get('lessonId') as string);
  formData2.append('title', formdata.get('title') as string);
  formData2.append('description', formdata.get('description') as string);
  formData2.append('answer1', formdata.get('answer1') as string);
  formData2.append('answer2', formdata.get('answer2') as string);
  formData2.append('answer3', formdata.get('answer3') as string);
  formData2.append('answer4', formdata.get('answer4') as string);
  formData2.append('answer5', formdata.get('answer5') as string);
  if (image !== null) {
    formData2.append('image', image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exam/update/${id}`,
      {
        method: 'POST',
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = await response.text();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const deleteExam = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exam/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getLessonExamUsersList = async (
  token: string,
  id: number,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lesson/users/exam/${id}?page=${page}&per_page=${size}`,
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