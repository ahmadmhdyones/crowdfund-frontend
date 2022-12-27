import React, { useState, useEffect } from "react";
import { useStateContext } from "../src/context/index";
import Link from "next/link";
import Loader from '../src/components/Loader'
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
    setCampaigns(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract && campaignContract) {
      try {
        fetchCampaigns();
      } catch (err) {
        console.error(err);
      }
    }
  }, [address, contract, campaignContract]);
  return (
    <div>
      {isLoading ? (
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
