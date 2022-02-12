import React from 'react';

const Trailer = ({video}) => {
  const {key, type} = video;

  return (
    type === 'Trailer' &&
    <div style={{textAlign: 'center'}}>
      <iframe style={{width: '800px', height: '450px'}} src={`https://www.youtube.com/embed/${key}`}
              frameBorder={'none'}
              title="video"
      >
      </iframe>
    </div>
  );
};

export default Trailer;