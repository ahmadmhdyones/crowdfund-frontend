import React, { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
const CampaignDetailed = (props) => {
  const [campaign, setCampaign] = useState("");
  const {
    contract,
    isLoading: isLoadingContract,
    error,
  } = useContract(props.address);
  const { data, isLoading: isLoadingSummary } = useContractRead(
    contract,
    "getSummary"
  );
  useEffect(() => {
    if (data) {
      const fixedCampaign = data.map((e) => {
        if (typeof e !== "string") {
          return ethers.utils.formatEther(e.toString());
        } else return e;
      });
      setCampaign(fixedCampaign[2]);
    }
    console.log(data);
  }, [data]);
  return (
    <div className="text-white font-epilogue font-bold">
      {isLoadingSummary && isLoadingSummary ? (
        <p>Loading...</p>
      ) : (
        <p>{campaign}</p>
      )}
    </div>
  );
};

export default CampaignDetailed;

export async function getServerSideProps(context) {
  const address = context.params.address;

  return {
    props: {
      address,
    },
  };
}
