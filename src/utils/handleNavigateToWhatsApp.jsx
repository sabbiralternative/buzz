import { AdminRole } from "../constant/constant";

const handleNavigateToWhatsApp = (adminRole, number) => {
  if (adminRole === AdminRole.hyper_master && number) {
    window.open(`https://api.whatsapp.com/send?phone=91${number}`, "_blank");
  }
};

export default handleNavigateToWhatsApp;
