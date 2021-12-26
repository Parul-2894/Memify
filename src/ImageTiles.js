import React from 'react';

function ImageTiles(props) {
  return (
    <div
      style={{
        backgroundImage: `url(${props.imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        minHeight: '150px',
        minWidth: '100%',
        marginTop: '15px',
        border: '1px solid black',
      }}
      onClick={props.handleClick}
      url={props.imageUrl}
      id={props.id}
    ></div>
  );
}

export default ImageTiles;
