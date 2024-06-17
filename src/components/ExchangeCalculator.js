import React, { useState } from 'react';
import ParagonInput from './ParagonInput';
import DesiredParagonInput from './DesiredParagonInput';
import rarity from '../assets/rarity.json';
import '../App.css';

const exchangeRates = {
  "10/9": { "10/9": 1, "8/6": 2, "5/3": 4, "2/1": 6, "0.7/0.3": 8, "0.25": 10 },
  "8/6": { "10/9": 0.5, "8/6": 1, "5/3": 2, "2/1": 4, "0.7/0.3": 6, "0.25": 8 },
  "5/3": { "10/9": 0.25, "8/6": 0.5, "5/3": 1, "2/1": 2, "0.7/0.3": 4, "0.25": 6 },
  "2/1": { "10/9": 0.167, "8/6": 0.25, "5/3": 0.5, "2/1": 1, "0.7/0.3": 2, "0.25": 4 },
  "0.7/0.3": { "10/9": 0.125, "8/6": 0.167, "5/3": 0.25, "2/1": 0.5, "0.7/0.3": 1, "0.25": 2 },
  "0.25": { "10/9": 0.1, "8/6": 0.125, "5/3": 0.167, "2/1": 0.25, "0.7/0.3": 0.5, "0.25": 1 }
};

const calculateExchange = (paragons, desiredParagons, rarity, exchangeRates) => {
  // Calculer la valeur totale des paragons à échanger
  let totalValue = 0;
  paragons.forEach(paragon => {
    const paragonRarity = rarity[paragon.type];
    totalValue += paragon.quantity * exchangeRates[paragonRarity][paragonRarity];
  });

  // Calculer la valeur totale nécessaire pour obtenir les paragons souhaités
  let totalRequiredValue = 0;
  desiredParagons.forEach(p => {
    const desiredRarity = rarity[p.type];
    totalRequiredValue += exchangeRates[desiredRarity][desiredRarity];
  });

  // Vérifier si la valeur totale des paragons à échanger est insuffisante
  if (totalValue < totalRequiredValue) {
    return { exchangeResult: {}, error: true, errorMessage: 'Insufficient value. You need more paragons.' };
  }

  const exchangeResult = {};
  desiredParagons.forEach(p => {
    const desiredRarity = rarity[p.type];
    const requiredAmount = totalValue / exchangeRates[desiredRarity][desiredRarity];
    exchangeResult[p.type] = requiredAmount;
  });

  return { exchangeResult, error: false };
};

const ExchangeCalculator = () => {
  const [paragons, setParagons] = useState([{ type: '', quantity: 0 }]);
  const [desiredParagons, setDesiredParagons] = useState([{ type: '' }]);
  const [exchangeResults, setExchangeResults] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const paragonOptions = Object.keys(rarity).map(key => ({
    value: key,
    label: key
  }));

  const handleParagonChange = (index, field, value) => {
    const newParagons = [...paragons];
    newParagons[index][field] = value;
    setParagons(newParagons);
  };

  const handleAddParagon = () => {
    setParagons([...paragons, { type: '', quantity: 0 }]);
  };

  const handleRemoveParagon = (index) => {
    const newParagons = paragons.filter((_, i) => i !== index);
    setParagons(newParagons);
  };

  const handleDesiredParagonChange = (index, field, value) => {
    const newDesiredParagons = [...desiredParagons];
    newDesiredParagons[index][field] = value;
    setDesiredParagons(newDesiredParagons);
  };

  const handleAddDesiredParagon = () => {
    setDesiredParagons([...desiredParagons, { type: '' }]);
  };

  const handleRemoveDesiredParagon = (index) => {
    const newDesiredParagons = desiredParagons.filter((_, i) => i !== index);
    setDesiredParagons(newDesiredParagons);
  };

  const handleCalculateExchange = () => {
    const { exchangeResult, error, errorMessage } = calculateExchange(paragons, desiredParagons, rarity, exchangeRates);
    if (error) {
      setErrorMessage(errorMessage);
      setExchangeResults({});
    } else {
      setErrorMessage('');
      setExchangeResults(exchangeResult);
    }
  };

  return (
    <div className="container">
      <h2>Exchange Paragons</h2>
      <div className="exchange-container">
        <div className="paragon-column">
          <h3>Paragons to Trade</h3>
          <ParagonInput
            paragons={paragons}
            handleParagonChange={handleParagonChange}
            handleAddParagon={handleAddParagon}
            handleRemoveParagon={handleRemoveParagon}
            options={paragonOptions}
          />
        </div>
        <div className="paragon-column">
          <h3>Desired Paragons</h3>
          <DesiredParagonInput
            desiredParagons={desiredParagons}
            handleDesiredParagonChange={handleDesiredParagonChange}
            handleAddDesiredParagon={handleAddDesiredParagon}
            handleRemoveDesiredParagon={handleRemoveDesiredParagon}
            options={paragonOptions}
          />
        </div>
      </div>
      <button onClick={handleCalculateExchange}>Calculate Exchange</button>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      {Object.keys(exchangeResults).length > 0 && (
        <div className="results-container">
          <h3>Exchange Results</h3>
          <ul>
            {Object.entries(exchangeResults).map(([key, value]) => (
              <li key={key}>
                {key}: {value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExchangeCalculator;
