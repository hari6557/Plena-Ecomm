import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

const More = () => {
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';
  return (
    <View style={[styles.moreContainer, {backgroundColor: isDarkMode ? '#F8F9FB' : '#F8F9FB'}]}>
      <Text style={{fontSize: 22,color: '#000', fontWeight: '600'}}>Under maintanence</Text>
    </View>
  )
}

export default More

const styles = StyleSheet.create({
  moreContainer: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})