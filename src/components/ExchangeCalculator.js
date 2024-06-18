import React, { useState } from "react";
import Exchange, { emptyParagon } from "./Exchange";
import { handleId } from "../utils/functions";
import "../App.css";

const emptyExchange = {
  tradedParagons: [emptyParagon],
  desiredParagon: emptyParagon,
};

const getId = handleId();

const getTypesTotal = (exchanges) =>
  exchanges.reduce(
    (acc, exchange) => {
      const desiredParagon = exchange.desiredParagon;

      if (!acc.desired[desiredParagon.type]) {
        acc.desired[desiredParagon.type] = 0;
      }

      acc.desired[desiredParagon.type] += Number(desiredParagon.quantity);

      for (const paragon of exchange.tradedParagons) {
        if (!acc.traded[paragon.type]) {
          acc.traded[paragon.type] = 0;
        }

        acc.traded[paragon.type] += Number(paragon.quantity);
      }

      return acc;
    },
    { traded: {}, desired: {} }
  );

const ExchangeCalculator = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [exchangesById, setExchangesById] = useState({
    0: { ...emptyExchange },
  });

  const handleAddExchange = () => {
    const newId = getId();

    const newExchangesById = {
      ...exchangesById,
      [newId]: { ...emptyExchange },
    };

    setExchangesById(newExchangesById);
  };

  const handleRemoveExchange = (targetId) => {
    const newExchangesById = {
      ...exchangesById,
    };

    delete newExchangesById[targetId];

    setExchangesById(newExchangesById);
  };

  const handleExchangeChange = (exchangeId) => (exchange) => {
    setExchangesById({
      ...exchangesById,
      [exchangeId]: exchange,
    });
  };

  const typesTotals = getTypesTotal(Object.values(exchangesById));

  const refresh = () => {
    window.location.reload();
  }

  return (
    <div className="container">
      <h1>Paragons Calculatosaurus</h1>
      <span className="thanks">®By Luinil & Bubu @1nGames, special mucho thanks : Knfcz avec un X</span>

      {Object.keys(exchangesById).map((id) => (
        <React.Fragment key={id}>
          <Exchange key={id} onChange={handleExchangeChange(id)} />
          <button
            className="bigbluebutton"
            onClick={() => handleRemoveExchange(id)}
          >
            Supprimer l'échange
          </button>
        </React.Fragment>
      ))}

      <button className="bigbluebutton" onClick={handleAddExchange}>
        Ajouter un échange
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="results-container">
        <div className="total-sent">
          <h3>Paragons à envoyer</h3>
          <ul>
            {Object.entries(typesTotals.traded).map(([type, quantity]) => {
              if (!type) {
                return;
              }
              return (
                <li key={type}>
                  {type}: {quantity}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="total-received">
          <h3>Paragons à recevoir</h3>
          <ul>
            {Object.entries(typesTotals.desired).map(([type, quantity]) => {
              if (!type) {
                return;
              }
              return (
                <li key={type}>
                  {type}: {quantity}
                </li>
              );
            })}
          </ul>
        </div>
        <button className='bigbluebutton' onClick={refresh}>Réinitialiser</button>
      </div>
    </div>
  );
};

export default ExchangeCalculator;
