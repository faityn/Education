"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/navigation";
import getUserRole from "@/helper/getUserRole";
import FrontHeader from "../Header/FrontHeader";
import Footer from "../Footer/Footer";
interface WithRoleProps {
  children: ReactNode;
  allowedRoles: string[];
  menuId?: string;
}

export default function FrontLayout({ children }: WithRoleProps) {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const [firstname, setFirstname] = useState("");
  const [userId, setUserId] = useState('');
  const getUserCheck = async () => {
    const role = await getUserRole();

    if (role === "expired") {
      router.push("/login");
    } else {
      setUserRole(String(role?.role));
      setFirstname(String(role?.firstname));
      setUserId(String(role?.userId));
    }
  };
  

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getUserCheck();
  }, []);
 
  return (
    <RecoilRoot>
      <div className="h-screen flex">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-slate-50 page-bg ">
          <FrontHeader
            userRole={userRole}
            firstname={firstname}
            userId={userId}
          />
          <main>
            <div className="w-full ">
              {userRole !== 'user' ? (
                <div className=" text-3xl pt-10">Хандах эрхгүй байна</div>
              ) : (
                children
              )}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </RecoilRoot>
  );
}
