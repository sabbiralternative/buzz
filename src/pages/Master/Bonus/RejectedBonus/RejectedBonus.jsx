import Bonus from "../../../../components/ui/Master/Bonus";
import useGetAllBonus from "../../../../hooks/Master/Bonus/useGetAllBonus";

const RejectedBonus = () => {
  const payload = {
    type: "viewBonusStatement",
    is_claimed: 3,
  };
  const { bonus } = useGetAllBonus(payload, 30000);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Bonus data={bonus} title="Rejected" />
    </div>
  );
};

export default RejectedBonus;
