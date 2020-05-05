import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import Colors from "../constants/Color";
import { Platform } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
