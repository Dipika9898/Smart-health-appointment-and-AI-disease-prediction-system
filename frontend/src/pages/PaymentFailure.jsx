import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Payment Failed or Cancelled!");
    navigate("/my-appointments"); // redirect after showing toast
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-lg font-semibold">Payment Failed!</h1>
    </div>
  );
};

export default PaymentFailure;