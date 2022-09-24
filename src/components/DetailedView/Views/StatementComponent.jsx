import React, {useState, useEffect} from 'react';

const StatementComponent = (props) => {
  const { description, contents, definition } = props;
  const [tooltip, setTooltip]  = useState();



  return (
    <div className="statementComponent">
      <p>{definition.title} - {contents}</p>
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