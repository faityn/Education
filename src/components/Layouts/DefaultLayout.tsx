"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/navigation";
import getRole from "@/helper/getRole";
interface WithRoleProps {
  children: ReactNode;
  allowedRoles: string[];
  menuId?: string;
}

export default function DefaultLayout({ children }: WithRoleProps) {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getAdminRole = async () => {
    const role = await getRole();

    if (role === "expired") {
      router.push("/admin/login");
    } else {
      setUserRole(String(role?.role));
      //setMenuList(role?.menu);
    }
  };
  

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getAdminRole();
  }, []);
  // useEffect(() => {
  //   findByMenuId(menuList, Number(menuId));
  // }, [menuList]);
  return (
    <RecoilRoot>
      <div className="flex h-screen overflow-hidden">
        {userRole !== 'admin' ? (
          <div className=" text-3xl pt-10">Хандах эрхгүй байна</div>
        ) : (
          <>
            <Sidebar
              userRole={userRole}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header
                userRole={userRole}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </>
        )}
        
      </div>
    </RecoilRoot>
  );
}
