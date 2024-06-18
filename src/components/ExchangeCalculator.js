import React, { useState } from 'react';
import Exchange, { emptyParagon } from './Exchange';
import { handleId } from '../utils/functions';
import '../App.css';


const getId = handleId();

const ExchangeCalculator = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [exchangeIds, setExchangeIds] = useState([0]);


  const handleAddExchange = () => {
    setExchangeIds([...exchangeIds, getId()])
  }

  const handleRemoveExchange = targetId => {
    setExchangeIds(exchangeIds.filter(id => id  !== targetId))
  }

  return (
    <div className="container">
      <h2>Exchange Paragons</h2>

      {exchangeIds.map( id => (
        <React.Fragment key={id}>
          <Exchange key={id} />
          <button className='bigbluebutton' onClick={() => handleRemoveExchange(id)}>Remove Exchange</button>
        </React.Fragment>
      ))}

      <button className='bigbluebutton'  onClick={handleAddExchange}>Add Exchange Group</button>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ExchangeCalculator;
