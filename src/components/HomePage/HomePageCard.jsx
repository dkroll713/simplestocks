import React from 'react';

const HomePageCard = (props) => {
  const {stock} = props;
  console.log(props);
  return (
    <div className="card">
      {stock.ticker}
    </div>
  )
}

export default HomePageCard;