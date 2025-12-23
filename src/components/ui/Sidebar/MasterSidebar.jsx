import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";

const MasterSidebar = () => {
  const [sidebarItem, setSidebarItem] = useState(null);
  const navigate = useNavigate();
  const { setShowSidebar } = useContextState();
  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowSidebar(false);
  };

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

      {/* {adminRole === AdminRole.punter && (
        <li
          className={`menu-item ${sidebarItem === "campaigns" ? "open" : ""}`}
        >
          <a
            onClick={() => handleOpenSidebarItem("campaigns")}
            className="menu-link menu-toggle"
          >
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Branch">Campaigns</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <Link
                onClick={() => setShowSidebar(false)}
                to="/view-campaigns"
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Branches">View Campaigns</div>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                onClick={() => setShowSidebar(false)}
                to="/add-campaign"
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Branches">Add Campaign</div>
              </Link>
            </li>
          </ul>
        </li>
      )} */}

      <li className={`menu-item ${sidebarItem === "client" ? "open" : ""}`}>
        <a
          onClick={() => handleOpenSidebarItem("client")}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Clients">Clients</div>
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

          {/* <li className="menu-item">
              <a
                onClick={() => handleNavigate("add-client")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-user"></i>
                <div data-i18n="Add Client">Add Client</div>
              </a>
            </li> */}
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
          {/* <li className="menu-item">
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
            </li> */}
        </ul>
      </li>

      {/* {adminRole === "punter" && (
        <li
          onClick={() => handleOpenSidebarItem("statement")}
          className={`menu-item ${sidebarItem === "statement" ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Statement">Statement</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <a className="menu-link">
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="All Statement">All Statement</div>
              </a>
            </li>

            <li className="menu-item">
              <a className="menu-link">
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Deposit Statement">Deposit Statement</div>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-link">
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Withdraw Statement">Withdraw Statement</div>
              </a>
            </li>
          </ul>
        </li>
      )}

      {adminRole === "punter" ||
      (adminRole === AdminRole.admin_staff && paymentPermission) ||
      (adminRole === "branch_staff" && paymentPermission) ? (
        <li
          onClick={() => handleOpenSidebarItem("payment")}
          className={`menu-item ${sidebarItem === "payment" ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Payments">Payments</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("view-payment-method")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Payment Method">View Payment Method</div>
              </a>
            </li>

            <li className="menu-item">
              <a
                onClick={() => handleNavigate("add-bank-account")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Payment Method">Add Bank Account</div>
              </a>
            </li>
            <li className="menu-item">
              <a onClick={() => handleNavigate("add-QR")} className="menu-link">
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Payment Method">Add QR</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("add-UPI")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Payment Method">Add UPI</div>
              </a>
            </li>
            {adminRole !== AdminRole.punter &&
              adminRole !== AdminRole.branch_staff && (
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("add-whatsapp-deposit")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Payment Method">
                      Add Whatsapp Deposit
                    </div>
                  </a>
                </li>
              )}

            <li className="menu-item">
              <a
                onClick={() => handleNavigate("add-USDT-TRC20")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Payment Method">Add USDT (TRC20)</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("add-USDT-BEP20")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Payment Method">Add USDT (BEP20)</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("add-upi-payment-gateway")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Payment Method">
                  Add UPI Payment Gateway
                </div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("add-toit-payment-gateway")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Payment Method">
                  Add TOIT Payment Gateway
                </div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("add-i100-payment-gateway")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Add Payment Method">
                  Add i100 Payment Gateway
                </div>
              </a>
            </li>
          
          
          </ul>
        </li>
      ) : null}

      {depositPermission && (
        <li
          onClick={() => handleOpenSidebarItem("deposit")}
          className={`menu-item ${sidebarItem === "deposit" ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-layout"></i>
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
                <div data-i18n="Rejected Deposit">UTR Search</div>
              </a>
            </li>
          </ul>
        </li>
      )}

      {withdrawPermission && (
        <li
          onClick={() => handleOpenSidebarItem("withdraw")}
          className={`menu-item ${sidebarItem === "withdraw" ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-layout"></i>
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
      )} */}

      {/* {adminRole === AdminRole.admin_staff && (
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
      )} */}

      {/* {adminRole === "punter" && (
        <>
          <li
            onClick={() => handleOpenSidebarItem("bonus")}
            className={`menu-item ${sidebarItem === "bonus" ? "open" : ""}`}
          >
            <a className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Withdraw">Bonus</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("pending-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Pending Bonus</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("completed-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Completed Bonus</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("rejected-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Rejected Bonus</div>
                </a>
              </li>
            </ul>
          </li>

          <li
            onClick={() => handleOpenSidebarItem("exposure")}
            className={`menu-item ${sidebarItem === "exposure" ? "open" : ""}`}
          >
            <a className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Withdraw">Exposure</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("market-analysis")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Market Analysis</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("current-bets")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">Current Bets</div>
                </a>
              </li>
            </ul>
          </li>
          <li
            onClick={() => handleOpenSidebarItem("staff")}
            className={`menu-item ${sidebarItem === "staff" ? "open" : ""}`}
          >
            <a className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Settings">Staff</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link
                  to="/view-staff"
                  onClick={() => setShowSidebar(false)}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">View Staff</div>
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
                  <div data-i18n="Add Banner">Add Staff</div>
                </Link>
              </li>
            </ul>
          </li>
        </>
      )} */}

      <li
        onClick={() => handleOpenSidebarItem("report")}
        className={`menu-item ${sidebarItem === "report" ? "open" : ""}`}
      >
        <a className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Withdraw">Report</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("client-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Pending Withdraw">Client Report</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("deposit-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Withdraw">Deposit Report</div>
            </a>
          </li>

          {/* <li className="menu-item">
              <a
                onClick={() => handleNavigate("1st-deposit-report")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Completed Withdraw">1st Deposit Report</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("last-deposit-report")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Completed Withdraw">Last Deposit Report</div>
              </a>
            </li> */}

          {/* <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("2nd-deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Completed Withdraw">2nd Deposit Report</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("3rd-deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Completed Withdraw">3rd Deposit Report</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("4th-deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Completed Withdraw">4th Deposit Report</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("5th-deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Completed Withdraw">5th Deposit Report</div>
                  </a>
                </li> */}
          {/* <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("no-deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Completed Withdraw">No Deposit Report</div>
                  </a>
                </li> */}

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("withdraw-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Withdraw">Withdraw Report</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("pnl-report")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Completed Withdraw">PNL Report</div>
            </a>
          </li>

          {/* {adminRole === AdminRole.admin_staff && (
              <Fragment>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("direct-deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Completed Withdraw">
                      Direct Deposit Report
                    </div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("direct-withdraw-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Completed Withdraw">
                      Direct Withdraw Report
                    </div>
                  </a>
                </li>
              </Fragment>
            )} */}

          {/* <li className="menu-item">
              <a
                onClick={() => handleNavigate("transfer-statement")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Completed Withdraw">Transfer Statement</div>
              </a>
            </li> */}
        </ul>
      </li>

      {/* {adminRole !== AdminRole.punter &&
        adminRole !== AdminRole.branch_staff && (
          <li
            onClick={() => handleOpenSidebarItem("setting")}
            className={`menu-item ${sidebarItem === "setting" ? "open" : ""}`}
          >
            <a className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Withdraw">Settings</div>
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
              <li className="menu-item">
                <a
                  onClick={() => {
                    setShowSocialLink(true);
                    setShowSidebar(false);
                  }}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Social Links</div>
                </a>
              </li>
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
              {adminRole === AdminRole.admin_staff && bonusPermission && (
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
                      <div data-i18n="Pending Withdraw">Completed Bonus</div>
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
            </ul>
          </li>
        )} */}
    </ul>
  );
};

export default MasterSidebar;
