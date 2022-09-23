import React, {useState, useEffect} from 'react';

const StatementComponent = (props) => {
  const { description, content, definition } = props;
  const [tooltip, setTooltip]  = useState();



  return (
    <div className="statementComponent">
      <p>{definition.title} - {content}</p>
    </div>
  )
}

export default StatementComponent;

{/* <>
  {
    definition !== undefined
    ? <div className="statementComponent">
        <p>{description} - {content}</p>
      </div>
    : null
  }
</> */}