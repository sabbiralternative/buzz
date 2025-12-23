import { useState } from "react";
import useContextState from "../../../../hooks/useContextState";
import { Link, useNavigate } from "react-router-dom";

import { AdminRole } from "../../../../constant/constant";
const HyperMaster = () => {
  const {
    setShowAddSuperBranch,
    setShowAddBranch,
    setShowSocialLink,
    setAddChecker,
    adminRole,
    setAddWhiteLabel,
  } = useContextState();

  const [depositReport, setDepositReport] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [showBranch, setShowBranch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExposure, setShowExposure] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [showComplaints, setShowComplaints] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [showWhiteLabel, setShowWhiteLabel] = useState(false);
  const [siteNotification, setSiteNotification] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowBranch(false);
    setShowSettings(false);
    setShowExposure(false);
    setShowReport(false);
    setShowWithdraw(false);
    setShowDeposit(false);
    setShowClients(false);
    setShowBonus(false);
    setShowStaff(false);
    setShowWhiteLabel(false);
  };
  return (
    <ul className="menu-inner" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link to="/" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboard</div>
        </Link>
      </li>

      {adminRole === "admin_master" && (
        <li
          onMouseEnter={() => setShowWhiteLabel(true)}
          onMouseLeave={() => setShowWhiteLabel(false)}
          className={`menu-item ${showWhiteLabel ? "open" : ""}`}
        >
          <a
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="menu-link menu-toggle"
          >
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Branch">Whitelabel</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item ">
              <a
                onClick={() => handleNavigate("view-whitelabel")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Branches">View Whitelabel</div>
              </a>
            </li>

            <li className="menu-item">
              <a
                onClick={() => {
                  setAddWhiteLabel(true);
                  setShowBranch(false);
                }}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Branch">Add Whitelabel</div>
              </a>
            </li>
          </ul>
        </li>
      )}

      {adminRole !== "admin_master" && (
        <>
          <li
            onMouseEnter={() => setShowBranch(true)}
            onMouseLeave={() => setShowBranch(false)}
            className={`menu-item ${showBranch ? "open" : ""}`}
          >
            <a
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Branch">Branch</div>
              {/* {showBranch ? (
                    <MdOutlineKeyboardArrowUp
                      style={{ marginTop: "3px" }}
                      size={20}
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      style={{ marginTop: "3px" }}
                      size={20}
                    />
                  )} */}
            </a>

            <ul className="menu-sub">
              <li className="menu-item ">
                <a
                  onClick={() => handleNavigate("view-branch")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">View Branch</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => {
                    setShowAddBranch(true);
                    setShowBranch(false);
                  }}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Add Branch">Add Branch</div>
                </a>
              </li>

              {adminRole === AdminRole.hyper_master &&
                adminRole !== AdminRole.super_master && (
                  <>
                    <li className="menu-item">
                      <a
                        onClick={() => handleNavigate("view-super-branch")}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-institution"></i>
                        <div data-i18n="Add Branch">View Super Branch</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a
                        onClick={() => {
                          setShowAddSuperBranch(true);
                          setShowBranch(false);
                        }}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-institution"></i>
                        <div data-i18n="Add Branch">Add Super Branch</div>
                      </a>
                    </li>
                  </>
                )}
            </ul>
          </li>
          <li
            onMouseEnter={() => setShowClients(true)}
            onMouseLeave={() => setShowClients(false)}
            className={`menu-item ${showClients ? "open" : ""}`}
          >
            <a
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Branch">Clients</div>
              {/* {showBranch ? (
                    <MdOutlineKeyboardArrowUp
                      style={{ marginTop: "3px" }}
                      size={20}
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      style={{ marginTop: "3px" }}
                      size={20}
                    />
                  )} */}
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("view-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="View Clients">View Clients</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("clients-with-balance")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Clients with balance</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("all-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">All Clients</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("active-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Active Clients</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("inactive-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Inactive Clients</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("suspended-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Suspended Clients</div>
                </a>
              </li>
            </ul>
          </li>
          {adminRole !== AdminRole.super_master && (
            <li
              onMouseEnter={() => setShowSettings(true)}
              onMouseLeave={() => setShowSettings(false)}
              className={`menu-item ${showSettings ? "open" : ""}`}
            >
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="menu-link menu-toggle"
              >
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Settings">Settings</div>
                {/* {showSettings ? (
                  <MdOutlineKeyboardArrowUp
                    style={{ marginTop: "3px" }}
                    size={20}
                  />
                ) : (
                  <MdOutlineKeyboardArrowDown
                    style={{ marginTop: "3px" }}
                    size={20}
                  />
                )} */}
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("view-banner")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="View Banners">View Banners</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("add-banner")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Banner">Add Banner</div>
                  </a>
                </li>
                {adminRole === AdminRole.hyper_master && (
                  <li className="menu-item">
                    <a
                      onClick={() => handleNavigate("add-login-banner")}
                      className="menu-link"
                    >
                      <i className="menu-icon tf-icons bx bxs-institution"></i>
                      <div data-i18n="Add Banner">Add Login Banner</div>
                    </a>
                  </li>
                )}

                <li className="menu-item">
                  <a
                    onClick={() => {
                      setShowSocialLink(true);
                      setShowSettings(false);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">Social Links</div>
                  </a>
                </li>
                {/* <li className="menu-item">
                  <a
                    onClick={() => {
                      setSiteNotification(true);
                      setShowSettings(false);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">Site Notification</div>
                  </a>
                </li> */}
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                  onMouseEnter={() => setSiteNotification(true)}
                  onMouseLeave={() => setSiteNotification(false)}
                  className="menu-link menu-toggle"
                >
                  <i className="menu-icon tf-icons bx bx-layout"></i>
                  <div data-i18n="Settings">Site Notification</div>
                  <ul
                    className="menu-sub"
                    style={{
                      display: siteNotification ? "block" : "none",
                      right: "100%",
                      top: "0px",
                      left: "-100%",
                      zIndex: "99999",
                      background: "#273143",
                    }}
                  >
                    <li className="menu-item">
                      <a
                        onClick={() => handleNavigate("view-notification")}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-institution"></i>
                        <div data-i18n="View Banners">View Notification</div>
                      </a>
                    </li>

                    <li className="menu-item">
                      <a
                        onClick={() => handleNavigate("add-notification")}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-institution"></i>
                        <div data-i18n="View Banners">Add Notification</div>
                      </a>
                    </li>
                  </ul>
                </a>
                {adminRole !== "admin_master" &&
                  adminRole !== AdminRole.super_master && (
                    <a
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                      onMouseEnter={() => setShowBonus(true)}
                      onMouseLeave={() => setShowBonus(false)}
                      className="menu-link menu-toggle"
                    >
                      <i className="menu-icon tf-icons bx bx-layout"></i>
                      <div data-i18n="Settings">Bonus</div>
                      <ul
                        className="menu-sub"
                        style={{
                          display: showBonus ? "block" : "none",
                          right: "100%",
                          top: "0px",
                          left: "-100%",
                          zIndex: "99999",
                          background: "#273143",
                        }}
                      >
                        <li className="menu-item">
                          <a
                            onClick={() => handleNavigate("view-bonus")}
                            className="menu-link"
                          >
                            <i className="menu-icon tf-icons bx bxs-institution"></i>
                            <div data-i18n="Pending Withdraw">View Bonus</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            onClick={() => handleNavigate("add-bonus")}
                            className="menu-link"
                          >
                            <i className="menu-icon tf-icons bx bxs-institution"></i>
                            <div data-i18n="Pending Withdraw">Add Bonus</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            onClick={() => handleNavigate("pending-bonus")}
                            className="menu-link"
                          >
                            <i className="menu-icon tf-icons bx bxs-institution"></i>
                            <div data-i18n="Pending Withdraw">
                              Pending Bonus
                            </div>
                          </a>
                        </li>

                        <li className="menu-item">
                          <a
                            onClick={() => handleNavigate("completed-bonus")}
                            className="menu-link"
                          >
                            <i className="menu-icon tf-icons bx bxs-institution"></i>
                            <div data-i18n="Completed Withdraw">
                              Completed Bonus
                            </div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            onClick={() => handleNavigate("rejected-bonus")}
                            className="menu-link"
                          >
                            <i className="menu-icon tf-icons bx bxs-institution"></i>
                            <div data-i18n="Rejected Withdraw">
                              Rejected Bonus
                            </div>
                          </a>
                        </li>
                      </ul>
                    </a>
                  )}
              </ul>
            </li>
          )}
        </>
      )}

      <li
        onMouseEnter={() => setShowExposure(true)}
        onMouseLeave={() => setShowExposure(false)}
        className={`menu-item ${showExposure ? "open" : ""}`}
      >
        <a
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Exposure</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("market-analysis")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Market Analysis</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("current-bets")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Current Bets</div>
            </a>
          </li>
        </ul>
      </li>
      <li
        onMouseEnter={() => setShowReport(true)}
        onMouseLeave={() => setShowReport(false)}
        className={`menu-item ${showReport ? "open" : ""}`}
      >
        <a
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Report</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("client-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Client Report</div>
            </a>
          </li>
          {/* <li className="menu-item">
            <a
              onClick={() => handleNavigate("deposit-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Deposit Report</div>
            </a>
          </li> */}

          <a
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
            onMouseEnter={() => setDepositReport(true)}
            onMouseLeave={() => setDepositReport(false)}
            className="menu-link menu-toggle"
          >
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Settings">Deposit Report</div>
            <ul
              className="menu-sub"
              style={{
                display: depositReport ? "block" : "none",
                right: "100%",
                top: "0px",
                left: "-100%",
                zIndex: "99999",
                background: "#273143",
              }}
            >
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("deposit-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">Deposit Report</div>
                </a>
              </li>

              {adminRole === AdminRole.hyper_master && (
                <>
                  <li className="menu-item">
                    <a
                      onClick={() => handleNavigate("1st-deposit-report")}
                      className="menu-link"
                    >
                      <i className="menu-icon tf-icons bx bxs-institution"></i>
                      <div data-i18n="View Banners">1st Deposit Report</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      onClick={() => handleNavigate("last-deposit-report")}
                      className="menu-link"
                    >
                      <i className="menu-icon tf-icons bx bxs-institution"></i>
                      <div data-i18n="View Banners">Last Deposit Report</div>
                    </a>
                  </li>
                  {/* <li className="menu-item">
                    <a
                      onClick={() => handleNavigate("2nd-deposit-report")}
                      className="menu-link"
                    >
                      <i className="menu-icon tf-icons bx bxs-institution"></i>
                      <div data-i18n="View Banners">2nd Deposit Report</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      onClick={() => handleNavigate("3rd-deposit-report")}
                      className="menu-link"
                    >
                      <i className="menu-icon tf-icons bx bxs-institution"></i>
                      <div data-i18n="View Banners">3rd Deposit Report</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      onClick={() => handleNavigate("4th-deposit-report")}
                      className="menu-link"
                    >
                      <i className="menu-icon tf-icons bx bxs-institution"></i>
                      <div data-i18n="View Banners">4th Deposit Report</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      onClick={() => handleNavigate("5th-deposit-report")}
                      className="menu-link"
                    >
                      <i className="menu-icon tf-icons bx bxs-institution"></i>
                      <div data-i18n="View Banners">5th Deposit Report</div>
                    </a>
                  </li> */}
                </>
              )}

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("no-deposit-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">No Deposit Report</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() =>
                    handleNavigate("no-deposit-report-last-15-days")
                  }
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">No deposit last 15 days</div>
                </a>
              </li>
            </ul>
          </a>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("withdraw-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Withdraw Report</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("transfer-statement")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Transfer Statement</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("client-branch-change-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Client Branch Change Report</div>
            </a>
          </li>
        </ul>
      </li>
      <li
        onMouseEnter={() => setShowDeposit(true)}
        onMouseLeave={() => setShowDeposit(false)}
        className={`menu-item ${showDeposit ? "open" : ""}`}
      >
        <a className="menu-link menu-toggle">
          <div data-i18n="Deposit">Deposit</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("pending-deposit")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Deposit">Pending Deposit</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("completed-deposit")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Deposit">Completed Deposit</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("rejected-deposit")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Rejected Deposit">Rejected Deposit</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("utr-search")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Rejected Deposit"> UTR Search</div>
            </a>
          </li>
        </ul>
      </li>
      <li
        onMouseEnter={() => setShowWithdraw(true)}
        onMouseLeave={() => setShowWithdraw(false)}
        className={`menu-item ${showWithdraw ? "open" : ""}`}
      >
        <a className="menu-link menu-toggle">
          <div data-i18n="Withdraw">Withdraw</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("pending-withdraw")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Withdraw">Pending Withdraw</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("completed-withdraw")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Withdraw">Completed Withdraw</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("rejected-withdraw")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Rejected Withdraw">Rejected Withdraw</div>
            </a>
          </li>
        </ul>
      </li>
      <li
        onMouseEnter={() => setShowComplaints(true)}
        onMouseLeave={() => setShowComplaints(false)}
        className={`menu-item ${showComplaints ? "open" : ""}`}
      >
        <a className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-layout"></i>

          <div data-i18n="Withdraw">Complaints</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("pending-complaints")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Withdraw">Pending Complaints</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("resolved-complaints")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Withdraw">Resolved Complaints</div>
            </a>
          </li>
        </ul>
      </li>
      {adminRole !== "admin_master" && adminRole !== AdminRole.super_master && (
        <>
          <li
            onMouseEnter={() => setShowStaff(true)}
            onMouseLeave={() => setShowStaff(false)}
            className={`menu-item ${showStaff ? "open" : ""}`}
          >
            <a className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-layout"></i>

              <div data-i18n="Withdraw">Staff</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("view-checker")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">View Staff</div>
                </a>
              </li>
              <li className="menu-item">
                <a onClick={() => setAddChecker(true)} className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Add Staff</div>
                </a>
              </li>
            </ul>
          </li>
        </>
      )}
    </ul>
  );
};

export default HyperMaster;
