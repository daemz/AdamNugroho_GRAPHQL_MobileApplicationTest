import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LaunchesHome from '../Screens/Launches/LaunchesHome';

import LaunchDetail from '../Screens/Launches/LaunchDetail';

const StackNavigator = createStackNavigator()
function StackNavigation() {
  return(
    <StackNavigator.Navigator initialRouteName={"LaunchesHome"}>
      <StackNavigator.Screen name="LaunchesHome" component={LaunchesHome} options={{headerShown: false}}/>

      <StackNavigator.Screen name="LaunchDetail" component={LaunchDetail} options={{headerShown: false}}/>

    </StackNavigator.Navigator>
  )
}

export default StackNavigation;