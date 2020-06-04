import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'
import Main from './Main'
import User from './manager_component/User'
import Category from './manager_component/Category'
import Book from './manager_component/Book'
import Bill from './manager_component/Bill/'
import Best_sale from './manager_component/Best_sale'
import Statistic from './manager_component/Statistic'
const Stack = createStackNavigator();
// const App = () => {
//   return (
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Main" component={Main} />
  </Stack.Navigator>
</NavigationContainer>
//   )
// }

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="Main" component={Main} options={{ title: 'Home', headerLeft: () => { } }} />
          <Stack.Screen name='User' component={User} />
          <Stack.Screen name='Category' component={Category} />
          <Stack.Screen name='Book' component={Book} />
          <Stack.Screen name='Bill' component={Bill} />
          <Stack.Screen name='Best_sale' component={Best_sale} />
          <Stack.Screen name='Statistic' component={Statistic} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
