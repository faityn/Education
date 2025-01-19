'use client';
import { fileAtom, lessonListAtom } from '@/atom';
import getToken from '@/helper/getToken';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import { createExam, getLessonAllList } from '@/hooks/useEvents';
import CustomModal from '@/components/Modal/CustomConfirm';
import TextEditor from '@/components/Editor/TextEditor';
import { FaChevronDown } from 'react-icons/fa';

interface Props {
  url?: string;
}

interface FormData {
  lessonId: string;
  title: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  link: string;
  image?: string;
}
const ExamCreate = ({ url }: Props) => {
  const router = useRouter();
  const [file1, setFile1] = useRecoilState(fileAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [contentValue, setContentValue] = useState('');
  const [contentRequired, setContentRequired] = useState(false);
  const [lessonAllList, setLessonAllList] = useRecoilState(lessonListAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const closeModal = () => {
    setIsOpen(false);
    router.push(`${url}`);
  };

  const closeError = () => {
    setCreateError(false);
  };

  const handleEditorChange = (newContent: string) => {
    setContentValue(newContent);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (contentValue === '') {
      setContentRequired(true);
    } else {
      setContentRequired(false);
      setLoading(true);
      const token = getToken();
      const formdata = new FormData();
      formdata.append('token', String(token));
      formdata.append('lessonId', data.lessonId ? data.lessonId : '');
      formdata.append('title', data.title ? data.title : '');
      formdata.append('description', contentValue);
      formdata.append('answer1', data.answer1 ? data.answer1 : '');
      formdata.append('answer2', data.answer2 ? data.answer2 : '');
      formdata.append('answer3', data.answer3 ? data.answer3 : '');
      formdata.append('answer4', data.answer4 ? data.answer4 : '');
      formdata.append('answer5', data.answer5 ? data.answer5 : '');
      if (file1 !== null) {
        formdata.append('img', file1);
      }
      const res = await createExam(formdata);

      if (res?.status) {
        setIsOpen(true);
        setLoading(false);
      } else {
        setCreateError(true);
        setLoading(false);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange1 = (e: any) => {
    const newFile = e.target.files[0];

    setFile1(newFile);
  };

  const getData = async () => {
    const userToken = getToken();

    const response = await getLessonAllList(String(userToken));
    if (response) {
      setLessonAllList(response?.data);
    }
  };
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);

  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="max-w-230">
          <form onSubmit={handleSubmit(onSubmit)}>
            <table className=" w-full table-auto text-sm">
              <tbody>
                <tr>
                  <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Хичээл сонгох <span className="text-red">*</span>
                    </h5>
                  </td>
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <div className="relative z-20 bg-transparent dark:bg-form-input w-full">
                      <select
                        {...register(`lessonId`, {
                          required: true,
                        })}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-bodydark`}
                      >
                        <option value="" className="text-black dark:text-white">
                          Сонгох
                        </option>
                        {lessonAllList?.map((item, index) => (
                          <option
                            key={index}
                            value={item?.id}
                            className="text-black dark:text-white"
                          >
                            {item?.title}{' '}
                          </option>
                        ))}
                      </select>

                      <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2 text-black">
                        <FaChevronDown />
                      </span>
                    </div>
                    {errors.lessonId && (
                      <span className="font-medium text-red ">
                        Хичээл сонгоно уу
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Шалгалтын асуулт <span className="text-red">*</span>
                    </h5>
                  </td>
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <input
                      type="text"
                      {...register('title', {
                        required: true,
                      })}
                      placeholder="Шалгалтын асуулт оруулна уу"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.title && (
                      <span className="font-medium text-red ">
                        Хоосон байна!
                      </span>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Зураг <span className="text-red">*</span>
                    </h5>
                  </td>
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <div className="rounded-sm  ">
                      <input
                        {...register('image', {
                          required: true,
                        })}
                        type="file"
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        onChange={handleFileChange1}
                      />
                      {errors.image && (
                        <span className="font-medium text-red">
                          Хоосон байна!
                        </span>
                      )}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="min-w-[200px] border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Дэлгэрэнгүй
                    </h5>
                  </td>
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <TextEditor
                      initialValue=""
                      contentValue={contentValue}
                      onEditorChange={handleEditorChange}
                    />

                    {contentRequired && (
                      <span className="font-medium text-red ">
                        Хоосон байна!
                      </span>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="min-w-[200px] border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Хариулт 1 <span className="text-red">*</span>
                    </h5>
                  </td>
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <input
                      type="text"
                      {...register('answer1', {
                        required: true,
                      })}
                      placeholder="Зөв хариулт оруулна уу"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.answer1 && (
                      <span className="font-medium text-red ">
                        Хоосон байна!
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="min-w-[200px] border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Хариулт 2 <span className="text-red">*</span>
                    </h5>
                  </td>
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <input
                      type="text"
                      {...register('answer2', {
                        required: true,
                      })}
                      placeholder="Хариулт оруулна уу"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.answer2 && (
                      <span className="font-medium text-red ">
                        Хоосон байна!
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="min-w-[200px] border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Хариулт 3
                    </h5>
                  </td>
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <input
                      type="text"
                      {...register('answer3')}
                      placeholder="Хариулт оруулна уу"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.answer3 && (
                      <span className="font-medium text-red ">
                        Хоосон байна!
                      </span>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="min-w-[200px] border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Хариулт 4
                    </h5>
                  </td>
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <input
                      type="text"
                      {...register('answer4')}
                      placeholder="Хариулт оруулна уу"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.answer4 && (
                      <span className="font-medium text-red ">
                        Хоосон байна!
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="min-w-[200px] border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Хариулт 5
                    </h5>
                  </td>
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <input
                      type="text"
                      {...register('answer5')}
                      placeholder="Хариулт оруулна уу"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.answer5 && (
                      <span className="font-medium text-red ">
                        Хоосон байна!
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex w-full justify-end gap-4 px-4 text-center">
              <Link
                href={`${url}`}
                className="inline-flex w-26 items-center justify-center rounded-md border border-primary p-2 text-center font-medium text-primary hover:bg-opacity-90 "
              >
                Болих
              </Link>
              <button
                type="submit"
                className="flex w-26 justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90"
              >
                Хадгалах
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="my-5 text-right">
        {isOpen ? (
          <CustomModal>
            <div className="w-full border-l-6 border-success bg-white  pb-5 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30">
              <div className="flex flex-col px-7 pb-4 pt-6 ">
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-black">
                    Амжилттай хадгалагдлаа
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
        {createError ? (
          <CustomModal>
            <h2 className="text-xl text-black"> Хичээл нэмэх </h2>
            <div className="mb-2 mt-4 text-lg text-red">Амжилтгүй!!</div>
            <div className="flex w-full items-center justify-center gap-4">
              <button
                onClick={closeError}
                className="rounded-md bg-slate-500 px-3 py-1 text-white"
              >
                Хаах
              </button>
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

export default ExamCreate;
