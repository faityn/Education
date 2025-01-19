"use client";
import React, { ReactNode } from "react";

import { RecoilRoot } from "recoil";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <div className="flex h-screen overflow-hidden">
        <div className="relative login_bg flex flex-1 flex-col overflow-y-auto overflow-x-hidden pt-20">
          <main>
            
            <div className="mx-auto max-w-[1600px] p-4 md:p-6 2xl:p-10 mt-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </RecoilRoot>
  );
}
