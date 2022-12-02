import { useEffect, useState } from "react";
import "./css/App.css";
import "./css/Portfolio.css";
import { nanoid } from "nanoid";
import styled from "styled-components";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Nav/Footer";
import { defaultCryptoData, defaultGlobalData } from "./data/defaultData";
import appData from "./hooks/appData";


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
    total: 1235.67,
    percentChange: 48.25,
    amountChange: 12475.92,
    profit: { percent: 60.59, amount: 58935.36 },
    best: { percent: 0.97, amount: 36.06 },
    worst: { percent: 64.20, amount: 29082.71 },
  });



  const holdings: any = {
    bitcoin: 1,
    dogecoin: 100000,
    ethereum: 5,
    litecoin: 50,
    cardano: 10000,
  };


  function Private(props: any) {
    return (
      <div className="Private">
        {hidden ? (
          <div className="hidden-cover">
            <p>{props.element}</p>
            <div className="hidden-icon">
              <i className="fa-solid fa-eye-slash"></i>
            </div>
          </div>
        ) : (
          <div className="cover">{props.element}</div>
        )}
      </div>
    );
  }

  useEffect(()=> {
    setHidden(loadStorage());
  }, [])


    useEffect(()=> {
          localStorage.setItem("hidden", JSON.stringify(hidden));
    }, [hidden]);

    function loadStorage() {
      let data: any = JSON.parse(
        localStorage.getItem("hidden") || "false"
      );
      if (data != undefined) {
        return data;
      } else {
        localStorage.setItem("hidden", JSON.stringify(false));
        return false;
      }
    }

    // function hideBalance() {
    //   localStorage.setItem("darkMode", JSON.stringify(darkMode));
    //   // darkMode ? updateTheme(darkTheme) : updateTheme(lightTheme);
    // }


    
  function hideBalance() {
    setHidden((prevState) => !prevState);
  }


  function calculateStats() {

    let total = 0;
      Object.keys(holdings).map((held: any) => {
        let crypto: any = cryptos.find((x: any) => x.id === held);
        crypto
          ? (total += crypto.current_price * holdings[held])
          : (total += 0);
      });

      setStats(prevStats => { return {...prevStats, total: total}})

  }

  
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
  }, []);
  useEffect(()=> {
    calculateStats();
  }, [cryptos])

  useEffect(()=> {
      const interval = setInterval(()=> {
        getCryptoData();
      }, 10000)
      return () => clearInterval(interval);

  }, [])





  return (
    <div className="App">
      <Nav globalData={globalData} />

      <div className="Portfolio">
        <div className="portfolio-sidebar">
          <div className="sidebar-main">
            <div className="portfolio-block">
              <div className="block-img">
                <i className="fa-solid fa-wallet"></i>
              </div>
              <div className="block-info">
                <p>
                  <strong>All Portfolios</strong>
                </p>

                <Private
                  element={
                    <p>
                      ≈$
                      {stats.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  }
                ></Private>
              </div>
            </div>
          </div>
          <div className="sidebar-portfolios">
            <div className="portfolio-block">
              <div className="block-img">
                <i className="fa-solid fa-wallet"></i>
              </div>
              <div className="block-info">
                <p>
                  <strong>Main Portfolio</strong>
                </p>
                <Private
                  element={
                    <p>
                      ≈$
                      {stats.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  }
                ></Private>
              </div>
            </div>
          </div>
          <div className="sidebar-controls">
            <button className="btn btn-sidebar">
              <i className="fa-solid fa-circle-plus"></i>
              Create portfolio
            </button>
            <button className="btn btn-sidebar">
              <i className="fa-solid fa-folder-plus"></i> Manage portfolios
            </button>
          </div>
        </div>

        <div className="portfolio-main">
          <div className="portfolio-main-header">
            <div className="header-stats">
              <div className="header-balance">
                <Private
                  element={
                    <p className="header-total">
                      $
                      {stats.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  }
                ></Private>

                <p className="header-percent">
                  <i className="fa-solid fa-caret-up caret"></i>
                  {stats.percentChange}%
                </p>
                <button className="btn-hide" onClick={hideBalance}>
                  {hidden ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
              <div className="header-change">
                <div className="change-amount">
                  <Private
                    element={
                      <p className="">
                        + $
                        {stats.amountChange.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    }
                  ></Private>
                </div>

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
                  <div className="stat-value">
                    <Private
                      element={
                        <p className="">
                          <i className="fa-solid fa-caret-down caret"></i>
                          {stats.profit.percent}%($
                          {stats.profit.amount.toLocaleString()})
                        </p>
                      }
                    ></Private>
                  </div>
                </div>
              </div>
            </div>
            <div className="portfolio-stat">
              <div className="crypto-img"></div>
              <div className="">
                <p>Best Performer</p>
                <div className="stat-value">
                  <Private
                    element={
                      <p className="">
                        <i className="fa-solid fa-caret-down caret"></i>
                        {stats.best.percent}%($
                        {stats.best.amount.toLocaleString()})
                      </p>
                    }
                  ></Private>
                </div>
              </div>
            </div>
            <div className="portfolio-stat">
              <div className="crypto-img"></div>
              <div className="">
                <p>Worst Performer</p>
                <div className="stat-value">
                  <Private
                    element={
                      <p className="">
                        <i className="fa-solid fa-caret-down caret"></i>
                        {stats.worst.percent}%($
                        {stats.worst.amount.toLocaleString()})
                      </p>
                    }
                  ></Private>
                </div>
              </div>
            </div>
          </div>

          <div className="portfolio-main-table">
            <p className="subheader">Your Assets</p>
            <table className="portfolio-table">
              <thead>
                <tr className="table-head">
                  <th className="center">#</th>
                  <th className="left">Coin</th>
                  <th className="center">Price</th>
                  <th className="right">24h</th>
                  <th className="center">Holdings</th>
                  <th className="center">Avg. Buy Price</th>
                  <th className="center">Profit/Loss</th>
                  <th className="center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(holdings).map((held: any) => {
                  let crypto: any = cryptos.find((x: any) => x.id === held);

                  return (
                    <>
                      {crypto ? (
                        <tr key={nanoid()} className="crypto-row">
                          <td className="">
                            <p>{crypto.market_cap_rank}.</p>
                          </td>

                          <td>
                            <a
                              href={`${coingeckoUrl}${crypto.id}`}
                              target="_blank"
                              rel="noopener"
                            >
                              <div className="coin-data">
                                <img
                                  className="crypto-img"
                                  src={crypto.image}
                                />
                                <p className="crypto-name">{crypto.name}</p>
                                <p className="crypto-symbol">{crypto.symbol}</p>
                              </div>
                            </a>
                          </td>

                          <td>
                            <p className="right">
                              $
                              {crypto.current_price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </p>
                          </td>

                          <td>
                            <Percent
                              data={
                                crypto.price_change_percentage_24h_in_currency
                              }
                              className="right"
                            >
                              {Number(
                                crypto.price_change_percentage_24h_in_currency
                              ).toFixed(1)}
                              %
                            </Percent>
                          </td>

                          <td>
                            <div className="portolio-holdings right">
                              <Private
                                element={
                                  <div className="">
                                    <p className="">
                                      {(
                                        holdings[held] * crypto.current_price
                                      ).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                      })}
                                    </p>
                                    <p className="">
                                      {holdings[held]}{" "}
                                      {crypto.symbol.toUpperCase()}
                                    </p>
                                  </div>
                                }
                              ></Private>
                            </div>
                          </td>

                          <td>
                            <p className="right">
                              $
                              {crypto.current_price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </p>
                          </td>

                          <td>
                            <div className="portolio-pl right">
                              <Private
                                element={
                                  <div className="">
                                    <p className="">{stats.total}</p>
                                    <p className="">{stats.percentChange}</p>
                                  </div>
                                }
                              ></Private>
                            </div>
                          </td>

                          <td className="center">
                            <button className="btn-table">
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <button className="btn-table">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
