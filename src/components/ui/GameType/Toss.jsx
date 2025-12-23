const Toss = () => {
  return (
    <div className="bet-table">
      <div className="bet-table-header">
        <div
          data-toggle="collapse"
          data-target="#market1"
          aria-expanded="true"
          className="nation-name"
        >
          <span title="Bookmaker">
            <a title=""></a>TOSS
          </span>
        </div>
        <div className="float-right">
          <a className="btn btn-back">User Book</a>
        </div>
      </div>
      <div id="market1" data-title="" className="bet-table-body collapse show">
        <div className="bet-table-row bet-table-row-top">
          <div className="text-right nation-name">
            <span className="max-bet">
              Max:<span>500k</span>
            </span>
          </div>
          <div className="back bl-title d-none-mobile">Back</div>
          <div className="lay bl-title d-none-mobile">Lay</div>
        </div>
        <div className="bet-table-mobile-row d-none-desktop">
          <div className="bet-table-mobile-team-name">
            <span>Chennai Super Kings</span>
            <p className="mb-0 float-left" style={{ color: "red" }}>
              -98
            </p>
            <span className="d-none">0</span>
          </div>
        </div>
        <div data-title="SUSPENDED" className="bet-table-row">
          <div className="nation-name d-none-mobile">
            <p>Chennai Super Kings</p>
            <p className="mb-0 float-left" style={{ color: "red" }}>
              -98
            </p>
            <p className="mb-0 float-right d-none">0</p>
          </div>
          <div className="bl-box back2">
            <span className="d-block odds"> -</span>
            <span className="d-block"> -</span>
          </div>
          <div className="bl-box back1">
            <span className="d-block odds"> -</span>
            <span className="d-block"> -</span>
          </div>
          <div className="bl-box back">
            <span className="d-block odds"> 98</span>
            <span className="d-block"> 500k</span>
          </div>
          <div className="bl-box lay">
            <span className="d-block odds">-</span>
          </div>
          <div className="bl-box lay1">
            <span className="d-block odds">-</span>
          </div>
          <div className="bl-box lay2">
            <span className="d-block odds">-</span>
          </div>
        </div>
        <div className="bet-table-mobile-row d-none-desktop">
          <div className="bet-table-mobile-team-name">
            <span>Royal Challengers Bangalore</span>
            <p className="mb-0 float-left" style={{ color: "green" }}>
              100
            </p>
            <span className="d-none">0</span>
          </div>
        </div>
        <div data-title="SUSPENDED" className="bet-table-row">
          <div className="nation-name d-none-mobile">
            <p>Royal Challengers Bangalore</p>
            <p className="mb-0 float-left" style={{ color: "green" }}>
              100
            </p>
            <p className="mb-0 float-right d-none">0</p>
          </div>
          <div className="bl-box back2">
            <span className="d-block odds"> -</span>
            <span className="d-block"> -</span>
          </div>
          <div className="bl-box back1">
            <span className="d-block odds"> -</span>
            <span className="d-block"> -</span>
          </div>
          <div className="bl-box back">
            <span className="d-block odds"> 98</span>
            <span className="d-block"> 500k</span>
          </div>
          <div className="bl-box lay">
            <span className="d-block odds">-</span>
          </div>
          <div className="bl-box lay1">
            <span className="d-block odds">-</span>
          </div>
          <div className="bl-box lay2">
            <span className="d-block odds">-</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toss;
