import { Input } from "@/components/ui/input";
import { Goldman } from "next/font/google";
import Image from "next/image";



export default function Home() {
  return (

    <>

      <div className="flex flex-col gap-[0px] justify-center items-center h-[800px] w-[95%] rounded-[20px] mx-[auto] mt-[60px] bg-arrow-primary">
        <Image src={"/images/logo.png"} alt="logo" width={300} height={300}/>
        <h1 className="text-arrow-bg font-title text-[76px] "> ARROW CUT </h1>
        <div>
          <label htmlFor="link" className="text-arrow-label font-label text-[26px]">enter a link below and receive a shorter one for free </label>
          <Input type="text" id= "link" placeholder="link" className="font-label"/>
    
        </div>
        

      </div>
       
    </>
   
  );
}
