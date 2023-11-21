import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../Redux/Actions/Actions';

interface CartItem {
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

const CartBox: React.FC<{product: CartItem}> = ({product}) => {
    const dispatch = useDispatch();

    const handleRemoveItem = (productId: number) => {
      // Dispatch an action to remove the item from the cart
      dispatch(removeItemFromCart(productId));
    };

  return (
    <View style={styles.cartBoxContainer}>
      <View style={styles.cartBox}>
        <View style={styles.priceImageSection}>
          <View>
            <Image width={30} height={30} source={{uri: product?.thumbnail}} />
          </View>
          <View style={styles.priceSection}>
            <Text style={{color: '#1E222B', fontSize: 14, fontWeight: '500'}}>{product?.title}</Text>
            <Text style={{color: '#1E222B', fontWeight: '100', fontSize: 14}}>${product?.price}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.iconSection}>
            <TouchableOpacity onPress={() => handleRemoveItem(product?.id)} style={styles.icon}>
              <Feather name="minus" color={'#000'} size={15} />
            </TouchableOpacity>
          </View>
          <Text style={{color: '#000'}}>{product?.quantity}</Text>
          <View style={styles.iconSection}>
            <TouchableOpacity onPress={()=>dispatch(addItemToCart(product))} style={styles.icon}>
              <Feather name="plus" color={'#000'} size={15} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{borderWidth: 0.5, borderColor: '#EBEBFB'}}>

      </View>
    </View>
  );
};

export default CartBox;

const styles = StyleSheet.create({
  cartBoxContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cartBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceImageSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  priceSection: {
    marginLeft: 15,
    maxWidth: 150,
  },
  iconSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  icon: {
    width: 35,
    borderRadius: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
  },
});
