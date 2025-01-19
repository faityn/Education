import Image from "next/image";
import { MdAccessTime } from "react-icons/md";
import { TbDeviceIpadQuestion } from "react-icons/tb";
type props = {
  id?: number;
  title?: string;
  img?: string;
};
const OneItem = ({ id, title, img }: props) => {
  return (
    <div className="rounded-md group  shadow-lg hover:shadow-lg shadow-slate-300  transition duration-500">
      {' '}
      <a href={`/lesson/${id}`} className="text-slate-500">
        <div className="p-3 pb-0 relative ">
          <div className="relative overflow-hidden rounded-md">
            <Image
              src={String(img)}
              alt="basket"
              className="h-[280px] object-cover object-center w-full group-hover:scale-105 duration-500 "
              width="100"
              height="100"
              unoptimized={true}
              priority={true}
            />{' '}
          </div>
        </div>

        <div className="p-6 ">
          <div className="flex mb-3 gap-4 ">
            <span className="text-slate-400 text-sm flex items-center ">
              <MdAccessTime className="text-black mr-1" /> 10 минут
            </span>

            <span className="text-slate-400 text-sm flex items-center ">
              <TbDeviceIpadQuestion className="text-black mr-1" /> 10 асуулт
            </span>
          </div>
          <div className="text-lg text-black hover:text-[#0aba4f] font-medium ">
            {title}{' '}
          </div>
        </div>
      </a>
    </div>
  );
};

export default OneItem;
