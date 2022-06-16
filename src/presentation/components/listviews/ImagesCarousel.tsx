import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import ImageButton from '../buttons/ImageButton';
import {
  BUTTON_BACKWARD_DISABLE,
  BUTTON_BACKWARD_ENABLE,
  BUTTON_FORWARD_DISABLE,
  BUTTON_FORWARD_ENDABLE,
  REWARD_BAG,
  REWARD_COINS,
  REWARD_HAT,
  REWARD_JACKET,
  REWARD_TUMBLER,
} from '../../../../assets/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface ImageCarouselProps {
  images: any;
}

const ImageCarousel: React.FC<ImageCarouselProps> = props => {
  const {images} = props;
  const slideRef = useRef(null);
  const [currenIndex, setCurrentIndex] = useState(0);
  const [forwardDisable, setForwardDisable] = useState(false);
  const [backwardDisable, setBackwwardDisable] = useState(true);

  const viewableItemChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const handleForward = () => {
    if (currenIndex < images.length - 1) {
      slideRef.current.scrollToIndex({index: currenIndex + 1});
    }
  };

  const handleBackward = () => {
    if (currenIndex > 0) {
      slideRef.current.scrollToIndex({index: currenIndex - 1});
    }
  };

  useEffect(() => {
    if (images.length < 1) {
      setBackwwardDisable(true);
      setForwardDisable(true);
    } else {
      if (currenIndex > 0) {
        setBackwwardDisable(false);
      } else {
        setBackwwardDisable(true);
      }

      if (currenIndex < images.length - 1) {
        setForwardDisable(false);
      } else {
        setForwardDisable(true);
      }
    }
  }, [currenIndex, images.length]);

  const getRewardImage = name => {
    switch (name) {
      case 'hat':
        return REWARD_HAT;
      case 'jacket':
        return REWARD_JACKET;
      case 'bag':
        return REWARD_BAG;
      case 'tumbler':
        return REWARD_TUMBLER;
      default:
        return REWARD_COINS;
    }
  };

  const renderImage = ({item}) => {
    return (
      <Image
        source={getRewardImage(item.name)}
        resizeMode="contain"
        style={styles.image}
      />
    );
  };

  return (
    <View style={styles.container}>
      {images.length > 0 && (
        <View>
          <View style={styles.topContainer}>
            <View style={styles.leftContainer}>
              <ImageButton
                imageSource={BUTTON_BACKWARD_ENABLE}
                imageSourceDisable={BUTTON_BACKWARD_DISABLE}
                onPress={handleBackward}
                disable={backwardDisable}
              />
            </View>
            <View style={styles.centerContainer}>
              <View style={styles.imageView}>
                <FlatList
                  ref={slideRef}
                  data={images}
                  renderItem={renderImage}
                  pagingEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  onViewableItemsChanged={viewableItemChanged}
                  viewabilityConfig={viewConfig}
                />
              </View>
            </View>
            <View style={styles.rightContainer}>
              <ImageButton
                imageSource={BUTTON_FORWARD_ENDABLE}
                imageSourceDisable={BUTTON_FORWARD_DISABLE}
                onPress={handleForward}
                disable={forwardDisable}
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.text}>{'Bạn nhận được'}</Text>
            <Text style={styles.textHightlight}>
              {images[currenIndex].description}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.5,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    marginTop: windowHeight * 0.1,
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 8,
    alignItems: 'center',
  },
  imageView: {
    width: windowWidth * 0.38,
    height: windowHeight * 0.3,
  },
  image: {
    width: windowWidth * 0.38,
    marginTop: windowHeight * 0.1,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  textHightlight: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImageCarousel;
