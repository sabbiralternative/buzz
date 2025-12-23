import Exposure from "./Exposure";

const Bookmaker = ({ bookmarker, exposer }) => {
  return (
    <>
      {bookmarker?.map((games) => {
        return (
          <div key={games?.id} className="bet-table">
            <div className="bet-table-header">
              <div
                data-toggle="collapse"
                data-target="#market1"
                aria-expanded="true"
                className="nation-name"
              >
                <span title="Bookmaker">
                  <a title=""></a> {games?.name?.toUpperCase()}
                </span>
              </div>
              <div className="float-right">
                <a className="user-lock-book">User Book</a>
              </div>
            </div>
            <div
              id="market1"
              data-title=""
              className="bet-table-body collapse show"
            >
              <div className="bet-table-row bet-table-row-top">
                <div className="text-right nation-name">
                  <span className="max-bet">
                    Max:<span>{games?.maxLiabilityPerBet}</span>
                  </span>
                </div>
                <div className="back bl-title d-none-mobile">Back</div>
                <div className="lay bl-title d-none-mobile">Lay</div>
              </div>
              {games?.runners?.map((runner) => {
                const pnl = exposer?.filter(
                  (pnl) => pnl?.RunnerId === runner?.id
                );
                return (
                  <>
                    <div className="bet-table-mobile-row d-none-desktop">
                      <div className="bet-table-mobile-team-name">
                        <span>{runner?.name}</span>
                        <Exposure pnl={pnl} />
                        <span className="d-none">0</span>
                      </div>
                    </div>
                    <div data-title="SUSPENDED" className="bet-table-row">
                      <div className="nation-name d-none-mobile">
                        <p>{runner?.name}</p>
                        <Exposure pnl={pnl} />
                        <p className="mb-0 float-right d-none">0</p>
                      </div>
                      <div className="bl-box back back2">
                        <span className="d-block odds">
                          {runner?.back?.[2]?.price || "-"}
                        </span>
                        <span className="d-block">
                          {" "}
                          {runner?.back?.[2]?.size || "-"}
                        </span>
                      </div>
                      <div className="bl-box back back1">
                        <span className="d-block odds">
                          {" "}
                          {runner?.back?.[1]?.price || "-"}
                        </span>
                        <span className="d-block">
                          {runner?.back?.[1]?.size || "-"}
                        </span>
                      </div>
                      <div className="bl-box back back">
                        <span className="d-block odds">
                          {runner?.back?.[0]?.price || "-"}
                        </span>
                        <span className="d-block">
                          {runner?.back?.[0]?.size || "-"}
                        </span>
                      </div>
                      <div className="bl-box lay">
                        <span className="d-block odds">
                          {runner?.lay?.[0]?.price || "-"}
                        </span>
                        <span className="d-block">
                          {runner?.lay?.[0]?.size || "-"}
                        </span>
                      </div>
                      <div className="bl-box lay1">
                        <span className="d-block odds">
                          {runner?.lay?.[1]?.price || "-"}
                        </span>
                        <span className="d-block">
                          {runner?.lay?.[1]?.size || "-"}
                        </span>
                      </div>
                      <div className="bl-box lay2">
                        <span className="d-block odds">
                          {runner?.lay?.[2]?.price || "-"}
                        </span>
                        <span className="d-block">
                          {runner?.lay?.[2]?.size || "-"}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Bookmaker;
