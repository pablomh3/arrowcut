"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { addLinks, deleteLink } from "@/redux/LinkSlice/linkSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";

interface LinkData {
  id: string;
  url: string;
  shortUrl: string;
}

const Links = () => {
  const links = useSelector((state: RootState) => state.links);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/urls");
        const data = await res.json();
        console.log("Fetched data:", data);
        if (Array.isArray(data.links)) {
          dispatch(addLinks(data.links));
        } else {
          console.error(
            "Data received from API is not in expected format:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };
    fetchLinks();
  }, [dispatch]);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Texto copiado al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar el texto: ", err);
      });
  };

  const handleRemoveLink = async (linkId: string) => {
    console.log("Link ID to remove:", linkId);
    try {
      const res = await fetch(`/api/urls/delete/${linkId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        dispatch(deleteLink(linkId));
      } else {
        console.error("Failed to delete the link");
      }
    } catch (error) {
      console.error("Error deleting the link:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {links.map((link: LinkData) => (
        <div className="flex flex-col gap-[10px] justify-center items-center w-[65%] rounded-[20px] mx-[auto]  bg-arrow-bg p-[20px]">
          <div className="flex flex-row gap-[10px] justify-center items-center">
            <h3>
              {link.url} <strong> is now =</strong>
            </h3>
            <a
              href={`/${link.shortUrl}`}
              className="text-arrow-label"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.shortUrl}
            </a>
            <Button
              onClick={() =>
                handleCopy(`${window.location.origin}/${link.shortUrl}`)
              }
              className="w-[80px] bg-arrow-primary text-arrow-bg hover:text-arrow-primary hover:bg-arrow-bg hover:border-[3px] hover:border-[solid] hover:border-arrow-primary"
            >
              Copy URL
            </Button>
            <Button
              onClick={() => handleRemoveLink(link.id)}
              className="w-[80px] bg-arrow-bg text-arrow-primary hover:bg-arrow-bg border-[3px] border-[solid] border-arrow-primary"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Links;
