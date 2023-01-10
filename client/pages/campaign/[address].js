import React, { useState } from "react";
import Image from "next/image";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { calculateBarPercentage, daysLeft } from "../../src/utils/index";
import CountBox from "../../src/components/CountBox";
import CustomButton from "../../src/components/CustomButton";
import Loader from "../../src/components/Loader";
import Cookies from "js-cookie";
import { ContributionAPI } from "../../src/apis/contributionAPI";
import { CampaignAPI } from "../../src/apis/campaignAPI";
const CampaignDetailed = (props) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const { address } = router.query;
  const { contract } = useContract(address);
  const campaign = props.response;
  address;
  console.log(campaign);
  const remainingDays = daysLeft(campaign.endAt);
  const [amount, setAmount] = useState("");

  const { mutateAsync: pledge, isLoading: isLoadingPledge } = useContractWrite(
    contract,
    "pledge"
  );
  const handleDonate = async () => {
    if (!token) {
      router.push("/login");
    } else {
      try {
        const response = await ContributionAPI.fund({
          campaignId: address,
          amount,
        });
        setIsLoading(true);
        const data = await pledge([
          {
            gasLimit: 1000000, // override default gas limit
            value: ethers.utils.parseEther(amount), // send 0.1 ether with the contract call
          },
        ]);
        console.info("contract call successs", data);
        router.push("/");
        setIsLoading(false);
      } catch (err) {
        console.error("contract call failure", err);
      }
    }
  };
  return (
    <>
      {isLoadingPledge ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-white font-epilogue font-bold text-[30px]">{campaign.title}</h1>
          <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
              <Image
                priority
                width={1000}
                height={1000}
                src={campaign.image}
                alt="campaign"
                className="w-full h-[410px] object-cover rounded-xl"
              />
              <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                <div
                  className="absolute h-full bg-[#4acd8d]"
                  style={{
                    width: `${calculateBarPercentage(
                      campaign.goal,
                      campaign.pledged
                    )}%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
            </div>

            <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
              <CountBox
                title={remainingDays <= 0 ? "" : "Days Left"}
                value={remainingDays <= 0 ? "It's Over" : remainingDays}
              />
              <CountBox
                title={`Raised of ${campaign.goal}`}
                value={campaign.pledged}
              />
              <CountBox title="Total Backers" value={campaign.countPledges} />
            </div>
          </div>

          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Creator
                </h4>

                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img
                      src={"/thirdweb.svg"}
                      alt="user"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                      {campaign.name}
                    </h4>
                    <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                      10 Campaigns
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Story
                </h4>

                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {campaign.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Fund
              </h4>

              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                  Fund the campaign
                </p>
                <div className="mt-[30px]">
                  <input
                    type="number"
                    placeholder="ETH 0.1"
                    step="0.01"
                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={remainingDays <= 0}
                  />

                  <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Back it because you believe in it.
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      Support the project for no reward, just because it speaks
                      to you.
                    </p>
                  </div>

                  <CustomButton
                    btnType="button"
                    title="Fund Campaign"
                    styles="w-full bg-[#8c6dfd] "
                    handleClick={handleDonate}
                    isDisabled={remainingDays <= 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignDetailed;

export async function getServerSideProps(context) {
  const address = context.params.address;
  try {
    const response = await CampaignAPI.getOne(address);
    return {
      props: { response },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
}
