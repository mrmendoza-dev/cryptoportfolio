import { useEffect, useState } from "react";
import "./css/App.css";
import "./css/Portfolio.css";
import { nanoid } from "nanoid";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Nav/Footer";
import appData from "./hooks/appData";
import { Percent } from "./components/Percent";
import Private from "./components/Private"


function App() {
  const { cryptos, globalData } = appData();
  const [hidden, setHidden] = useState(loadStorage());
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

  const coingeckoUrl = "https://www.coingecko.com/en/coins/";

  
  useEffect(() => {
    localStorage.setItem("hidden", JSON.stringify(hidden));
  }, [hidden]);

  function loadStorage() {
    let data: any = JSON.parse(localStorage.getItem("hidden") || "false");
    if (data != undefined) {
      return data;
    } else {
      localStorage.setItem("hidden", JSON.stringify(false));
      return false;
    }
  }

  function hideBalance() {
    setHidden((prevState: any) => !prevState);
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
  
  useEffect(()=> {
    calculateStats();
  }, [cryptos])




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
                  hidden={hidden}
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
                  hidden={hidden}
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
                  hidden={hidden}
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
                    hidden={hidden}
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
                      hidden={hidden}
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
                    hidden={hidden}
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
                    hidden={hidden}
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
                                hidden={hidden}
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
                                hidden={hidden}
                                element={
                                  <div className="">
                                    <p className="">
                                      $
                                      {stats.total.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                      })}
                                    </p>
                                    <p className="">{stats.percentChange}</p>
                                  </div>
                                }
                              ></Private>
                            </div>
                          </td>

                          <td className="center">
                            <div className="action-btns">
                              <button className="btn-table">
                                <i className="fa-solid fa-plus"></i>
                              </button>
                              <button className="btn-table">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </button>
                            </div>
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
