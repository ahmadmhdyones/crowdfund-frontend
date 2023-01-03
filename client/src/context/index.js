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
    "0xC01cb8f8EA2D8324cb8d302dD4469278E39ff536"
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
      console.log("from context before", form.deadline.toString());
      const data = await createCampaign([
        form.name,
        form.title,
        form.description,
        form.image,
        form.target,
        form.deadline.toString(), //unix based timestamp
        form.min,
      ]);
      console.log("from context after", form.deadline);
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
    "0x0BBF5D3AB5E8437dC818E0363008E2fe678510a9"
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
