import { createContext, useEffect, useState } from "react";
import { API, Settings } from "../api";
import { getSetApis } from "../api/config";
export const StateContext = createContext(null);
import notice from "../../notice.json";
const StateProvider = ({ children }) => {
  /* Global state this states we are using in full project */
  const [token, setToken] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [getToken, setGetToken] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [site, setSite] = useState("");
  const [logo, setLogo] = useState("");
  const [icon, setIcon] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [showAddSuperBranch, setShowAddSuperBranch] = useState(false);
  const [showSocialLink, setShowSocialLink] = useState(false);
  const [addPaymentGateway, setAddPaymentGateway] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [downLineId, setDownLineId] = useState("");
  /* Master state */

  const [clientData, setClientData] = useState([]);
  const [showEditPayment, setShowEditPayment] = useState(false);
  const [clientId, setClientId] = useState("");
  const [showCreditRef, setShowCreditRef] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [refetchViewClient, setRefetchViewClient] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [siteNotification, setSiteNotification] = useState(false);
  const [noticeLoaded, setNoticeLoaded] = useState(false);
  const [directDeposit, setDirectDeposit] = useState(false);
  const [showAddChecker, setAddChecker] = useState(false);
  const [payloadRole, setPayloadRole] = useState("");
  const [addWhiteLabel, setAddWhiteLabel] = useState(false);
  const [id, setId] = useState("");
  const baseUrl = notice?.result?.settings?.baseUrl;
  useEffect(() => {
    getSetApis(setNoticeLoaded, baseUrl);
  }, [noticeLoaded, baseUrl]);

  /* Get token from locale storage */
  useEffect(() => {
    if (noticeLoaded) {
      const getToken = localStorage.getItem("adminToken");
      const adminName = localStorage.getItem("adminName");
      const adminRole = localStorage.getItem("adminRole");
      const adminSite = localStorage.getItem("adminSite");
      const readOnly = localStorage.getItem("readOnly");
      if (getToken) {
        setReadOnly(readOnly == "true" ? true : false);
        setToken(getToken);
        setAdminName(adminName);
        setAdminRole(adminRole);
        setSite(adminSite);
        setTokenLoading(false);
      } else {
        setTokenLoading(true);
      }
    }
  }, [getToken, token, noticeLoaded]);

  useEffect(() => {
    if (noticeLoaded) {
      /* Dynamically get  footer logo  */
      const icon = `${API.assets}/${Settings.siteUrl}/nav-sprite.svg`;
      setIcon(icon);

      /* Dynamically append  theme css  */
      // const link = document.createElement("link");
      // link.rel = "stylesheet";
      // link.type = "text/css";
      // link.href = `${API.assets}/${Settings.siteUrl}/theme.css`;
      // document.head.appendChild(link);
      /*Dynamically append Logo */
      const logo = `${API.assets}/${Settings.siteUrl}/logo.png`;
      setLogo(logo);
      /* Dynamically append  favicon  */
      const FavIconLink = document.createElement("link");
      FavIconLink.rel = "icon";
      FavIconLink.type = "image/png";
      FavIconLink.href = `${API.assets}/${Settings.siteUrl}/favicon.png`;
      document.head.appendChild(FavIconLink);
      /* Site title */
      document.title = Settings.siteTitle;
    }
  }, [noticeLoaded]);

  if (!noticeLoaded) {
    return;
  }
  const stateInfo = {
    token,
    setToken,
    getToken,
    setGetToken,
    tokenLoading,
    setTokenLoading,
    logo,
    setLogo,
    icon,
    setIcon,
    adminName,
    setAdminName,
    site,
    setSite,
    adminRole,
    setAdminRole,
    showSidebar,
    setShowSidebar,
    showAddBranch,
    setShowAddBranch,
    showSocialLink,
    setShowSocialLink,
    showDeposit,
    setShowDeposit,
    showWithdraw,
    setShowWithdraw,
    showChangePassword,
    setShowChangePassword,
    showChangeStatus,
    setShowChangeStatus,
    downLineId,
    setDownLineId,
    addPaymentGateway,
    setAddPaymentGateway,

    clientData,
    setClientData,
    showEditPayment,
    setShowEditPayment,
    clientId,
    setClientId,
    showCreditRef,
    setShowCreditRef,
    registrationStatus,
    setRegistrationStatus,
    refetchViewClient,
    setRefetchViewClient,
    readOnly,
    setReadOnly,
    siteNotification,
    setSiteNotification,
    directDeposit,
    setDirectDeposit,
    showAddChecker,
    setAddChecker,
    payloadRole,
    setPayloadRole,
    addWhiteLabel,
    setAddWhiteLabel,
    id,
    setId,
    showAddSuperBranch,
    setShowAddSuperBranch,
  };
  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
