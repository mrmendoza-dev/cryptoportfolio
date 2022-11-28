import { useEffect, useState } from "react";
import "./css/App.css";
import "./css/Portfolio.css";

import styled from "styled-components";
import Footer from "./components/Nav/Footer";
import Header from "./components/Nav/Header";
import { defaultCryptoData, defaultGlobalData } from "./data/defaultData";

const Percent = styled.p<{ data: number }>`
  color: ${(props: any) =>
    props.data === 0
      ? "var(--clr-fontAccent)"
      : props.data > 0
      ? "var(--clr-gain)"
      : "var(--clr-loss)"};
`;

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [globalData, setGlobalData] = useState({
    active_cryptocurrencies: 0,
    markets: 0,
    market_cap_change_percentage_24h_usd: 0,
    total_market_cap: { usd: 0 },
    total_volume: { usd: 0 },
    market_cap_percentage: { btc: 0, eth: 0 },
  });
  const [hidden, setHidden] = useState(false);


  const [stats, setStats] = useState({
    total: 38332.67,
    percentChange: 48.25,
    amountChange: 12475.92,
    profit: { percent: 60.59, amount: 58935.36 },
    best: { percent: 0.97, amount: 36.06 },
    worst: { percent: 64.20, amount: 29082.71 },
  });








  
  const coingeckoUrl = "https://www.coingecko.com/en/coins/";
  const baseUrl = "https://api.coingecko.com/api/v3/";
  const currency = "usd";
  const order = "market_cap_desc";
  const pageNum = "1";
  const perPage = "100";
  const sparkline = "true";
  const pricePercentage = "1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";

  const cryptosUrl = `${baseUrl}coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${String(
    pageNum
  )}&sparkline=${sparkline}&price_change_percentage=${pricePercentage}`;
  const globalUrl = "https://api.coingecko.com/api/v3/global";

  function loadDefault() {
    setCryptos(defaultCryptoData);
    setGlobalData(defaultGlobalData.data);
  }
  function getCryptoData() {
    fetch(cryptosUrl)
      .then((res) => res.json())
      .then((data) => {
        setCryptos(data);
      });
    fetch(globalUrl)
      .then((res) => res.json())
      .then((data) => {
        setGlobalData(data.data);
      });
  }

  useEffect(() => {
    loadDefault();
    getCryptoData();
    calculateData();
  }, []);

  function hideBalance() {
    setHidden(prevState => !prevState);
  }


  function calculateData() {

  }


  return (
    <div className="App">
      <Header globalData={globalData} title={"CryptoPortfolio"} />

      <div className="Portfolio">
        <div className="portfolio-sidebar">
          <div className="sidebar-main">
            <div className="portfolio-block">
              <div className="block-img"></div>
              <div className="block-info">
                <p>
                  <strong>All Portfolios</strong>
                </p>
                <p>≈$38,402.70</p>
              </div>
            </div>
          </div>
          <div className="sidebar-portfolios">
            <div className="portfolio-block">
              <div className="block-img"></div>
              <div className="block-info">
                <p>
                  <strong>Main Portfolio</strong>
                </p>
                <p>≈$38,402.70</p>
              </div>
            </div>
          </div>
          <div className="sidebar-controls">
            <button className="btn btn-sidebar">
              <i className="fa-solid fa-circle-plus"></i>
              Create portfolio
            </button>
            <button className="btn btn-sidebar">
              <i className="fa-solid fa-circle-plus"></i> Manage portfolios
            </button>
          </div>
        </div>

        <div className="portfolio-main">
          <div className="portfolio-main-header">
            <div className="header-stats">
              <div className="header-balance">
                <p className="header-total">${stats.total}</p>
                <p className="header-percent">{stats.percentChange}%</p>
                <button className="btn-hide" onClick={hideBalance}>
                  {hidden ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
              <div className="header-change">
                <p className="change-amount">+ ${stats.amountChange}</p>
                <p className="change-timeframe">24h</p>
              </div>
            </div>
            <div className="header-controls">
              <button className="btn btn-more">
                <i className="fa-solid fa-ellipsis"></i>
                More
              </button>
              <button className="btn btn-add">
                <i className="fa-solid fa-circle-plus"></i>
                Add New
              </button>
            </div>
          </div>

          <div className="portfolio-main-chart"></div>

          <div className="portfolio-main-allocation">
            <div className="allocation-wrapper">
              <div className="allocation-bar">
                <div className="allocation-bar"></div>
              </div>
            </div>
          </div>

          <div className="portfolio-main-stats">
            <div className="portfolio-stat">
              <div className="portfolio-stat">
                <div className=""></div>
                <div className="">
                  <p>All Time Profit</p>
                  <p className="stat-value">
                    {stats.profit.percent}%(${stats.profit.amount})
                  </p>
                </div>
              </div>
            </div>
            <div className="portfolio-stat">
              <div className="block-img"></div>
              <div className="">
                <p>Best Performer</p>
                <p className="stat-value">
                  {stats.best.percent}%(${stats.best.amount})
                </p>
              </div>
            </div>
            <div className="portfolio-stat">
              <div className="block-img"></div>
              <div className="">
                <p>Worst Performer</p>
                <p className="stat-value">
                  {stats.worst.percent}%(${stats.worst.amount})
                </p>
              </div>
            </div>
          </div>

          <div className="portfolio-main-table">
            <p className="subheader">Your Assets</p>
            <table></table>
          </div>
        </div>
      </div>

      <Footer title={"CryptoPortfolio"} />
    </div>
  );
}

export default App;
