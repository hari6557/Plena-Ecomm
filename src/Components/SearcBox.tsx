import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';

const SearcBox = () => {
  return (
    <View style={styles.searchContainer}>
      <IonIcons name="search-outline" size={18} color="#A9B4BC" />
      <TextInput placeholderTextColor="#A9B4BC" placeholder='Search Products or store' style={styles.input} />
    </View>
  );
};

export default SearcBox;

const styles = StyleSheet.create({
  searchContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#153075',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 5,
    color: '#fff'
  },
});
