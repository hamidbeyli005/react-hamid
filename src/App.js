import "./App.css";
import React, { Component } from "react";
import Navbar from "./layout/Navbar";
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Contribute from "./pages/Contribute";
import Id from "./components/id"



class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar title="User app" />
        <hr />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/github" element={<Contribute />} />

          <Route exact path="/edit/:id" element={<Id />}  />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>






    );
  }
}

export default App;


