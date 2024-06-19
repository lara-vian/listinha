import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { primary_screens } from '../constants/screenNames';

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {Object.entries(primary_screens).map(([key, values]) => (
          <Drawer.Screen key={key} name={values.name} component={values.component} />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}