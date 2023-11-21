import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState} from 'react';
import {CarouselActiveIcon, CarouselInactiveIcon} from '../Assets/Images';
import HeartIcon from '../Assets/Images/HeartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToFav, removeItemFromFav } from '../Redux/Actions/Actions';

type CarouselProps = {
  images: string[];
  isFavourite: boolean;
  id: number
};

const {width} = Dimensions.get('window');
const height = width * 0.5;

const Carousel = ({images, isFavourite, id}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<any>();
  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state: any) => state.fav);

  const isProductInFav = favoriteProducts.includes(id);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.floor(contentOffsetX / width);
    setActiveIndex(currentIndex);
  };

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    if (scrollViewRef.current) {
      const xOffset = index * width;
      scrollViewRef.current.scrollTo({
        x: xOffset,
        animated: true,
      });
    }
  };

  const handleIconPress = (index: number) => {
    scrollToIndex(index);
    setActiveIndex(index);
  };

  const toggleFavorite = () => {
    if (isProductInFav) {
      dispatch(removeItemFromFav(id)); // Dispatch action to remove from favorites
    } else {
      dispatch(addItemToFav(id)); // Dispatch action to add to favorites
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
          <HeartIcon favourite={isProductInFav}/>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        horizontal
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        {images &&
          images.map((image, index) => (
            <Image key={index} source={{uri: image}} style={styles.image} />
          ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images &&
          images.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={{margin: 2}}
              onPress={() => handleIconPress(index)}>
              {index === activeIndex ? (
                <CarouselActiveIcon />
              ) : (
                <CarouselInactiveIcon />
              )}
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};


export default Carousel;

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
    zIndex: 0,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 15,
    borderRadius: 25,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center'
  },
  favoriteIcon: {
    flexDirection: 'row',
  },
  scroll: {
    width,
    height,
    zIndex: 0,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
});
