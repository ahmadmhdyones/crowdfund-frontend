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
  const { contract } = useContract(
    "0xfc53E8A55cA5F3840114B3cF8E8c2D3757Daf94A"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();

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
  return (
    <StateContext.Provider value={{ address, publishCampaign, contract, connect }}>
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
