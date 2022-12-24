import React, { useState, useEffect } from "react";
import { useStateContext } from "../src/context/index";
import Link from "next/link";
import { useContract } from "@thirdweb-dev/react";
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const {
    address,
    contract,
    getCampaigns,
    campaignContract,
  } = useStateContext();
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    console.log(data);
    setCampaigns(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract && campaignContract) {
      try {
        fetchCampaigns();
      } catch (err) {
        console.log(err);
      }
    }
  }, [address, contract, campaignContract]);
  return (
    <div>
      {isLoading ? (
        <h1 className="text-white font-bold font-epilogue">Loading..</h1>
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
