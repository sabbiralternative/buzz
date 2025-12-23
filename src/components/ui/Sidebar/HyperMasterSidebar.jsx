import { Link } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { useState } from "react";
import { AdminRole } from "../../../constant/constant";

const HyperMasterSidebar = () => {
  const [sidebarItem, setSidebarItem] = useState(null);

  const {
    setShowAddSuperBranch,
    setShowSidebar,
    setShowAddBranch,
    setShowSocialLink,
    setAddChecker,
    adminRole,
    setAddWhiteLabel,
  } = useContextState();

  const handleOpenSidebarItem = (item) => {
    if (sidebarItem === item) {
      setSidebarItem(null);
    } else {
      setSidebarItem(item);
    }
  };
  return (
    <ul className="menu-inner overflow-auto" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link
          onClick={() => setShowSidebar(false)}
          to="/"
          className="menu-link"
        >
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboard</div>
        </Link>
      </li>
      {adminRole === "admin_master" && (
        <li
          className={`menu-item ${sidebarItem === "whiteLabel" ? "open" : ""}`}
        >
          <a
            onClick={() => handleOpenSidebarItem("whiteLabel")}
            className="menu-link menu-toggle"
          >
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Branch">Whitelabel</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <Link
                onClick={() => setShowSidebar(false)}
                to="/view-whitelabel"
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Branches">View Whitelabel</div>
              </Link>
            </li>

            <li className="menu-item">
              <a
                onClick={() => {
                  setAddWhiteLabel(true);
                  setShowSidebar(false);
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
          {" "}
          <li className={`menu-item ${sidebarItem === "branch" ? "open" : ""}`}>
            <a
              onClick={() => handleOpenSidebarItem("branch")}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Branch">Branch</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/view-branch"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">View Branch</div>
                </Link>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => {
                    setShowAddBranch(true);
                    setShowSidebar(false);
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
                      <Link
                        onClick={() => setShowSidebar(false)}
                        to="/view-super-branch"
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-institution"></i>
                        <div data-i18n="View Branches">View Super Branch</div>
                      </Link>
                    </li>

                    <li className="menu-item">
                      <a
                        onClick={() => {
                          setShowAddSuperBranch(true);
                          setShowSidebar(false);
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
          <li className={`menu-item ${sidebarItem === "client" ? "open" : ""}`}>
            <a
              onClick={() => handleOpenSidebarItem("client")}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Branch">Clients</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/view-client"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">View Clients</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/clients-with-balance"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">Clients with balance</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/all-client"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">All Client</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/active-client"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">Active Client</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/inactive-client"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">Inactive Client</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  onClick={() => setShowSidebar(false)}
                  to="/suspended-client"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Branches">Suspended Client</div>
                </Link>
              </li>
            </ul>
          </li>
          {adminRole !== AdminRole.super_master && (
            <li
              className={`menu-item ${sidebarItem === "setting" ? "open" : ""}`}
            >
              <a
                onClick={() => handleOpenSidebarItem("setting")}
                className="menu-link menu-toggle"
              >
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Settings">Settings</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <Link
                    to="/view-banner"
                    onClick={() => setShowSidebar(false)}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="View Banners">View Banners</div>
                  </Link>
                </li>

                <li className="menu-item">
                  <Link
                    onClick={() => setShowSidebar(false)}
                    to="/add-banner"
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Banner">Add Banner</div>
                  </Link>
                </li>
                {adminRole === AdminRole.hyper_master && (
                  <li className="menu-item">
                    <Link
                      onClick={() => setShowSidebar(false)}
                      to="/add-login-banner"
                      className="menu-link"
                    >
                      <i className="menu-icon tf-icons bx bxs-institution"></i>
                      <div data-i18n="Add Banner">Add Login Banner</div>
                    </Link>
                  </li>
                )}

                <li className="menu-item">
                  <Link
                    to="/view-notification"
                    onClick={() => {
                      setShowSidebar(false);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">View Notifications</div>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link
                    to="/add-notification"
                    onClick={() => {
                      setShowSocialLink(true);
                      setShowSidebar(false);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">Add Notifications</div>
                  </Link>
                </li>
                {adminRole !== "admin_master" &&
                  adminRole !== AdminRole.super_master && (
                    <>
                      <li className="menu-item">
                        <Link
                          to="/view-bonus"
                          onClick={() => setShowSidebar(false)}
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="View Banners">View Bonus</div>
                        </Link>
                      </li>

                      <li className="menu-item">
                        <Link
                          onClick={() => setShowSidebar(false)}
                          to="/add-bonus"
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="Add Banner">Add Bonus</div>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          onClick={() => setShowSidebar(false)}
                          to="/pending-bonus"
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="Pending Withdraw">Pending Bonus</div>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          onClick={() => setShowSidebar(false)}
                          to="/completed-bonus"
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="Pending Withdraw">
                            Completed Bonus
                          </div>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          onClick={() => setShowSidebar(false)}
                          to="/rejected-bonus"
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="Pending Withdraw">Rejected Bonus</div>
                        </Link>
                      </li>
                    </>
                  )}

                {/* <li className="menu-item">
                  <a
                    onClick={() => {
                      setSiteNotification(true);
                      setShowSidebar(false);
                    }}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Social Links">Site Notification</div>
                  </a>
                </li> */}
              </ul>
            </li>
          )}
        </>
      )}

      <li className={`menu-item ${sidebarItem === "exposure" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("exposure")}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Exposure</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/market-analysis"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Market Analysis</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/current-bets"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Current Bets</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${sidebarItem === "report" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("report")}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Report</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/client-report"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Client Report</div>
            </Link>
          </li>

          {/* <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/deposit-report"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Deposit Report</div>
            </Link>
          </li> */}

          <li className="menu-item">
            <Link to="/deposit-report" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Withdraw">Deposit Report</div>
            </Link>
          </li>
          {adminRole === AdminRole.hyper_master && (
            <>
              <li className="menu-item">
                <Link to="/1st-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">1st Deposit Report</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/last-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">Last Deposit Report</div>
                </Link>
              </li>
              {/* <li className="menu-item">
                <Link to="/2nd-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">2nd Deposit Report</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/3rd-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">3rd Deposit Report</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/4th-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">4th Deposit Report</div>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/5th-deposit-report" className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">5th Deposit Report</div>
                </Link>
              </li> */}
            </>
          )}

          <li className="menu-item">
            <Link to="/no-deposit-report" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Withdraw">No Deposit Report</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/withdraw-report"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Withdraw Report</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${sidebarItem === "deposit" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("deposit")}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Deposit</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/pending-deposit"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Pending Deposit</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/completed-deposit"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Completed Deposit</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/rejected-deposit"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Rejected Deposit</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/utr-search"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">UTR Search</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${sidebarItem === "withdraw" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("withdraw")}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Withdraw</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/pending-withdraw"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Pending Withdraw</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/completed-withdraw"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Completed Withdraw</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/rejected-withdraw"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Banner">Rejected Withdraw</div>
            </Link>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${sidebarItem === "complaints" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("complaints")}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Settings">Complaints</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <Link
              to="/pending-complaints"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Pending Complaints</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to="/resolved-complaints"
              onClick={() => setShowSidebar(false)}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Banners">Resolved Complaints</div>
            </Link>
          </li>
        </ul>
      </li>
      {adminRole !== "admin_master" && adminRole !== AdminRole.super_master && (
        <>
          <li className={`menu-item ${sidebarItem === "staff" ? "open" : ""}`}>
            <a
              onClick={() => handleOpenSidebarItem("staff")}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Settings">Staff</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link
                  to="/view-checker"
                  onClick={() => setShowSidebar(false)}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">View Checker</div>
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  onClick={() => {
                    setShowSidebar(false);
                    setAddChecker(true);
                  }}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Add Banner">Add Checker</div>
                </Link>
              </li>
            </ul>
          </li>
        </>
      )}
    </ul>
  );
};

export default HyperMasterSidebar;
