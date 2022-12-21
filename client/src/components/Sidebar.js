import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { navLinks } from "../constants/index";
import { useRouter } from "next/router";

const Icon = ({ styles, name, isActive, disabled, handleClick }) => {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <Image
          src={`/${name}.svg`}
          alt={name}
          className="w-1/2 h-1/2"
          height={512}
          width={512}
        />
      ) : (
        <Image
          src={`/${name}.svg`}
          alt={name}
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
          height={512}
          width={512}
        />
      )}
    </div>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link href={"/"}>
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32]"
          name={"logo"}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navLinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  router.push(link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon styles="bg-[#1c1c24] shadow-secondary" name="sun" />
      </div>
    </div>
  );
};

export default Sidebar;
