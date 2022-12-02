import logo from "./logo.png";
import "./Nav.css";
import DarkMode from "./DarkMode";
import { Percent } from "../Percent";

export default function Header(props: any) {
  let globalData = props.globalData;
  const repoUrl = "https://github.com/mrmendoza171/cryptoportfolio";

  return (
    <div className="Nav">
      <div className="sub-header">
        <div className="header-crypto">
          <div className="header-stat">
            <p>Coins:</p>
            <a className="header-stat-link" href="/">
              {Number(globalData.active_cryptocurrencies).toLocaleString()}
            </a>
          </div>

          <div className="header-stat">
            <p>Exchanges:</p>
            <a className="header-stat-link" href="/">
              {Number(globalData.markets).toLocaleString()}
            </a>
          </div>

          <div className="header-stat">
            <p>Market Cap:</p>
            <a className="header-stat-link" href="/">
              <div className="market-change">
                <p>
                  $
                  {globalData.total_market_cap.usd.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>

                <Percent data={globalData.market_cap_change_percentage_24h_usd}>
                  {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
                  {globalData.market_cap_change_percentage_24h_usd > 0 ? (
                    <i className="fa-solid fa-caret-up"></i>
                  ) : (
                    <i className="fa-solid fa-caret-down"></i>
                  )}
                </Percent>
              </div>
            </a>
          </div>

          <div className="header-stat">
            <p>24h Vol:</p>
            <a className="header-stat-link" href="/">
              $
              {Number(globalData.total_volume.usd).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </a>
          </div>

          <div className="header-stat">
            <p>Dominance:</p>
            <a className="header-stat-link" href="/">
              <div className="flex">
                <p className="inline">
                  BTC {globalData.market_cap_percentage.btc.toFixed(1)}%
                </p>
                <p className="inline">
                  ETH {globalData.market_cap_percentage.eth.toFixed(1)}%
                </p>
              </div>
            </a>
          </div>
        </div>
        <div className="header-control">
          <select className="nav-select">
            <option>English</option>
          </select>
          <select className="nav-select">
            <option>USD</option>
          </select>
          <div className="nav-icons">
            <DarkMode />
            <a href={repoUrl} target="_blank">
              <i className="fa-brands fa-github nav-icon"></i>
            </a>
            <button className="nav-icon">
              <i className="fa-solid fa-bell"></i>
            </button>
            <button className="nav-icon">
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="header-links">
          <a className="header-title flex nav-link" href="/">
            <img src={logo} />
            <p>CryptoTracker</p>
          </a>
          <div className="nav-list">
            <div className="nav-item">
              <a
                className="nav-link"
                href="https://cryptotracker-mendoza.netlify.app/"
              >
                Cryptocurrencies
              </a>
            </div>
            <div className="nav-item">
              <a
                className="nav-link"
                href="https://cryptoportfolio-mendoza.netlify.app/"
              >
                Portfolio
              </a>
            </div>
            <div className="nav-item">
              <a
                className="nav-link"
                href="https://cryptonews-mendoza.netlify.app/"
              >
                News
              </a>
            </div>
            <div className="nav-item">
              <a className="nav-link" href="https://cryptowidgets.netlify.app/">
                Widgets
              </a>
            </div>
          </div>
        </div>

        <div className="nav-search">
          <label className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
          <input
            className="nav-search-input"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}
