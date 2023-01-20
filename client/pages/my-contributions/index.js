import React from "react";
import { ContributionAPI } from "../../src/apis/contributionAPI";
import { useRouter } from "next/router";
import FundCard from "../../src/components/FundCard";
import CustomButton from "../../src/components/CustomButton";
import HandleRefund from "../../src/components/HandleRefund";
const MyContributions = (props) => {
  const campaigns = props.response;
  console.log(campaigns);
  const router = useRouter();
  return (
    <div>
      {campaigns ? (
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
              campaigns.map((e) => (
                <div
                  className="flex flex-col gap-[10px] justify-center"
                  key={e.campaign["_id"]}
                >
                  <FundCard
                    {...e.campaign}
                    handleClick={() =>
                      router.push(
                        `/my-contributions/${e.campaign["_id"]}/requests`
                      )
                    }
                  />
                  <HandleRefund
                    title={`Refund ${e.amount}`}
                    styles="bg-[#c92a2a]"
                    id={e.campaign["_id"]}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
            You've not contributed in any campaign yet!
          </h1>
      )}
    </div>
  );
};

export default MyContributions;

export async function getServerSideProps({ req }) {
  const accessToken = req.cookies.token;
  try {
    const response = await ContributionAPI.getAll(accessToken);
    console.log(response);
    return {
      props: { response },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
}
