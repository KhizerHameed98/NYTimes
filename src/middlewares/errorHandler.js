import { toast } from "react-toastify";

export const handleError = (error, msg) => {
  let errMsg = error?.response?.data?.message;
  toast.error(errMsg ? errMsg : msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
