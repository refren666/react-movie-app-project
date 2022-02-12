import React from 'react';

const UserInfo = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div>
        <img style={{width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover'}}
                src={'https://www.pngitem.com/pimgs/m/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png'}
                alt=""/>
      </div>
      <p>Anonymous</p>
    </div>
  );
};

export default UserInfo;