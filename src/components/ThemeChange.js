import React, { Component } from 'react'
import { ThemeContext } from '../context/ThemeContextProvider'

export class ThemeChange extends Component {
    static contextType = ThemeContext
  render() {
    console.log('Thêmcontext:',ThemeContext);
    console.log('this.context: ',this.context);
    const {theme,changeTheme} = this.context
    const color = theme === 'day' ? 'yellow' : 'black'
    return (
      <div style={{height:300,background:color,transition: 'background-color 0.5s ease'}}>
        <button onClick={changeTheme}>changeTheme</button>
      </div>
    )
  }
}

export default ThemeChange