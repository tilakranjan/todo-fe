import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';
import useStyles from '../styles/AppStyles';

function Header() {
  const authy = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <h1>
          hello<span>ToDo</span>
        </h1>
        <h2>{authy ? <p>Hello {authy.attributes.email}!</p> : <p>Login to try this awesome app.</p>}</h2>
      </header>
    </div>
  );
}

export default Header;