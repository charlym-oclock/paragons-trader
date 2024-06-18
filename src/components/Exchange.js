import React, { useState, useEffect } from 'react';
import ParagonInput from './ParagonInput';
import DesiredParagonInput from './DesiredParagonInput';
import rarity from '../assets/rarity.json';
import '../App.css';

export const emptyParagon = {
  type: '',
  quantity: 0
}

const paragonOptions = Object.keys(rarity).map(key => ({
  value: key,
  label: key
}));

const exchangeRates = {
    "10/9": { "10/9": 1, "8/6": 2, "5/3": 4, "2/1": 6, "0.7/0.3": 8, "0.25": 10 },
    "8/6": { "10/9": 0.5, "8/6": 1, "5/3": 2, "2/1": 4, "0.7/0.3": 6, "0.25": 8 },
    "5/3": { "10/9": 0.25, "8/6": 0.5, "5/3": 1, "2/1": 2, "0.7/0.3": 4, "0.25": 6 },
    "2/1": { "10/9": 0.167, "8/6": 0.25, "5/3": 0.5, "2/1": 1, "0.7/0.3": 2, "0.25": 4 },
    "0.7/0.3": { "10/9": 0.125, "8/6": 0.167, "5/3": 0.25, "2/1": 0.5, "0.7/0.3": 1, "0.25": 2 },
    "0.25": { "10/9": 0.1, "8/6": 0.125, "5/3": 0.167, "2/1": 0.25, "0.7/0.3": 0.5, "0.25": 1 }
  };

const calculateReceivedQuantity = (paragons, desiredType) => {
  const receivedQuantity = paragons.reduce((receivedQuantity, paragon) => {
      const paragonRarity = rarity[paragon.type];
      const desiredRarity = rarity[desiredType];

      if(!paragonRarity || !desiredRarity) {
        return receivedQuantity;
      }

      const exchangeRate = exchangeRates[desiredRarity][paragonRarity];

      return receivedQuantity += paragon.quantity * exchangeRate;
  }, 0);

  return receivedQuantity % 1 // Nombre à virgule ?
          ? receivedQuantity.toFixed(1) 
          : receivedQuantity;
}

const Exchange = props => {
  const [tradedParagons, setTradedParagons] = useState([
      emptyParagon
  ]);

  const [desiredParagon, setDesiredParagon] = useState(emptyParagon)

  // Met à jour la quantité reçue lors d'un changement dans le form
  useEffect(() => {
      if(!desiredParagon.type) {
          return
      }

      setDesiredParagon(desiredParagon => ({
          ...desiredParagon,
          quantity: calculateReceivedQuantity(tradedParagons, desiredParagon.type)
      }));
  }, [tradedParagons, desiredParagon.type]);


  const addTrade = () => {
      const newTrades = [...tradedParagons]

      newTrades.push(emptyParagon)

      setTradedParagons(newTrades)
  }

  const removeTrade = index => {
      if(tradedParagons.length === 1) {
        console.log('AYO', emptyParagon);
        setTradedParagons([emptyParagon]);

        return;
      }

      const newTrades = tradedParagons.filter((_, i) => i !== index);

      setTradedParagons(newTrades);
  }

  const updateTrade = (tradeIndex, field, value) => {
      const newTrades = [...tradedParagons];
      const trade = newTrades[tradeIndex];

      newTrades[tradeIndex] = {
          ...trade,
          [field]: value
      }

      setTradedParagons(newTrades)
  }

  const setDesiredType = type => {
      const newReceived = {...desiredParagon}

      newReceived.type = type

      setDesiredParagon(newReceived)
  }

  return (
      <div className="exchange-container">
          <div className="paragon-column">
              <h3>Paragons to Trade</h3>
              <ParagonInput
                  paragons={tradedParagons}
                  handleParagonChange={updateTrade}
                  handleAddParagon={addTrade}
                  handleRemoveParagon={removeTrade}
                  options={paragonOptions}
              />
          </div>
          <div className="desired-column">
              <h3>Desired Paragon</h3>
              <div className="desired-result-container">
                  <DesiredParagonInput
                      desiredParagon={desiredParagon}
                      handleDesiredParagonChange={(field, value) => {
                        if(field === 'type') {
                          setDesiredType(value)
                        }
                      }}
                      options={paragonOptions}
                  />
                  <div className="result-container">
                      <h4>{desiredParagon.quantity}</h4>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Exchange;