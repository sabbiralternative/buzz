import { useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";

const MyBets = ({ myBets }) => {
  const navigate = useNavigate();
  const { setRefetchViewClient, setClientId } = useContextState();
  return (
    <div className="simplebar-wrapper" style={{ margin: "0px" }}>
      <div className="simplebar-height-auto-observer-wrapper">
        <div className="simplebar-height-auto-observer"></div>
      </div>
      <div className="simplebar-mask">
        <div
          className="simplebar-offset"
          style={{ right: "0px", bottom: "0px" }}
        >
          <div
            className="simplebar-content-wrapper"
            role="region"
            aria-label="scrollable content"
            style={{ height: "auto", overflow: "hidden" }}
          >
            <div className="simplebar-content" style={{ padding: "0px" }}>
              <div id="my-game-bets" className="card m-b-10 my-bet">
                <div className="card-header">
                  <h6 className="card-title float-left">My Bets</h6>
                  <a className="user-lock-book float-right">View More</a>
                </div>
                <div className="card-body">
                  <div className="tabs" id="__BVID__1619">
                    <div
                      style={{ padding: "0px" }}
                      className="tab-content"
                      id="__BVID__1619__BV_tab_container_"
                    >
                      <div
                        role="tabpanel"
                        aria-hidden="false"
                        className="tab-pane active"
                        id="__BVID__1620"
                        aria-labelledby="__BVID__1620___BV_tab_button__"
                      >
                        <div id="matched-bet" className="tab-pane active">
                          <div className="table-responsive">
                            <table className="table coupon-table mb-0">
                              <thead>
                                <tr>
                                  <th
                                    style={{
                                      minWidth: "90px",
                                    }}
                                  >
                                    UserId
                                  </th>
                                  <th
                                    style={{
                                      minWidth: "90px",
                                    }}
                                  >
                                    Nation
                                  </th>
                                  <th
                                    className="text-right"
                                    style={{
                                      minWidth: "90px",
                                    }}
                                  >
                                    Rate
                                  </th>
                                  <th
                                    className="text-right"
                                    style={{
                                      minWidth: "90px",
                                    }}
                                  >
                                    Amount
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {myBets?.map((bets) => {
                                  return (
                                    <>
                                      <tr
                                        className={`${
                                          bets?.betType === "Back"
                                            ? "back-border"
                                            : "lay-border"
                                        }`}
                                      >
                                        <td colSpan="4">
                                          <b
                                            style={{
                                              textTransform: "uppercase",
                                            }}
                                          >
                                            {bets?.marketName}
                                          </b>
                                          <span className="float-right">
                                            {bets?.placeDate}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr
                                        className={`${
                                          bets?.betType === "Back"
                                            ? "back-border"
                                            : "lay-border"
                                        }`}
                                      >
                                        <td
                                          onClick={() => {
                                            setClientId(`P-${bets?.userId}`);
                                            setRefetchViewClient(true);
                                            navigate("/view-client");
                                          }}
                                          style={{ cursor: "pointer" }}
                                          className="bt0"
                                        >
                                          {bets?.userId}
                                        </td>
                                        <td className="bt0">{bets?.nation}</td>
                                        <td className="text-right bt0">
                                          {bets?.userRate}
                                        </td>
                                        <td className="text-right bt0">
                                          {bets?.amount}
                                        </td>
                                      </tr>
                                    </>
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
            </div>
          </div>
        </div>
      </div>
      <div
        className="simplebar-placeholder"
        style={{ width: "auto", height: "692px" }}
      ></div>
    </div>
  );
};

export default MyBets;
