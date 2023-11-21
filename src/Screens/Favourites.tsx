import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

const Favourites = () => {
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';
  return (
    <View style={[styles.favContainer, {backgroundColor : isDarkMode ? '#F8F9FB' : '#F8F9FB'}]}>
      <Text style={{fontSize: 22, color: '#000', fontWeight: '600'}}>Under maintanence</Text>
    </View>
  )
}

export default Favourites

const styles = StyleSheet.create({
  favContainer: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})