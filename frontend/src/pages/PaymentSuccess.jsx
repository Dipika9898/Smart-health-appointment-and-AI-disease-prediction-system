import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const pid = query.get("pid"); // appointment id
    const refId = query.get("refId"); // eSewa reference id
    const amt = query.get("amt"); // total amount

    if (pid && refId) {
      axios
        .post(
          `${backendUrl}/api/user/payment/esewa/verify`,
          { pid, token: refId, amount: amt },
          { headers: { token } }
        )
        .then((res) => {
          if (res.data.success) toast.success("Payment Verified Successfully!");
          else toast.error("Payment Verification Failed!");
          navigate("/my-appointments"); // redirect to appointments page
        })
        .catch((err) => {
          toast.error("Payment Verification Error!");
          navigate("/my-appointments");
        });
    } else {
      toast.error("Payment Data Missing!");
      navigate("/my-appointments");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-lg font-semibold">Processing Payment...</h1>
    </div>
  );
};

export default PaymentSuccess;