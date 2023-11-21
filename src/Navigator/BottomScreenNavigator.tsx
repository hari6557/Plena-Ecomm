import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Categories, Favourites, More} from '../Screens';
import TabButton from '../Components/TabButton';

const Tabs = [
  {
    id: 1,
    name: 'Home',
    screen: 'Home',
    Component: Home,
  },
  {
    id: 1,
    name: 'Categories',
    screen: 'Categories',
    Component: Categories,
  },
  {
    id: 1,
    name: 'Favourites',
    screen: 'Favourites',
    Component: Favourites,
  },
  {
    id: 1,
    name: 'More',
    screen: 'More',
    Component: More,
  },
];

const BottomScreenNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      {Tabs.map((tab: any) => {
        return (
          <Tab.Screen
            key={tab.id}
            name={tab.screen}
            component={tab.Component}
            options={{
              tabBarButton: props => <TabButton screen={tab} />,
              tabBarLabel: tab.name
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomScreenNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#F8F7FB', //#F8F7FB
    borderColor: '#F8F7FB',
  },
});
