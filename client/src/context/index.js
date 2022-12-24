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
    "0xfc53E8A55cA5F3840114B3cF8E8c2D3757Daf94A"
  );

  //getting the createCampaign function
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  //creating the functionality of the creation of a campaign
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        form.target,
        new Date(form.deadline).getTime(), //unix based timestamp
        form.min,
        form.name,
        form.title,
        form.description,
        form.image,
      ]);
      console.log("contract call success", data);
    } catch (err) {
      console.log("contract call error", err);
    }
  };

  //calling a simple return function on the factory contract
  const getCampaigns = async () => {
    const campaigns = await contract.call("getDeployedCampaigns");
    return campaigns;
  };

  //Related to Campaign contract

  const { contract: campaignContract } = useContract(
    "0xceBbF5E0c5D4B2a7cCD715258fA0C2310d01191b"
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
