import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Screen} from 'react-native-screens';
import Material from 'react-native-vector-icons/Feather';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import HomeIcon from '../Assets/Images/HomeIcon';
import CategoryIcon from '../Assets/Images/CategoryIcon';
import MenuIcon from '../Assets/Images/MoreIcon';
import FavIcon from '../Assets/Images/FavouriteIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface Screen {
  id: number;
  name: string;
  screen: string;
  icons: JSX.Element;
  Component: React.ComponentType<any>;
}

type Props = {
  screen: Screen;
};

const TabButton: React.FC<Props> = ({screen}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const isFocused = useIsFocused();

  const [translate] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(0));

  useEffect(() => {
    handleAnimated();
  }, [isFocused]);

  const handleAnimated = () => {
    Animated.parallel([
      Animated.timing(translate, {
        toValue: isFocused ? 0.7 : 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: isFocused ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const translateStyles = {
    transform: [
      {
        translateY: translate.interpolate({
          inputRange: [0, 1.5],
          outputRange: [0, -40],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const scaleStyles = {
    opacity: scale.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  const handleNavigation = () => {
    navigation.navigate(screen.screen);
  };

  const getIconComponent = (name: string, focused: boolean) => {
    switch (name) {
      case 'Home':
        return <HomeIcon focused={focused} />;
      case 'Categories':
        return <CategoryIcon focused={focused} />;
      case 'Favourites':
        return <FavIcon focused={focused} />;
      case 'More':
        return <MenuIcon focused={focused} />;
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity onPress={handleNavigation} style={styles.buttonContainer}>
      <Animated.View
        style={[
          isFocused ? styles.focusedButton : styles.button,
          translateStyles,
        ]}>
        <Animated.View
          style={[styles.innerButton, scaleStyles,]}></Animated.View>
            {getIconComponent(screen.name, isFocused)}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerButton: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: '#000',
  },
});
