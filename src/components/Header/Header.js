import React from 'react';
import UserInfo from "../UserInfo/UserInfo";

const Header = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      columnGap: '50px'
      // justifyContent: 'space-between'
    }}>
      <div>
        <img src="../../images/logo2.png" alt="logo"/>
      </div>

      <form>
        <input type="text"/>
        <button>Search</button>
      </form>

      <UserInfo />

    </div>
  );
};

export default Header;