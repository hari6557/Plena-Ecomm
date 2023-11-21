import {Animated, Easing, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SearcBox from './SearcBox';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CartIcon from '../Assets/Images/CartIcon';
import ArrowIcon from '../Assets/Images/ArrowIcon';

const HomeBanner = () => {
  const [shakeAnimation] = useState(new Animated.Value(0));
  const cartData = useSelector((state: any) => state?.cart);

  const triggerShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    triggerShakeAnimation();
  }, [cartData]);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={styles.homeBannerContainer}>
      <View style={styles.bannerHead}>
        <Text style={styles.headerText}>Hey, Rahul</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
          <View style={styles.cartSection}>
            <Text style={{fontSize: 14, color: '#000'}}>{cartData.length}</Text>
          </View>
          <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
            <CartIcon color='#fff'/>
          </Animated.View>
        </TouchableOpacity>
      </View>
      <SearcBox />
      <View style={styles.deliveryContainer}>
        <View>
          <Text style={styles.bannerSubText}>DELIVERY TO</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.bannerHeadText}>Green Way 3000, Sylhet</Text>
            <ArrowIcon/>
          </View>
        </View>
        <View>
          <Text style={styles.bannerSubText}>WITHIN</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.bannerHeadText}>1 Hour</Text>
            <ArrowIcon/>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  homeBannerContainer: {
    width: '100%',
    borderTopEndRadius: Platform.OS === 'ios' ? 5 : 0,
    borderTopStartRadius: Platform.OS === 'ios' ? 5 : 0,
    backgroundColor: '#2A4BA0',
    paddingVertical: 20,
  },
  bannerHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  bannerSubText: {
    color: '#A9B4BC',
    fontSize: 10,
  },
  bannerHeadText: {
    color: '#fff',
  },
  cartSection: {
    backgroundColor: '#F9B023',
    position: 'absolute',
    left: 10,
    bottom: 10,
    zIndex: 1,
    padding: Platform.OS === 'ios' ? 2 : 0,
    borderRadius: 20,
    width: 20,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
