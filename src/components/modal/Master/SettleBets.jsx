import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import axios from "axios";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import handleEncryptData from "../../../utils/handleEncryptData";
import useContextState from "../../../hooks/useContextState";

const SettleBets = ({ searchUser, marketId, setShowBetsModal }) => {
  /* close modal click outside */
  const { token } = useContextState();
  const settleBetsRef = useRef();
  useCloseModalClickOutside(settleBetsRef, () => {
    setShowBetsModal(false);
  });

  const [data, setData] = useState([]);
  //   const [filteredData, setFilteredData] = useState([]);
  //   const [betsType, setBetsType] = useState("all");
  //   const betsRef = useRef();

  useEffect(() => {
    const getSettledBetsData = async () => {
      const generatedToken = handleRandomToken();
      const encryptedData = handleEncryptData({
        searchId: searchUser,
        marketId: marketId,
        token: generatedToken,
      });
      const res = await axios.post(API.settledBets, encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      if (data?.success) {
        setData(data?.result);
        // setFilteredData(data?.result);
      }
    };
    getSettledBetsData();
  }, [token, marketId, searchUser]);

  /* Filter sports */
  //   useEffect(() => {
  //     if (betsType !== "all" && betsType !== "") {
  //       const filterLayBack = data.filter((game) => game.betType === betsType);
  //       setFilteredData(filterLayBack);
  //     } else if (betsType === "all") {
  //       setFilteredData(data);
  //     }
  //   }, [betsType, data]);

  /* Get total amount */
  //   let totalAmount = 0;
  //   for (const bets of filteredData) {
  //     totalAmount = totalAmount + parseFloat(bets.win);
  //   }

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
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "90%" }}
        >
          <div className="modal-content" ref={settleBetsRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Settle Bets
              </h5>
              <button
                onClick={() => setShowBetsModal(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xl-12">
                  <div className="table-responsive mt-4 mt-xl-0">
                    <table className="table table-hover table-striped align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Nation</th>
                          <th scope="col">Rate</th>
                          <th scope="col">Bhav</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Win</th>
                          <th scope="col">Date</th>
                          <th scope="col">IP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((betData, i) => {
                          return (
                            <tr
                              key={i}
                              className={`${
                                betData?.betType === "Back" ? "BACK" : "LAY"
                              }`}
                            >
                              <td style={{ color: "black" }}>
                                {" "}
                                {betData?.nation}
                              </td>
                              <td style={{ color: "black" }}>
                                {" "}
                                {betData?.userRate}
                              </td>
                              <td style={{ color: "black" }}>
                                {" "}
                                {betData?.bhav}
                              </td>
                              <td style={{ color: "black" }}>
                                {betData?.amount}
                              </td>
                              <td
                                className={`${
                                  betData?.win > 0
                                    ? "text-green"
                                    : "text-red"
                                }`}
                              >
                                {betData?.win}
                              </td>

                              <td style={{ color: "black" }}>
                                {betData?.placeDate}
                              </td>
                              <td style={{ color: "black" }}>
                                {betData?.ipAddress}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettleBets;
