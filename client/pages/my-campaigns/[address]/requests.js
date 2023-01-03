import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Loader from "../../../src/components/Loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import { useStateContext } from "../../../src/context";
function createData(id, description, amount, recipient, state, approvalCount) {
  return { id, description, amount, recipient, state, approvalCount };
}

const Requests = () => {
  const { address } = useStateContext();
  let rows;
  const router = useRouter();
  const { contract } = useContract(router.query.address);
  const { data: isOwner, isLoading: isLoadingOwner } = useContractRead(
    contract,
    "isOwner",
    address
  );
  useEffect(() => {
    if (isOwner) console.log(isOwner);
    if (isOwner === false) {
      // router.push("/");
      console.log(isOwner);
    }
  }, [isOwner]);
  const { data, isLoading: isLoadingRequest } = useContractRead(
    contract,
    "getRequests"
  );

  const { data: contributorsNumber, isLoading: isLoadingAmount } =
    useContractRead(contract, "getSummary");

  const { mutateAsync: finalizeRequest, isLoadingFinlize } = useContractWrite(
    contract,
    "finalizeRequest"
  );

  const call = async (id) => {
    try {
      const data = await finalizeRequest([id]);
      console.info("contract call successs", data);
      Swal.fire({
        title: "Sweet!",
        text: "Successfully Finalized!",
        imageUrl: "/thirdweb.svg",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "logo",
      });
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  if (data) {
    rows = data.map((e, i) => {
      return createData(
        i,
        e[0],
        ethers.utils.formatEther(e[1].toString()),
        e[2],
        e[3],
        e[4].toNumber()
      );
    });
  }
  const handleClick = async (id) => {
    await call(id);
  };
  return (
    <>
      {isLoadingRequest ||
      isLoadingFinlize ||
      isLoadingAmount ||
      isLoadingOwner ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="bg-[#AFAFF0]"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#303070",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#303070",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#303070",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#303070",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Recipient
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#303070",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Approvals Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row) => {
                  if (!row.state)
                    return (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="left" className="text-white">
                          {row.description}
                        </TableCell>
                        <TableCell align="left">{row.amount}</TableCell>
                        <TableCell align="left">{row.recipient}</TableCell>
                        <TableCell align="left">{row.approvalCount}</TableCell>
                        <TableCell align="left">
                          <button
                            className="bg-[#3DC986] text-gray py-4 px-2 rounded-[10px] text-white font-bold disabled:opacity-50"
                            disabled={
                              !(
                                row.approvalCount > 0 &&
                                row.approvalCount >=
                                  Math.ceil(
                                    (contributorsNumber[12].toNumber() + 1) / 2
                                  )
                              )
                            }
                            onClick={() => handleClick(row.id)}
                          >
                            Finalize
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Requests;
