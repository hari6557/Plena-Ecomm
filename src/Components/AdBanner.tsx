import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { ImageIcon } from '../Assets/Images';



const AdBanner = () => {
  return (
    <View style={styles.adBannerContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <ImageIcon/>
        <View>
          <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
            Get
          </Text>
          <Text style={{fontSize: 26, color: '#fff', fontWeight: '800'}}>
            50% OFF
          </Text>
          <Text style={{fontSize: 13, color: '#fff', fontWeight: '300'}}>
            On first 03 order
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AdBanner;

const styles = StyleSheet.create({
  adBannerContainer: {
    flex: 1,
    width: 350,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: '#F9B023',
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 31,
    minHeight: 100,
  },
});
