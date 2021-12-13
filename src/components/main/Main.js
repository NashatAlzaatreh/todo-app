import React, { Component } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ToDo from "../todo/Todo";
import { ThemeContext } from "../../context/Theme";

// const styles = {
//   dark: {
//     background: "#5C7080",
//   },
//   light: {
//     background: "#f5f5f5",
//   },
// };

export class Main extends Component {
  render() {
    return (
      <>
        {/* <Header /> */}

        <main>
          {/* <ThemeContext.Consumer>
            {(themeContext) => {
              return <h2>Current Mode {themeContext.mode}</h2>;
            }}
          </ThemeContext.Consumer>
          <button
            onClick={(themeContext) => {
              !themeContext.mode;
            }}
          >
            Change mode
          </button> */}
          <section>
            <ToDo />
          </section>
        </main>
        {/* <Footer /> */}
      </>
    );
  }
}

export default Main;
