
import React from 'react'
import Users from './components/Users'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

  const NavigationStack = createStackNavigator({
    Users: {screen: Users}
  },
  {
    initialRouteName:  'Users'
  }
  )

  const Container = createAppContainer(NavigationStack)

const App = () => {
  return <Container />
}

export default App