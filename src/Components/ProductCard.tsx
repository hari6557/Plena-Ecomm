import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { addItemToCart } from '../Redux/Actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import HeartIcon from '../Assets/Images/HeartIcon';
import { removeItemFromFav, addItemToFav } from '../Redux/Actions/Actions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface ProductItem {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  quantity: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

const ProductCard: React.FC<{product: ProductItem}> = ({product}) => {

  const [favouriteStatus, setFavouriteStatus] = useState(false);
    
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch();

  const favoriteProducts = useSelector((state: any) => state.fav);

  const isProductInFav = favoriteProducts.includes(product.id);

  const onPress = () => {
    navigation.navigate("ProductDetails", {
      id : product?.id as number
    })
  }

  const toggleFavorite = () => {
    if (isProductInFav) {
      dispatch(removeItemFromFav(product.id));
    } else {
      dispatch(addItemToFav(product.id));
    }
    setFavouriteStatus(!favouriteStatus);
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.productContainer]}>
      <TouchableOpacity onPress={toggleFavorite} style={{alignSelf: 'flex-start'}}>
          <HeartIcon favourite={isProductInFav}/>
      </TouchableOpacity>
      {product?.thumbnail ? (
        <Image style={{borderRadius: 10}} width={100} height={100} source={{uri: product?.thumbnail}} />
      ) : (
        <IonIcons name="image-sharp" color={'#A1ABC0'} size={80} />
      )}
      <View style={styles.productDetails}>
        <View>
          <Text style={{color :'#000'}}>${product?.price ? product?.price : '325'}</Text>
          <Text style={{color :'#000'}}>{product?.title ? product?.title : 'Clown Tang H03'}</Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(addItemToCart(product))}>
          <FontAwesomeIcon name="plus-circle" color={'#153075'} size={18} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productContainer: {
    width: '40%',
    backgroundColor: '#E7ECF0',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  productDetails: {
    marginTop: 30,
    flexDirection: 'row',
  },
});
