import React, { Component } from 'react'
import { render } from 'react-dom'
import App from './app'

class AppContainer extends Component {
  state = {
    name: 'Parcel 打包资源'
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ name: 'Parcel 打豆豆 '})
    }, 2000)
  }

  render() {
    return <App name={this.state.name}/>
  }
}

render(
  <AppContainer />,
  document.getElementById('app')
)
