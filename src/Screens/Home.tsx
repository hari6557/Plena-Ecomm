import {Dimensions, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeBanner from '../Components/HomeBanner';
import AdBanner from '../Components/AdBanner';
import ProductCard from '../Components/ProductCard';
import { getProductDetails } from '../Services';

const Home = () => {

  const [products, setProducts] = useState<Array<{price: string, thumbnail: string, title: string}>>()
  const colorScheme = useColorScheme();
  const totalWidth = Dimensions.get('window').width;

  const width = totalWidth;
  const height = totalWidth * 0.5;
  const isDarkMode = colorScheme === 'dark';


  useEffect(()=>{
    handleProducts();
  },[])

  const handleProducts = () => {
    getProductDetails().then((res: any)=>{
      setProducts(res?.data?.products)
    }).catch((error: any)=>{
      console.log("ERROR", error)
    })
  }
  return (
    <View style={[styles.homeContainer, {backgroundColor: isDarkMode ? '#F8F9FB' : '#F8F9FB'}]}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#2A4BA0'}/>
      <HomeBanner />
      <ScrollView style={{height: '65%'}}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <ScrollView style={{height, width}} horizontal showsHorizontalScrollIndicator={false}>
            <AdBanner />
            <AdBanner />
            <AdBanner />
          </ScrollView>
          <View style={{alignSelf: 'flex-start', paddingLeft: 25}}>
            <Text style={{fontSize: 25, color: '#000', fontWeight: '400'}}>Recommended</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
            {products && products.map((product: any)=>{
              return( 
                <ProductCard key={product.id} product={product}/>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
