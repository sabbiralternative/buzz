const Exposure = ({ pnl }) => {
  return (
    <>
      {pnl &&
        pnl?.map(({ pnl }, i) => {
          return (
            <p
              key={i}
              className={`mb-0 float-left ${
                pnl > 0 ? "text-success" : "text-danger"
              }`}
              style={{
                cursor: "pointer",
              }}
            >
              {pnl}
            </p>
          );
        })}
    </>
  );
};

export default Exposure;
