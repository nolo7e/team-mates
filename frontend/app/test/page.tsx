"use client"; //WHAT THE HECK

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

const Test: React.FC = () => {
  const pathname = usePathname();
  console.log(pathname);

  const session = useSession();
  console.log(session);

  return (
    <>
      <h1>Пусть будет приватной страницей</h1>
    </>
  );
};

export default React.memo(Test);
