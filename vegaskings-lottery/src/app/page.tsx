'use client'
import customStyles from './../styles/custom.module.scss';
import { GameApi } from './../../service/GameApi';
import { useEffect, useState } from 'react';
import { XmlConvertor } from './../../utility/XmlConvertor'
import { StateProv } from '../../OOP/class/StateProv';
import { CountryState } from '../../OOP/class/CountryState';
import { Calendar } from '../../utility/Calendar';

export default function Home() {

  const gameApi = new GameApi();
  const calendar = new Calendar();
  const [gameListData, setGameListData] = useState<StateProv[]>([]);
  const [countryListData, setCountryListData] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [stateListData, setStateListData] = useState<CountryState[]>([]);

  function convertXMLGamesToJSON(games: string) {
    const xmlConvertor = new XmlConvertor();
    const data = xmlConvertor.getConvertToJSON(games)?.allgames?.StateProv.map((x: StateProv) => new StateProv(x));
    setGameListData(data);
    setCountryListData(Array.from(new Set(data.map((x: StateProv) => x?.country))));
    setStateListData(Array.from(new Set(data.map((x: StateProv) => new CountryState(x?.stateprov_name, x?.country)))));
  }

  function generateLotteryNumbers() {
    const lotteryWinningNumbers = [];
    for (let i = 0; i < 7; i++) {
      lotteryWinningNumbers.push(
        <div key={i} className={customStyles.winningNumbers}>
          {Math.floor(Math.random() * 20)}
        </div>
      );
    }
    return lotteryWinningNumbers;
  }

  function formatDate(date: string) {
    calendar.setDate(date);
    return calendar.getToday()
  };

  function formatCurrency(amount: any) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {


    const getGameData = async () => {

      try {

        if (await gameApi.getGames()) {

          convertXMLGamesToJSON(gameApi.getGamesXml());
        } else {

          //-->display error message
        }

      } catch (error) {

        console.error('Error fetching game data:', error);
      }

    };

    getGameData();

  }, []);

  return (
    <main>
      <section className={customStyles.form}>
        <select className={customStyles.select} onChange={(event) => setSelectedCountry(event.target.value)}>
          <option value="default" disabled>Select Country</option>
          {countryListData.map((itemMenu, index) =>

            <option key={index} value={itemMenu}>{itemMenu}</option>
          )}
        </select>
        <select className={customStyles.select} onChange={(event) => setSelectedState(event.target.value)} >
          <option value="default" disabled>Select State</option>
          {stateListData.filter(x => x.country == selectedCountry).map((itemMenu, index) =>
            <option key={index} value={itemMenu.state}>{itemMenu.state}</option>
          )}
        </select>
      </section>

      <section className={customStyles.boxContainer}>

        {gameListData.filter(z => z.country == selectedCountry && z.stateprov_name == selectedState).map((item) =>

        (item.game.map((gameItem, index) =>

          <article key={index} className={customStyles.box}>
            <div className={customStyles.boxHeader}>
              <img src='/images/game-id-101.png' />
            </div>
            <h5 className={customStyles.boxSubTitle}>Previous Winning Numbers:</h5>
            <div className={customStyles.winningNumberBox}>
              {generateLotteryNumbers()}
            </div>
            <div className={customStyles.boxJackpot}>
              <h4 className={customStyles.boxJackpotTitle}>Jackpot Amount</h4>
              <h3 className={customStyles.boxJackpotAmount}>{formatCurrency(gameItem.jackpot?.['#text'])}</h3>
            </div>
            <div className={customStyles.boxDetails}>
              <p className={customStyles.boxDetailsTitle}>Previous Draw Date</p>
              <p className={customStyles.boxDetailsDescription}>{formatDate(gameItem.lastdraw_date)}</p>
            </div>
            <div className={customStyles.boxDetails}>
              <p className={customStyles.boxDetailsTitle}>Next Draw Date</p>
              <p className={customStyles.boxDetailsDescription}>{formatDate(gameItem.nextdraw_date)}</p>
            </div>
            <a className={customStyles.boxPlayButton}>PLAY NOW</a>
          </article>
        )
        )
        )}

      </section>
    </main>
  );
}
