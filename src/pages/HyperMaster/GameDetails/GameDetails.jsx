import { useParams } from "react-router-dom";
import MyBets from "./MyBets";
import { useEffect, useState } from "react";
import useGameDetails from "../../../hooks/useGameDetails";
import MatchOdds from "../../../components/ui/GameType/MatchOdds";
import Bookmaker from "../../../components/ui/GameType/Bookmaker";
import Normal from "../../../components/ui/GameType/Normal";
import useExposer from "../../../hooks/useExposer";
import useCurrentBets from "../../../hooks/useMyBets";
const GameDetails = () => {
  const { eventId, eventTypeId } = useParams();
  const { data } = useGameDetails(eventTypeId, eventId);
  const { exposer } = useExposer(eventId);
  const { myBets } = useCurrentBets(eventId);
  const [bookmarker, setBookmarker] = useState([]);
  // const [bookmarker2, setBookmarker2] = useState([]);
  const [normal, setNormal] = useState([]);
  // const [fancy1, setFancy1] = useState([]);
  // const [overByOver, setOverByOver] = useState([]);
  const [match_odds, setMatch_odds] = useState([]);

  let pnlBySelection;
  if (exposer?.pnlBySelection) {
    const obj = exposer?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  /* Filtered all the game  */
  useEffect(() => {
    const filterMatch_odds = data?.filter(
      (match_odd) =>
        match_odd.btype === "MATCH_ODDS" && match_odd?.name !== "tied match"
    );
    setMatch_odds(filterMatch_odds);

    const bookmarkerFilter = data?.filter(
      (bookmarker) => bookmarker.btype === "BOOKMAKER"
    );
    setBookmarker(bookmarkerFilter);

    // const filterBookmarker2 = data?.filter(
    //   (bookmarker2) => bookmarker2.btype === "BOOKMAKER2"
    // );
    // setBookmarker2(filterBookmarker2);

    const normalFilter = data?.filter(
      (normal) => normal.btype === "FANCY" && normal.tabGroupName === "Normal"
    );
    setNormal(normalFilter);

    // const fancy1Filter = data?.filter(
    //   (fancy1) => fancy1.btype === "ODDS" && fancy1.tabGroupName === "Fancy1"
    // );
    // setFancy1(fancy1Filter);

    // const overByOverFilter = data?.filter(
    //   (overByOver) =>
    //     overByOver.btype === "FANCY" &&
    //     overByOver.tabGroupName === "Over By Over"
    // );
    // setOverByOver(overByOverFilter);
  }, [data]);

  const tiedMatch = data?.filter(
    (game) => game.btype === "MATCH_ODDS" && game?.name === "tied match"
  );

  if (!data) {
    return;
  }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <div data-v-b00d14ae="">
                  <div data-v-b00d14ae="" className="detail-page-container">
                    <div className="center-main-container">
                      <div className="center-content">
                        <div className="game-header sport4">
                          <span className="game-header-name">
                            {data?.[0]?.eventName}
                          </span>
                          <span>
                            <span>{data?.[0]?.openDate}</span>
                          </span>
                        </div>
                        <div className="market-container">
                          <MatchOdds
                            match_odds={match_odds}
                            exposer={pnlBySelection}
                          />
                          <div className="market-4">
                            <Bookmaker
                              bookmarker={bookmarker}
                              exposer={pnlBySelection}
                            />
                            {/* <Toss /> */}
                          </div>
                          <Normal normal={normal} exposer={pnlBySelection} />
                          <MatchOdds
                            match_odds={tiedMatch}
                            exposer={pnlBySelection}
                          />
                        </div>
                      </div>
                      <div data-simplebar="init" className="right-sidebar">
                        <MyBets myBets={myBets} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
