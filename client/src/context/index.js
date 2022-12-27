import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  //general fetches (metamask address and connect to metamask method)
  const address = useAddress();
  const connect = useMetamask();

  //related to Factory Smart Contract

  //getting the address(contract) of the FactoryCampaign contract
  const { contract } = useContract(
    "0x2A924D6563B1879878d594F62f401099d3322ed2"
  );

  //getting the createCampaign function
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  //creating the functionality of the creation of a campaign
  const publishCampaign = async (form) => {
    try {
      // _name,
      //       _title,
      //       _description,
      //       _image,
      //       _goal,
      //       _end,
      //       _minimum,
      const data = await createCampaign([
        form.name,
        form.title,
        form.description,
        form.image,
        form.target,
        new Date(form.deadline).getTime(), //unix based timestamp
        form.min,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  //calling a simple return function on the factory contract
  const getCampaigns = async () => {
    const campaigns = await contract.call("getDeployedCampaigns");
    return campaigns;
  };

  //Related to Campaign contract

  const { contract: campaignContract } = useContract(
    "0x40c2941DEae502b7EDBEd01DC67c9759eBcC01Ce"
  );

  const getCampaignSummary = async () => {
    const campaign = await campaignContract.call("getSummary");
    return campaign;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        publishCampaign,
        contract,
        connect,
        getCampaigns,
        campaignContract,
        getCampaignSummary,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
//uint256 _goal,
// uint256 _end,
// uint256 _minimum,
// string memory _name,
// string memory _title,
// string memory _description,
// string memory _image
