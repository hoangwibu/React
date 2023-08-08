import React, { Component, createContext } from 'react'

export const ThemeContext = createContext()

class ThemeContextProvider extends Component {
  state={
    theme: 'day'
  }
  changeTheme = () =>{
    const {theme} = this.state
    if (theme == 'day') {
        this.setState({theme:'night'})
    } else{
        this.setState({theme:'day'})
    }
  }
  render() {
    const ctx = {theme: this.state.theme, changeTheme: this.changeTheme}
    return (
      <ThemeContext.Provider value={ctx}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContextProvider