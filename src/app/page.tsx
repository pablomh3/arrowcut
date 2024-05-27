"use client";

import Links from "@/components/links/Links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addLink } from "@/redux/LinkSlice/linkSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [link, setLink] = useState("");
  const links = useSelector((state: any) => state.links);
  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    e.preventDefault();

    if (!link) return;

    const newLink = {
      id: Date.now(),
      link: link,
      shorterURL: link,
    };

    dispatch(addLink(newLink));
    setLink("");
  };

  return (
    <>
      <div className="flex flex-col gap-[10px] justify-center items-center w-[95%] rounded-[20px] mx-[auto] mt-[60px] bg-arrow-primary p-[40px]">
        <Image src={"/images/logo.png"} alt="logo" width={300} height={300} />
        <h1 className="text-arrow-bg font-title text-[76px]">ARROW CUT</h1>
        <div className="flex flex-col gap-5 justify-center items-center">
          <label htmlFor="link" className="text-arrow-label font-label text-[26px]">
            Enter a link below and receive a shorter one for free
          </label>
          <Input
            type="text"
            id="link"
            placeholder="link"
            className="font-label"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button
            className="w-[80px] bg-arrow-label text-arrow-bg hover:bg-arrow-primary hover:border-[1px] hover:border-[solid] hover:border-arrow-bg"
            onClick={handleClick}
          >
            Go!
          </Button>
        </div>

        {links.length > 0 && <Links />}
      </div>
    </>
  );
}
