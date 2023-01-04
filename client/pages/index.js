import React, { useState, useEffect } from "react";
import { useStateContext } from "../src/context/index";
import Link from "next/link";
import Loader from "../src/components/Loader";
import { useContractRead } from "@thirdweb-dev/react";
const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { contract } = useStateContext();
  const { data, isLoading: isLoadingCampaigns } = useContractRead(
    contract,
    "getDeployedCampaigns"
  );
  useEffect(() => {
    if (contract && data) {
      setCampaigns(data);
    }
  }, [data]);
  return (
    <div>
      {isLoadingCampaigns ? (
        <Loader />
      ) : (
        <ul>
          {campaigns.map((link) => (
            <li key={link} className="text-white font-epilogue font-bold">
              <Link href={`/campaign/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
