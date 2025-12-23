import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../../../api";
import handleRandomToken from "../../../../utils/handleRandomToken";
import useContextState from "../../../../hooks/useContextState";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import useGetDownlineEditForm from "../../../../hooks/Master/Client/useGetDownlineEditForm";
import useBalance from "../../../../hooks/useBalance";
import useGetClient from "../../../../hooks/Master/Client/useGetClient";

const DirectWithdraw = ({ setDirectWithdraw, downlineId, role, id }) => {
  const directWithdraw = useRef();
  const [disabled, setDisabled] = useState(false);
  const { clientId } = useContextState();
  const [fetchClients, setFetchClients] = useState(false);
  let payload = {
    type: "balance",
    downlineId,
    role,
    id,
  };

  const { data } = useGetDownlineEditForm(payload);
  const { refetchBalance } = useBalance();
  const [amountTwo, setAmountTwo] = useState(null);
  const [amountOne, setAmountOne] = useState(null);
  const [amount, setAmount] = useState(null);

  const { refetchClients } = useGetClient(
    clientId,
    setFetchClients,
    fetchClients
  );
  const { register, handleSubmit, reset } = useForm();
  const { token } = useContextState();

  useCloseModalClickOutside(directWithdraw, () => {
    setDirectWithdraw(false);
  });

  const handleAmount = (e) => {
    const userOne = (data?.amount + parseFloat(e)).toFixed(2);
    setAmountOne(userOne);
    const userTwo = (data?.amount2 - parseFloat(e)).toFixed(2);
    setAmountTwo(userTwo);
  };

  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      id,
      downlineId,
      type: "withdraw",
      ...values,
      amount,
      token: generatedToken,
      role,
    };
    const res = await axios.post(API.downLineEdit, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      refetchBalance();
      toast.success(data?.result?.message);
      refetchClients();
      reset();
      setDirectWithdraw(false);
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  useEffect(() => {
    if (data && Object.values(data).length > 0) {
      reset({
        amount: data?.amount?.toFixed(2),
      });
    }
  }, [data, reset]);

  return (
    <>
      <div className="content-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="modalCenter"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" ref={directWithdraw}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Direct Withdraw
              </h5>
              <button
                onClick={() => setDirectWithdraw(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{ flexDirection: "column", width: "100%" }}
                      className="row mb-3"
                      id="bank_account_name_div"
                    >
                      <label
                        className="col-form-label"
                        htmlFor="basic-default-name"
                      >
                        {/* {data?.userName} */}
                        Previous Balance
                      </label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data?.amount?.toFixed(2)}
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          readOnly
                        />
                      </div>
                    </div>
                    <div
                      style={{ flexDirection: "column", width: "100%" }}
                      className="row mb-3"
                      id="bank_account_name_div"
                    >
                      <label
                        className=" col-form-label"
                        htmlFor="basic-default-name"
                      >
                        {/* {data?.userName} */}
                        Balance after withdraw
                      </label>
                      <div className="col-sm-10">
                        <input
                          value={
                            amountOne !== null && !isNaN(amountOne)
                              ? amountOne
                              : data?.amount?.toFixed(2)
                          }
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{ flexDirection: "column", width: "100%" }}
                      className="row mb-3"
                      id="bank_account_name_div"
                    >
                      <label
                        className="col-form-label"
                        htmlFor="basic-default-name"
                      >
                        {/* {data?.userName2?.split("_")[0]} */}
                        Previous Balance
                      </label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data?.amount2?.toFixed(2)}
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          readOnly
                        />
                      </div>
                    </div>
                    <div
                      style={{ flexDirection: "column", width: "100%" }}
                      className="row mb-3"
                      id="bank_account_name_div"
                    >
                      <label
                        className="col-form-label"
                        htmlFor="basic-default-name"
                      >
                        {/* {data?.userName2?.split("_")[0]} */}
                        Balance after withdraw
                      </label>
                      <div className="col-sm-10">
                        <input
                          value={
                            amountTwo !== null && !isNaN(amountTwo)
                              ? amountTwo
                              : data?.amount2?.toFixed(2)
                          }
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      className="row mb-3"
                      style={{ flexDirection: "column", width: "100%" }}
                      id="bank_account_name_div"
                    >
                      <label
                        className=" col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Withdraw Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handleAmount(e.target.value);
                            setAmount(e.target.value);
                          }}
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          required
                        />
                      </div>
                    </div>
                    <div
                      style={{ flexDirection: "column", width: "100%" }}
                      className="row mb-3"
                      id="bank_account_name_div"
                    >
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Remark
                      </label>
                      <div className="col-sm-10">
                        <input
                          {...register("remark")}
                          type="text"
                          className="form-control"
                          placeholder="Remark"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ flexDirection: "column", width: "60%" }}
                    className="row mb-3"
                    id="bank_account_name_div"
                  >
                    <label
                      className=" col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Transaction Code
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("mpassword")}
                        type="text"
                        className="form-control"
                        placeholder="Transaction Code"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setDirectWithdraw(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={disabled}
                  type="submit"
                  className="btn btn-primary"
                >
                  Withdraw
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectWithdraw;
