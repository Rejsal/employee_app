
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { store } from "../store";
import Employee from '../screens/employee';
import ViewEmployee from '../screens/employee/view';


const Stack = createStackNavigator();

function EmployeeScreen() {
  return (
    <Employee />
  );
}

function ViewEmployeeScreen() {
  return (
    <ViewEmployee />
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <>
            <Stack.Screen name="Employee" component={EmployeeScreen} />
            <Stack.Screen name="ViewEmployee" component={ViewEmployeeScreen} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
