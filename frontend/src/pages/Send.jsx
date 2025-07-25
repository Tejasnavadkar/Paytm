import axios from "axios";
import Heading from "../components/Heading";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Send() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const userId = searchParams.get("id");
  const username = searchParams.get("username");

  const InitiateTransfer = async () => {
     try {
         const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/account/transfer`,
      {
        to: userId,
        amount: amount,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.status == 200) {
      toast.success(`Funds transferred to ${username}!`)
      navigate("/transaction", { state: response.data.message });
    }
     } catch (error) {
        toast.error(error.response.data.message)
     }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <Heading label={"Send Money"} />
          <div className="flex items-center gap-2">
            <div className="bg-green-500 h-12 w-12 rounded-full flex justify-center items-center ">
              <div>{username[0].toUpperCase()}</div>
            </div>
            <div className="font-semibold text-2xl">{username}</div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Amount in (Rs)</label>
            <input
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              className="py-2 border rounded px-2"
              type="text"
              placeholder="Enter Amount"
            />
            <button
              type="button"
              onClick={InitiateTransfer}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 "
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Send;
