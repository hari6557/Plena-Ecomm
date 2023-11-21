import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CartBox from '../Components/CartBox';

const Cart = () => {
  const navigation = useNavigation();
  const cartData = useSelector((state: any) => state.cart);

  const totalWidth = Dimensions.get('window').width;

  const height = totalWidth * 0.5;

  const productCountMap = cartData.reduce((acc: any, item: any) => {
    const {id} = item;
    if (acc[id]) {
      acc[id].quantity += 1;
    } else {
      acc[id] = {...item, quantity: 1};
    }
    return acc;
  }, {});

  const groupedCartItems = Object.values(productCountMap);

  const totalPrice = groupedCartItems.reduce((total: number, product: any) => {
    const productTotal = product.price * product.quantity;
    return total + productTotal;
  }, 0);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#153075'} />
      <View style={styles.cartContainer}>
        <View style={styles.cartHead}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backIcon}>
            <IonIcons name="chevron-back" color={'#000'} size={25} />
          </TouchableOpacity>
          <Text style={styles.cartText}>Shopping Cart({cartData.length})</Text>
        </View>
      </View>
      {groupedCartItems.length >= 1 ? (
        <ScrollView style={{height}}>
          {groupedCartItems.map((cartItem: any) => {
            return <CartBox key={cartItem.id} product={cartItem} />;
          })}
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>
            Cart is Empty
          </Text>
        </View>
      )}
      {groupedCartItems.length >= 1 && <View style={styles.checkOutSection}>
        <View style={styles.priceContainer}>
          <View style={styles.priceSection}>
            <Text style={{color: '#616A7D'}}>Subtotal</Text>
            <Text style={{color: '#616A7D'}}>${totalPrice}</Text>
          </View>
          <View style={styles.priceSection}>
            <Text style={{color: '#616A7D'}}>Delivery</Text>
            <Text style={{color: '#616A7D'}}>${totalPrice ? 2 : 0}</Text>
          </View>
          <View style={styles.priceSection}>
            <Text style={{color: '#616A7D'}}>Total</Text>
            <Text style={{color: '#616A7D'}}>
              ${totalPrice && totalPrice + 2}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={{fontSize: 16, color: '#fff'}}>Proceed to checkout</Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  cartContainer: {
    width: '100%',
    borderTopEndRadius: 20,
    backgroundColor: '#fff',
    borderTopStartRadius: 20,
    paddingVertical: 20,
  },
  cartHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 35,
    borderRadius: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
  },
  cartText: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: '500',
    color: '#000',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FB',
  },
  priceContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  checkOutSection: {
    bottom: 20,
    backgroundColor: '#F8F9FB',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginHorizontal: 10,
  },
  checkoutButton: {
    borderRadius: 18,
    backgroundColor: '#153075',
    color: '#fff',
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
