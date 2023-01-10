import React from "react";
import { CampaignAPI } from "../../src/apis/campaignAPI";
import { useRouter } from "next/router";
import FundCard from "../../src/components/FundCard";
const MyCampaigns = (props) => {
  const campaigns = props.response;
  const pendingCampaigns = campaigns.filter(
    (campaign) => campaign.state === "pending"
  );
  const approvedCampaigns = campaigns.filter(
    (campaign) => campaign.state === "approved"
  );
  const deployedCampaigns = campaigns.filter(
    (campaign) => campaign.state === "deployed"
  );
  const rejectedCampaigns = campaigns.filter(
    (campaign) => campaign.state === "rejected"
  );

  const router = useRouter();
  const handleDeploy = async () => {
    console.log("Clicked");
  };
  const handleRequestsClick = () => {
    router.push(`/my-campaigns/${campaign["_id"]}/requests`);
  }
    
  return (
    <>
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          All Deployed Campaigns {deployedCampaigns.length}
        </h1>
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {deployedCampaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              You have not created any campigns yet
            </p>
          )}
          {deployedCampaigns.length > 0 &&
            deployedCampaigns.map((campaign) => (
              <FundCard
                key={campaign["_id"]}
                {...campaign}
                handleClick={() => router.push(`/campaign/${campaign["_id"]}`)}
                handleRequestsClick={handleRequestsClick}
                handleNewRequestsClick={() =>
                  router.push(`/my-campaigns/${campaign["_id"]}/new-request`)
                }
              />
            ))}
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          All Pending Campaigns {pendingCampaigns.length}
        </h1>
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {pendingCampaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              You have not created any campigns yet
            </p>
          )}
          {pendingCampaigns.length > 0 &&
            pendingCampaigns.map((campaign) => (
              <FundCard
                key={campaign["_id"]}
                {...campaign}
                handleClick={() => router.push(`/campaign/${campaign["_id"]}`)}
              />
            ))}
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          All Approved Campaigns {approvedCampaigns.length}
        </h1>
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {approvedCampaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              There are no approved campaigns yet!
            </p>
          )}
          {approvedCampaigns.length > 0 &&
            approvedCampaigns.map((campaign) => (
              <FundCard
                key={campaign["_id"]}
                {...campaign}
                handleClick={() => router.push(`/campaign/${campaign["_id"]}`)}
                handleDeployClick={handleDeploy}
              />
            ))}
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          All Rejected Campaigns {rejectedCampaigns.length}
        </h1>
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {rejectedCampaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              There are no rejected campaign yet!
            </p>
          )}
          {rejectedCampaigns.length > 0 &&
            rejectedCampaigns.map((campaign) => (
              <FundCard
                key={campaign["_id"]}
                {...campaign}
                handleClick={() => router.push(`/campaign/${campaign["_id"]}`)}
                handleDeployClick={handleDeploy}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default MyCampaigns;

export async function getServerSideProps({ req }) {
  const accessToken = req.cookies.token;
  try {
    const response = await CampaignAPI.getMyCampaigns(accessToken);
    return {
      props: { response },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
}
