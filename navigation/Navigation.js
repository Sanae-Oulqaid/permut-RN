import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accueil from "../screens/Accueil";
import Profil from "../screens/Profil";
import Rechercher from "../screens/Rechercher";
import Combinaisons from "../screens/Combinaisons";
import About from "../screens/About";

const Tab = createBottomTabNavigator();

const Navigation = ({ user }) => {
  return (
    <Tab.Navigator initialRouteName="Accueil">
      <Tab.Screen name="Accueil" component={Accueil} />
      <Tab.Screen name="Profil">
        {(props) => <Profil {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Rechercher" component={Rechercher} />
      <Tab.Screen name="Combinaisons" component={Combinaisons} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

export default Navigation;
