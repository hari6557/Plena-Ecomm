import {
  ActivityIndicator,
  Animated,
  Button,
  Dimensions,
  Easing,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getProductDetail} from '../Services';
import {Rating} from 'react-native-ratings';
import Carousel from '../Components/Carousel';
import {addItemToCart} from '../Redux/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CartIcon from '../Assets/Images/CartIcon';

const ProductDetails = () => {
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [shakeAnimation] = useState(new Animated.Value(0));
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch();
  const cartData = useSelector((state: any) => state?.cart);

  const totalWidth = Dimensions.get('window').width;

  const height = totalWidth * 0.5;

  useEffect(() => {
    let id = route?.params?.id && route?.params?.id;
    handleProductDetail(id);
  }, []);

  const handleProductDetail = (id: number) => {
    setLoading(true);
    getProductDetail(id)
      .then((res: any) => {
        setProduct(res?.data);
        setLoading(false);
        console.log('RES', res?.data);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log('Error', err);
      });
  };

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

  return (
    <View>
      <StatusBar barStyle={'light-content'} backgroundColor={'#2A4BA0'} />
      {loading ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            height: '100%',
          }}>
          <ActivityIndicator size="large" color={'#F9B023'} />
        </View>
      ) : (
        <View>
          <View style={styles.productDetailsContainer}>
            <View style={styles.productDetailsHead}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backIcon}>
                <IonIcons name="chevron-back" color={'#000'} size={25} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.cartSection}>
                  <Text style={{fontSize: 14, color: '#000'}}>
                    {cartData.length}
                  </Text>
                </View>
                <Animated.View
                  style={{transform: [{translateX: shakeAnimation}]}}>
                  <CartIcon color="#000" />
                </Animated.View>
              </TouchableOpacity>
            </View>
            <View style={styles.ProductDetailsBannerHeading}>
              <Text
                style={{
                  fontSize: 50,
                  fontWeight: '700',
                  color: '#000',
                  textAlign: 'left',
                }}>
                {product && product?.title}
              </Text>
            </View>
            <View style={styles.ratingSection}>
              <Rating
                type="star"
                startingValue={product?.rating}
                ratingCount={5}
                imageSize={22}
                readonly
              />
              <Text style={{fontSize: 14, color: '#A1A1AB', marginLeft: 5}}>
                {product?.price} Reviews
              </Text>
            </View>
          </View>
          <Carousel
            isFavourite={false}
            images={product?.images && product?.images}
            id={product?.id}
          />
          <ScrollView style={{height}}>
            <View style={styles.priceSection}>
              <Text style={styles.priceText}>
                ${product?.price && product?.price}
              </Text>
              <View style={styles.offerContainer}>
                <Text style={styles.offerText}>
                  {product?.discountPercentage && product?.discountPercentage} %
                  OFF
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => dispatch(addItemToCart(product))}
                style={styles.addToCart}>
                <Text style={{fontSize: 16, color: '#153075'}}>
                  Add To Cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buyNow}>
                <Text style={{fontSize: 16, color: '#fff'}}>Buy Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsSection}>
              <Text style={styles.detailsText}>Details</Text>
              <Text style={styles.descriptionText}>
                {product?.description && product?.description}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  productDetailsContainer: {
    width: '100%',
    borderTopEndRadius: 20,
    backgroundColor: '#fff',
    borderTopStartRadius: 20,
    paddingVertical: 20,
  },
  backIcon: {
    width: 35,
    borderRadius: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
  },
  productDetailsHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  ProductDetailsBannerHeading: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
    alignItems: 'flex-start',
  },
  ratingSection: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  priceSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  offerText: {
    color: '#fff',
    fontWeight: '400',
  },
  offerContainer: {
    marginLeft: 10,
    backgroundColor: '#153075',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  priceText: {
    fontWeight: '500',
    color: '#153075',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addToCart: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#153075',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  buyNow: {
    borderRadius: 20,
    backgroundColor: '#153075',
    color: '#fff',
    padding: 10,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsSection: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  detailsText: {
    fontSize: 16,
    color: '#1E222B',
  },
  descriptionText: {
    fontSize: 14,
    color: '#8891A5',
    paddingVertical: 10,
    textAlign: 'justify',
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
