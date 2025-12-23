import axios from "axios";
import { API, Settings } from "./index";

export const getSetApis = (setNoticeLoaded, baseUrl) => {
  const url = baseUrl ? `${baseUrl}/notice.json` : "/notice.json";

  axios
    .get(url)
    .then((res) => {
      const data = res.data;
      if (data?.result) {
        API.downineEditForm = data?.result?.endpoint?.downineEditForm;
        API.exportCSV = data?.result?.endpoint?.exportCSV;
        API.auth = data?.result?.endpoint?.auth;
        API.index = data?.result?.endpoint?.index;
        API.activityLogs = data?.result?.endpoint?.activityLogs;
        API.accessToken = data?.result?.endpoint?.accessToken;
        API.whitelabel = data?.result?.endpoint?.whitelabel;
        API.staff = data?.result?.endpoint?.staff;
        API.bonus = data?.result?.endpoint?.bonus;
        API.balance = data?.result?.endpoint?.balance;
        API.changePassword = data?.result?.endpoint?.changePassword;
        API.group = data?.result?.endpoint?.group;
        API.ladder = data?.result?.endpoint?.ladder;
        API.login = data?.result?.endpoint?.login;
        API.notification = data?.result?.endpoint?.notification;
        API.odds = data?.result?.endpoint?.odds;
        API.order = data?.result?.endpoint?.order;
        API.buttonValue = data?.result?.endpoint?.buttonValue;
        API.register = data?.result?.endpoint?.register;
        API.deposit = data?.result?.endpoint?.depositIframe;
        API.ourCasino = data?.result?.endpoint?.auraCasino;
        API.diamondCasino = data?.result?.endpoint?.diamondCasino;
        API.auraCasino = data?.result?.endpoint?.auraCasino;
        API.myMarket = data?.result?.endpoint?.myMarket;
        API.competition = data?.result?.endpoint?.competition;
        API.searchEvent = data?.result?.endpoint?.searchEvent;
        API.currentBets = data?.result?.endpoint?.currentBets;
        API.cache = data?.result?.endpoint?.cache;
        API.interval = data?.result?.settings?.interval;
        API.exposure = data?.result?.endpoint?.exposure;
        API.accountStatement = data?.result?.endpoint?.accountStatement;
        API.settledBets = data?.result?.endpoint?.settledBets;
        API.siteUrl = data?.result?.settings?.siteUrl;
        API.whatsApp = data?.result?.endpoint?.whatsapp;
        API.otp = data?.result?.endpoint?.otp;
        API.liveCasinoWolf = data?.result?.endpoint?.liveCasinoWolf;
        API.slotWolf = data?.result?.endpoint?.slotsWolf;
        API.liveCasinoIFrame = data?.result?.endpoint?.liveCasinoIframe;
        API.auraWolf = data?.result?.endpoint?.auraWolf;
        API.assets = data?.result?.endpoint?.assets;
        API.bonusClaim = data?.result?.endpoint?.bonusClaim;
        API.referralCode = data?.result?.endpoint?.referralCode;
        API.banner = data?.result?.endpoint?.banner;
        API.bankAccount = data?.result?.endpoint?.bankAccount;
        API.uploadScreenshot = data?.result?.endpoint?.uploadScreenshot;
        API.latestEvents = data?.result?.endpoint?.latestEvents;
        API.downLine = data?.result?.endpoint?.downline;
        API.downLineEditForm = data?.result?.endpoint?.downLineEditForm;
        API.downLineEdit = data?.result?.endpoint?.downLineEdit;
        API.createDownLine = data?.result?.endpoint?.createDownLine;
        API.checkUsername = data?.result?.endpoint?.checkUsername;
        API.searchUser = data?.result?.endpoint?.searchUser;
        API.UserHistory = data?.result?.endpoint?.userHistory;
        API.partyWinLoss = data?.result?.endpoint?.partyWinLoss;
        API.userAuthentication = data?.result?.endpoint?.userAuthentication;
        API.marketAnalysis = data?.result?.endpoint?.marketAnalysis;
        API.adminExposure = data?.result?.endpoint?.adminExposure;
        API.viewBranches = data?.result?.endpoint?.viewBranches;
        API.addBranch = data?.result?.endpoint?.addBranch;
        API.socialLinks = data?.result?.endpoint?.socialLink;
        API.viewClients = data?.result?.endpoint?.viewClients;
        API.registerPanel = data?.result?.endpoint?.registerPanel;
        API.payments = data?.result?.endpoint?.payments;
        API.depositClient = data?.result?.endpoint?.depositClient;
        API.detectUtr = data?.result?.endpoint?.detectUtr;
        API.utr = data?.result?.endpoint?.utr;
        API.withdraw = data?.result?.endpoint?.withdraw;
        API.statement = data?.result?.endpoint?.statement;
        API.addClient = data?.result?.endpoint?.addClient;
        API.otp = data?.result?.endpoint?.otp;
        API.campaign = data?.result?.endpoint?.campaign;
        API.pnl = data?.result?.endpoint?.pnl;

        API.export = data?.result?.endpoint?.export;
        API.transferStatement = data?.result?.endpoint?.transferStatement;
        API.loginReadOnly = data?.result?.endpoint?.loginReadOnly;
        API.complaint = data?.result?.endpoint?.complaint;
        Settings.bonus = data?.result?.settings?.bonus;
        Settings.deposit = data?.result?.settings?.deposit;
        Settings.withdraw = data?.result?.settings?.withdraw;
        Settings.register = data?.result?.settings?.registration;
        Settings.demoLogin = data?.result?.settings?.demoLogin;
        Settings.disabledDevtool = data?.result?.settings?.disabledDevtool;
        Settings.otp = data?.result?.settings?.otp;
        Settings.casinoCurrency = data?.result?.settings?.casinoCurrency;
        Settings.siteUrl = data?.result?.settings?.siteUrl;
        Settings.siteTitle = data?.result?.settings?.siteTitle;
        Settings.interval = data?.result?.settings?.interval;
        Settings.forceLogin = data?.result?.settings?.forceLogin;
        Settings.casinoType = data?.result?.settings?.casino;
        setNoticeLoaded(true);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
