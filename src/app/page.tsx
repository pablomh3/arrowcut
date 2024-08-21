"use client";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Image from "next/image";
import { useState } from "react";
import Links from "./components/links/Links";
import { useDispatch } from "react-redux";
import { addLinks } from "@/redux/LinkSlice/linkSlice";

export default function Home() {
  const [link, setLink] = useState("");
  const dispatch = useDispatch();

  const handleClick = async (e: any) => {
    e.preventDefault();

    if (!link) return;

    const newLink = {
      url: link,
    };

    try {
      const response = await fetch("http://localhost:3000/api/urls/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      });

      if (!response.ok) {
        throw new Error("Failed to add link");
      }

      const data = await response.json();
      console.log("Server response:", data); // Verifica aquí que el _id esté presente

      dispatch(
        addLinks([
          {
            id: data._id, // Asegúrate de usar data._id y no data.id si estás usando MongoDB
            url: data.url,
            shortUrl: data.shortUrl,
          },
        ])
      );

      setLink(""); // Limpiar el input después de agregar el enlace
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[10px] justify-center items-center w-[95%] rounded-[20px] mx-[auto] mt-[60px] bg-arrow-primary p-[40px]">
        <Image src={"/images/logo.png"} alt="logo" width={300} height={300} />
        <h1 className="text-arrow-bg font-title text-[76px]">ARROW CUT</h1>
        <div className="flex flex-col gap-5 justify-center items-center">
          <label
            htmlFor="link"
            className="text-arrow-label font-label text-[26px]"
          >
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

        <Links />
      </div>
    </>
  );
}
