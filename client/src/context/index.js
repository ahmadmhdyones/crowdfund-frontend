import React, { useContext, createContext, useState, useEffect } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const address = useAddress();
  const connect = useMetamask();
  //related to Factory Smart Contract

  //getting the address(contract) of the FactoryCampaign contract
  const { contract } = useContract(
    "0x944ac44717a2c9722C3A4A525A735884B0C04753"
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
        form.name,
        form.title,
        form.description,
        form.image,
        form.target,
        form.deadline.toString(), //unix based timestamp
        form.min,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <StateContext.Provider
      value={{
        address,
        publishCampaign,
        contract,
        connect,
        token,
        setToken,
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
