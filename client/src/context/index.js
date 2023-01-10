import React, { useContext, createContext, useState } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(false);

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
        role,
        setRole,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
