import Exposure from "./Exposure";

const Normal = ({ normal, exposer }) => {
  return (
    <div className="market-6">
      <div className="bet-table">
        <div className="bet-table-header">
          <div
            data-toggle="collapse"
            data-target="#market2"
            aria-expanded="true"
            className="nation-name"
          >
            <span title="Normal">
              {" "}
              {normal?.[0]?.btype == "FANCY" ? "FANCY" : normal?.[0]?.name}
            </span>
          </div>
          <div className="float-right"></div>
        </div>
        <div
          id="market2"
          data-title="OPEN"
          className="bet-table-body collapse show"
        >
          <div className="bet-table-row">
            <div className="text-right nation-name"></div>
            <div className="lay bl-title d-none-mobile">No</div>
            <div className="back bl-title d-none-mobile">Yes</div>
          </div>
          {normal?.map((games) => {
            const pnl = exposer?.filter((pnl) => pnl?.MarketId === games?.id);
            return (
              <div key={games?.id} className="fancy-tripple">
                <div className="bet-table-mobile-row d-none-desktop">
                  <div className="bet-table-mobile-team-name">
                    <span> {games?.name}</span>
                    <Exposure pnl={pnl} />
                  </div>
                </div>
                <div className="bet-table-row" data-title="ACTIVATE">
                  <div className="nation-name d-none-mobile">
                    <p> {games?.name}</p>
                    <Exposure pnl={pnl} />
                  </div>
                  <div className="bl-box lay">
                    <span className="d-block odds">
                      {" "}
                      {games?.runners?.[0]?.lay[0]?.line}
                    </span>
                    <span className="d-block">
                      {" "}
                      {games?.runners?.[0]?.lay[0]?.price}
                    </span>
                  </div>
                  <div className="bl-box back">
                    <span className="d-block odds">
                      {" "}
                      {games?.runners?.[0]?.back[0]?.line}
                    </span>
                    <span className="d-block">
                      {" "}
                      {games?.runners?.[0]?.back[0]?.price}
                    </span>
                  </div>
                  <div className="fancy-min-max">
                    Min:<span>100</span> Max:
                    <span>{normal[0]?.maxLiabilityPerBet}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Normal;
