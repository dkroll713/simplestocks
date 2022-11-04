import React, {useState, useEffect} from 'react';

const Header = (props) => {
  const [open, setOpen] = useState(false)

  const openTT = (e) => {
    setOpen(true);
  }

  const closeTT = (e) => {
    setOpen(false);
  }

  return (
    <>
    <div>
      <p
        className="heading"
        onMouseEnter={openTT}
        onMouseLeave={closeTT}>
          {props.title}
        </p>
        {
          open ? (
            <div className="tooltip">
              {props.desc}
            </div>
          )
          : null
        }
        </div>
    </>
  )
}

export default Header;