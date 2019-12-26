import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import EmployeeListScreen from '../screens/EmployeeListScreen';
import EmployeeDetailsScreen from '../screens/EmployeeDetailsScreen';
import AddEmployeeScreen from '../screens/AddEmployeeScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});




//home screen na tab
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';



// //Link screen na tab
// const LinksStack = createStackNavigator(
//   {
//     Links: LinksScreen,
//   },
//   config
// );

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
//   ),
// };

// LinksStack.path = '';





// //Setting screen na tab
// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen,
//   },
//   config
// );

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//   ),
// };

// SettingsStack.path = '';





//Employee Details screen na tab
const EmployeeDetailsStack = createStackNavigator(
  {
    EmployeeDetails: EmployeeDetailsScreen,
  },
  config
);

EmployeeDetailsStack.navigationOptions = {
  tabBarLabel: 'Employee Details',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information-circle-outline'} />
  ),
};

EmployeeDetailsStack.path = '';






//Employee List screen na tab
const EmployeeListStack = createStackNavigator(
  {
    EmployeeList: EmployeeListScreen,
  },
  config
);

EmployeeListStack.navigationOptions = {
  tabBarLabel: 'Employee List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

EmployeeListStack.path = '';

//add Employee screen na tab
const AddEmployeeStack = createStackNavigator(
  {
    AddEmployee: AddEmployeeScreen,
  },
  config
);

AddEmployeeStack.navigationOptions = {
  tabBarLabel: 'Add Employee',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'} />
  ),
};

EmployeeListStack.path = '';




//tab navigator ->full
const tabNavigator = createBottomTabNavigator({
  HomeStack,
  EmployeeListStack,
  EmployeeDetailsStack,
  AddEmployeeStack,
  // LinksStack,
  // SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
