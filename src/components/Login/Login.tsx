"use client";
import React, { useState } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { CiLock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {  userLogin } from "@/hooks/useUser";

import Loader from "../common/Loader";
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoader(true);

    const response = await userLogin(username, String(password));

    if (!response?.status) {
      setLoader(false);
      setError("Нэвтрэх нэр эсвэл нууц үг буруу байна");
    } else {
      setError("");
      const token = response?.result?.access_token;

      const expires = new Date();
      expires.setMonth(expires.getMonth() + 1);

      Cookies.set("w-access", token, {
        expires: expires,
        path: "/",
      });

      push("/");
      setLoader(false);
    }
  };
  return (
    <div className="rounded-sm  border-stroke shadow-default dark:border-strokedark dark:bg-boxdark w-full mx-auto">
      <div className="flex flex-wrap items-center ">
        <div className=" border-stroke dark:border-strokedark w-full ">
          <div className="w-full flex max-sm:flex-col h-[500px]">
            <div className="w-full pr-4 pb-5">
              <div className=" h-full flex flex-col justify-center">
                <div className="text-[64px] leading-[89px] text-white font-extrabold max-lg:text-[36px] max-lg:leading-[49px]">
                  Сургалтын шалгалтын систем
                </div>
                
              </div>
            </div>
            <div className="w-full pt-5">
              <div className="w-full  h-full flex flex-col justify-center">
                <form
                  onSubmit={handleSubmit}
                  className="w-[400px] max-lg:w-[300px] mx-auto "
                >
                  <div className="mb-8">
                    <label className="mb-2.5 block font-medium text-white">
                      Нэвтрэх нэр 
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Нэвтрэх нэр оруулна уу"
                        className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none  "
                      />

                      <span className="absolute right-4 top-4">
                        <HiOutlineEnvelope className="text-xl text-[#999999]" />
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="mb-2.5 block font-medium text-white">
                      Нууц үг
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="userPassword"
                        placeholder="Нууц үг оруулна уу"
                        onChange={(e) => setPassword(e.target.value)}
                        id="userPassword"
                        className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none  "
                      />

                      <span className="absolute right-4 top-4">
                        <CiLock className="text-2xl text-[#999999]" />
                      </span>
                    </div>
                  </div>

                  <div className="mb-8 pt-2">
                    <input
                      type="submit"
                      disabled={loader ? true : false}
                      value="Нэвтрэх"
                      className="w-full cursor-pointer rounded-lg border border-[#002453] bg-[#002453] p-4 text-white transition hover:bg-opacity-90 disabled:bg-opacity-70"
                    />
                  </div>

                  <div className="mt-6 text-center"></div>
                </form>
                <div className="w-full text-center text-white">{error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loader ? <Loader /> : ""}
    </div>
  );
};

export default Login;
