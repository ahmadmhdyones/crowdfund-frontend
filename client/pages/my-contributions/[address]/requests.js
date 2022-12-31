import * as React from "react";
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
function createData(id, description, amount, recipient, approvalCount) {
  return { id, description, amount, recipient, approvalCount };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
const Requests = () => {
  const router = useRouter();
  const { contract } = useContract(router.query.address);
  const { data, isLoading } = useContractRead(contract, "getRequests");
  const { mutateAsync: approveRequest, isLoading: isLoadingApprove } =
    useContractWrite(contract, "approveRequest");
  const call = async (id) => {
    try {
      const data = await approveRequest([id]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
  let rows;
  if (data) {
    console.log(data);
    rows = data.map((e, i) => {
      if (!e[3])
        return createData(
          i,
          e[0],
          ethers.utils.formatEther(e[1].toString()),
          e[2],
          e[4].toNumber()
        );
    });
  }
  const handleClick = async (id) => {
    await call(id);
  };
  return (
    <>
      {isLoading || isLoadingApprove ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Recipient</TableCell>
                <TableCell align="right">Approvals Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.recipient}</TableCell>
                  <TableCell align="right">{row.approvalCount}</TableCell>
                  <TableCell align="right">
                    <button
                      className="bg-[#1DC071] text-gray py-4 px-2 rounded-[10px]"
                      onClick={() => handleClick(row.id)}
                    >
                      Approve
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Requests;
