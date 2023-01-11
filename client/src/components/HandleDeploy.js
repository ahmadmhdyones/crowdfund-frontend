import React from "react";
import { useStateContext } from "../context/index";
import { ethers } from "ethers";
const HandleDeploy = ({
  isDisabled,
  buttonTitle,
  styles,
  btnType,
  ///////
  name,
  title,
  description,
  image,
  target,
  deadline,
  min,
}) => {
  const { publishCampaign } = useStateContext();

  const handleClick = async () => {
    console.log(
      name,
      title,
      description,
      image,
      ethers.utils.parseUnits(target.toString(), 18),
      new Date(deadline).getTime(),
      ethers.utils.parseUnits(min.toString(), 18)
    );
    const form = {
      name,
      title,
      description,
      image,
      target: ethers.utils.parseUnits(target.toString(), 18),
      deadline: new Date(deadline).getTime(),
      min: ethers.utils.parseUnits(min.toString(), 18),
    };
    try {
      const data = await publishCampaign(form);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
  return (
    <button
      disabled={isDisabled}
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] disabled:opacity-50 ${styles}`}
      onClick={handleClick}
    >
      {buttonTitle}
    </button>
  );
};

export default HandleDeploy;
