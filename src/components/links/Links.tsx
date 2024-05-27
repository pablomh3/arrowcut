"use client"

import { useDispatch, useSelector } from "react-redux"
import { addLink, deleteLink } from "@/redux/LinkSlice/linkSlice"
import { Button } from "@/components/ui/button";
import React, { useRef } from 'react'

const Links = () => {
    const links = useSelector((state: any) => state.links);
    const dispatch = useDispatch();

    const handleRemoveLink = (linkId: any) => {
        dispatch(deleteLink(linkId));
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    }

    return (
        <div className="flex flex-col gap-[10px] justify-center items-center w-[95%] rounded-[20px] mx-[auto] mt-[60px] bg-arrow-bg p-[20px]">
            {links ? (
                links.map((link: any) => (
                    <div key={link.id} className="flex flex-row gap-[10px] justify-center items-center">
                        <h3>{link.link} is now =></h3>
                        <h3 className="text-arrow-label">{link.shorterURL}</h3>
                        <Button 
                            onClick={() => handleCopy(link.shorterURL)} 
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
                ))
            ) : console.log(links)}
        </div>
    )
}

export default Links
