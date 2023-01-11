import React from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
const HandleRefund = ({ btnType, title, styles, isDisabled, id }) => {
  const { contract } = useContract(id);
  const { mutateAsync: refund, isLoading } = useContractWrite(
    contract,
    "refund"
  );
  const handleClick = async () => {
    try {
      const data = await refund([id]);
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
      {title}
    </button>
  );
};

export default HandleRefund;
