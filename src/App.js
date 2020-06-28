import React, { Component } from "react";
import { AuthProvider } from './contexts/auth.context';
import Header from './components/Header';

import Login from "./screens/login";
import Todo from "./screens/todo";

class AppRoute extends Component {
  render() {
    return (
      <AuthProvider>
        <Header/>
        <Todo/>
        <Login/>
      </AuthProvider>
    );
  }
}

export default AppRoute