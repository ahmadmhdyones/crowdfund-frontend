import React from "react";
import { useRouter } from "next/router";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Loader from "../../../src/components/Loader";
const Requests = () => {
  const router = useRouter();
  const { contract } = useContract(router.query.address);
  const { data, isLoading } = useContractRead(contract, "getRequests");
  console.log(data);
  return <div>{isLoading ? <Loader /> : <main>{data.length}</main>}</div>;
};

export default Requests;
