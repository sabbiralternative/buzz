import { defaultDate } from "../../utils/defaultDate";

const DefaultDateButton = ({
  setStartDate,
  setEndDate,
  lastThreeMonth = true,
  lastSixMonth = true,
  lastOneYear = true,
  lastTwoYear = false,
  lastThreeYear = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "10px",
        flexWrap: "wrap",
      }}
    >
      <button
        type="button"
        onClick={() => {
          setStartDate(new Date());
          setEndDate(new Date());
        }}
        className="btn btn-primary btn-xs"
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => {
          setStartDate(defaultDate(1));
          setEndDate(defaultDate(1));
        }}
        className="btn btn-primary btn-xs"
      >
        Yesterday
      </button>
      <button
        type="button"
        onClick={() => {
          setStartDate(defaultDate(7));
          setEndDate(new Date());
        }}
        className="btn btn-primary btn-xs"
      >
        This Week
      </button>
      <button
        type="button"
        onClick={() => {
          setStartDate(defaultDate(30));
          setEndDate(new Date());
        }}
        className="btn btn-primary btn-xs"
      >
        This Month
      </button>
      {lastThreeMonth && (
        <button
          type="button"
          onClick={() => {
            setStartDate(defaultDate(90));
            setEndDate(new Date());
          }}
          className="btn btn-primary btn-xs"
        >
          Last Three Month
        </button>
      )}
      {lastSixMonth && (
        <button
          type="button"
          onClick={() => {
            setStartDate(defaultDate(182));
            setEndDate(new Date());
          }}
          className="btn btn-primary btn-xs"
        >
          Last Six Month
        </button>
      )}
      {lastOneYear && (
        <button
          type="button"
          onClick={() => {
            setStartDate(defaultDate(365));
            setEndDate(new Date());
          }}
          className="btn btn-primary btn-xs"
        >
          Last One Year
        </button>
      )}
      {lastTwoYear && (
        <button
          type="button"
          onClick={() => {
            setStartDate(defaultDate(730));
            setEndDate(new Date());
          }}
          className="btn btn-primary btn-xs"
        >
          Last Two Year
        </button>
      )}
      {lastThreeYear && (
        <button
          type="button"
          onClick={() => {
            setStartDate(defaultDate(1095));
            setEndDate(new Date());
          }}
          className="btn btn-primary btn-xs"
        >
          Last Three Year
        </button>
      )}
    </div>
  );
};

export default DefaultDateButton;
