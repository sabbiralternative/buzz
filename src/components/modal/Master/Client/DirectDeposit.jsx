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

const DirectDeposit = ({ setDirectDeposit, downlineId, role, id }) => {
  const [disabled, setDisabled] = useState(false);
  const { clientId } = useContextState();
  const [fetchClients, setFetchClients] = useState(false);
  const payload = {
    type: "balance",
    downlineId,
    id,
    role,
  };

  const { data } = useGetDownlineEditForm(payload);
  const { refetchBalance } = useBalance();
  const [amountTwo, setAmountTwo] = useState(null);
  const [amountOne, setAmountOne] = useState(null);
  const [amount, setAmount] = useState(null);
  const directDepositRef = useRef();
  useCloseModalClickOutside(directDepositRef, () => {
    setDirectDeposit(false);
  });
  const { refetchClients } = useGetClient(
    clientId,
    setFetchClients,
    fetchClients
  );
  const { register, handleSubmit, reset } = useForm();
  const { token } = useContextState();

  const handleAmount = (e) => {
    const userOne = (data?.amount - parseFloat(e)).toFixed(2);
    setAmountOne(userOne);
    const userTwo = (data?.amount2 + parseFloat(e)).toFixed(2);
    setAmountTwo(userTwo);
  };

  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      id,
      downlineId,
      type: "deposit",
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
      setDirectDeposit(false);
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  useEffect(() => {
    if (data) {
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
          <div className="modal-content" ref={directDepositRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Direct Deposit
              </h5>
              <button
                onClick={() => setDirectDeposit(false)}
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
                        {/* {data?.userName}  */}
                        Previous Balance
                      </label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data?.amount?.toFixed(2)}
                          type="number"
                          className="form-control"
                          id="basic-default-name"
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
                        Balance after deposit
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
                          id="basic-default-name"
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
                          id="basic-default-name"
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
                        {/* {data?.userName2?.split("_")[0]} */}
                        Balance after deposit
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
                          id="basic-default-name"
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
                        Deposit Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handleAmount(e.target.value);
                            setAmount(e.target.value);
                          }}
                          type="number"
                          className="form-control"
                          id="basic-default-name"
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
                          id="basic-default-name"
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
                        id="basic-default-name"
                        placeholder="Transaction Code"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setDirectDeposit(false)}
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
                  Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectDeposit;
