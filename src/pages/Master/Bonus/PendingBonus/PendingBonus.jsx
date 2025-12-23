import Bonus from "../../../../components/ui/Master/Bonus";
import useGetAllBonus from "../../../../hooks/Master/Bonus/useGetAllBonus";

const PendingBonus = () => {
  const payload = {
    type: "viewBonusStatement",
    is_claimed: 2,
  };
  const { bonus, refetchBonus } = useGetAllBonus(payload, 30000);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Bonus data={bonus} title="Pending" refetchBonus={refetchBonus} />
    </div>
  );
};

export default PendingBonus;
