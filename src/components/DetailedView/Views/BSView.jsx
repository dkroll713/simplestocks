import React, {useState, useEffect} from 'react';

import StatementComponent from './StatementComponent.jsx';

const BSView = (props) => {
  const { financials, definitions } = props;

  console.log(financials)
  const descriptionArr = [];
  const contentArr = [];
  for (let key in financials) {
    descriptionArr.push(key);
    contentArr.push(financials[key]);
  }

  return (
    <div className="viewContainer">
      Balance sheet view:
      <div>
        {descriptionArr.map((description, x) => {
          let match = false;
          for (let y = 0; y < definitions.length; y++) {
            let curr = definitions[y]
            // match = false;
            if (curr.indicator === description) {
              match = true;
            }
            if (match) {
              return (
                <StatementComponent
                  description={description}
                  content={contentArr[x]}
                  definition={curr}
                />
              )
            }
          }
        })}
      </div>
    </div>
  )
}

export default BSView;