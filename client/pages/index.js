import React from "react";
import { useRouter } from "next/router";
import FundCard from "../src/components/FundCard";
import { CampaignAPI } from "../src/apis/campaignAPI";
const Home = (props) => {
  let campaigns = props.response;
  console.log(campaigns[0]["_id"]);
  const router = useRouter();
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        All Campaigns {campaigns.length}
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}
        {campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign["_id"]}
              {...campaign}
              handleClick={() => router.push(`/campaign/${campaign["_id"]}`)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const response = await CampaignAPI.getAllDeployed();
    return {
      props: { response },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
}
