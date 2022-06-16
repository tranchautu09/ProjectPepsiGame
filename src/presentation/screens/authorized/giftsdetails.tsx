import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import Header from '../../../components/header/header';
import RectangleButton from '../../../components/buttons/rectangle-button';
import {
  SCREEN_GIFTS_DETAILS,
  COIN_BADGE_BIGGER,
  EMPTY_BOX,
  BACKGROUND_GIFT_AVAILABLE,
  BACKGROUND_GIFT_EXCHANGED,
  REWARD_COINS,
  REWARD_HAT,
  REWARD_BAG,
  REWARD_JACKET,
  REWARD_TUMBLER,
  BUTTON_WHITE,
} from '../../../../../resource/images';
import {RootState} from '../../../redux/store';
import {getGiftStore} from '../../../redux/actions/authorized.actions';
import GiftFormModal from '../../../components/popup/gift-form-modal';
import {resetIsSaveGiftDataSuccess} from '../../../redux/slices/authorized';
import ModalMessageSuccess from '../../../components/popup/popup-message-success';
import LogoutPopup from '../../../components/popup/logout-popup';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const defaultItem = {
  id: 0,
  name: '',
  description: '',
  coins: 0,
  quantity: 0,
};

const GiftsDetails: React.FC = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [showGiftStore, setShowGiftStore] = useState(true);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem);
  const user = useSelector((state: RootState) => state.authorized.user);

  const isGettingGiftStore = useSelector(
    (state: RootState) => state.authorized.isGettingGiftStore,
  );
  const giftStore = useSelector(
    (state: RootState) => state.authorized.gift_store,
  );
  const isSavedGiftSuccessful = useSelector(
    (state: RootState) => state.authorized.isSavedGiftDataSuccessful,
  );
  const [showModalMessageSuccess, setShowModalMessageSuccess] = useState(false);

  useEffect(() => {
    dispatch(getGiftStore());
  }, []);

  useEffect(() => {
    if (isSavedGiftSuccessful) {
      setShowModalMessageSuccess(!showModalMessageSuccess);
      dispatch(resetIsSaveGiftDataSuccess());
    }
  }, [isSavedGiftSuccessful]);

  const renderButtonContent = () => {
    if (showGiftStore === true) {
      if (isGettingGiftStore === false) {
        return renderGiftStore(giftStore);
      } else {
        return;
      }
    } else {
      return renderExchangedGifts(user.gifts);
    }
  };

  const renderGiftStore = _giftStore => {
    return (
      <View style={{alignItems: 'center'}}>
        <ImageBackground
          source={COIN_BADGE_BIGGER}
          resizeMode={'contain'}
          style={styles.imageCoinBadge}>
          <Text style={styles.textCoins}>{user.collection.coins}</Text>
        </ImageBackground>
        <View style={styles.viewTextCoinsExplaination}>
          <Text style={styles.textCoinsExplaination}>
            {'Số coins hiện tại của bạn'}
          </Text>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={_giftStore}
            renderItem={flatlistRenderItem_GiftStore}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };

  const flatlistRenderItem_GiftStore = ({item}) => {
    let imgSource = REWARD_COINS;
    switch (item.name) {
      case 'hat':
        imgSource = REWARD_HAT;
        break;
      case 'jacket':
        imgSource = REWARD_JACKET;
        break;
      case 'bag':
        imgSource = REWARD_BAG;
        break;
      case 'tumbler':
        imgSource = REWARD_TUMBLER;
        break;
      default:
        imgSource = REWARD_COINS;
    }
    return (
      <View style={styles.backgroundRed}>
        <ImageBackground
          source={BACKGROUND_GIFT_AVAILABLE}
          style={styles.backgroundRed}
          resizeMode="cover">
          <View style={styles.viewTextCoinsExchange}>
            <Text style={styles.textCoinsExchange}>{`${item.coins}`}</Text>
          </View>
          <View style={styles.viewImages}>
            <Image source={imgSource} resizeMode="contain" />
          </View>
          <View style={styles.viewTextDescription}>
            <Text style={styles.textDescriptionYellow}>{item.description}</Text>
            <View style={styles.viewTextDelivery}>
              <Text
                style={styles.textQuantity}>{`Còn lại: ${item.quantity}`}</Text>
            </View>
          </View>
          <RectangleButton
            title="Đổi quà"
            titleStyle={styles.textButtonTitle}
            backgroundImage={BUTTON_WHITE}
            onPress={() => handleExchangeGift(item)}
            activeStyle={
              Platform.OS === 'android'
                ? {
                    ...styles.buttonExchangeGift,
                    ...{marginTop: -windowHeight * 0.001},
                  }
                : styles.buttonExchangeGift
            }
          />
        </ImageBackground>
      </View>
    );
  };

  const handleExchangeGift = item => {
    if (user.collection.coins < item.coins) {
      Alert.alert('Bạn không đủ coins để đổi phần quà này!');
    } else {
      setSelectedItem(item);
      setShowGiftForm(!showGiftForm);
    }
  };

  const renderExchangedGifts = userGifts => {
    if (userGifts.length < 1 || userGifts === undefined || userGifts === null) {
      return (
        <View style={styles.viewEmptyBox}>
          <Image
            source={EMPTY_BOX}
            resizeMode="contain"
            style={styles.imageEmptyBox}
          />
          <View style={styles.textEmptyBoxSection}>
            <Text style={styles.textEmptyBox}>
              {'Kho quà còn trống!\nHãy dùng coins của bạn để đổi quà'}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.flatlist}>
          <FlatList
            data={userGifts}
            renderItem={flatListRenderItem_GiftExchanged}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }
  };

  const flatListRenderItem_GiftExchanged = ({item, index}) => {
    let imgSource = REWARD_COINS;
    switch (item.name) {
      case 'hat':
        imgSource = REWARD_HAT;
        break;
      case 'jacket':
        imgSource = REWARD_JACKET;
        break;
      case 'bag':
        imgSource = REWARD_BAG;
        break;
      case 'tumbler':
        imgSource = REWARD_TUMBLER;
        break;
      default:
        imgSource = REWARD_COINS;
    }
    return (
      <View style={styles.backgroundYellow}>
        <ImageBackground
          source={BACKGROUND_GIFT_EXCHANGED}
          style={styles.backgroundYellow}
          resizeMode="cover">
          <View style={styles.viewTextIndex}>
            <Text style={styles.textIndex}>{`${index + 1}`}</Text>
          </View>
          <View style={styles.viewImages}>
            <Image source={imgSource} resizeMode="contain" />
          </View>
          <View style={styles.viewTextDescription}>
            <Text style={styles.textDescriptionBlue}>{item.description}</Text>
            <View style={styles.viewTextDelivery}>
              <Text style={styles.textDeliveryStatus}>{'Trạng thái: '}</Text>
              <Text
                style={
                  item.delivered
                    ? styles.textDeliveredTrue
                    : styles.textDeliveredFalse
                }>
                {item.delivered ? 'Đã nhận' : 'Chưa nhận'}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const handleLeftButton = () => {
    setShowGiftStore(true);
  };

  const handleRightButton = () => {
    setShowGiftStore(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_GIFTS_DETAILS}
        style={styles.container}
        resizeMode="cover">
        <View style={styles.headerContainer}>
          <Header
            title="Chi tiết quà tặng"
            leftButtonAvailable={true}
            onPressLeftButton={() => navigation.goBack()}
            rightButtonAvailable={true}
            onPressRightButton={() =>
              setLogoutModalVisible(!logoutModalVisible)
            }
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={
                  showGiftStore ? styles.leftButtonRed : styles.leftButtonWhite
                }
                onPress={handleLeftButton}>
                <Text
                  style={
                    showGiftStore
                      ? styles.textButtonWhite
                      : styles.textButtonRed
                  }>
                  {'Đổi quà'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  showGiftStore
                    ? styles.rightButtonWhite
                    : styles.rightButtonRed
                }
                onPress={handleRightButton}>
                <Text
                  style={
                    showGiftStore
                      ? styles.textButtonRed
                      : styles.textButtonWhite
                  }>
                  {'Quà của tôi'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>{renderButtonContent()}</View>
        </View>
        <GiftFormModal
          visible={showGiftForm}
          onClose={() => setShowGiftForm(!showGiftForm)}
          payload={selectedItem}
          onPress={() => setShowGiftForm(!showGiftForm)}
        />
        <ModalMessageSuccess
          visible={showModalMessageSuccess}
          onClose={() => setShowModalMessageSuccess(!showModalMessageSuccess)}
        />
        <LogoutPopup
          visible={logoutModalVisible}
          onPressConfirm={() => {
            setLogoutModalVisible(!logoutModalVisible);
          }}
          onPressCancel={() => setLogoutModalVisible(!logoutModalVisible)}
          sideEffect={() => {
            navigation.navigate('Sign in');
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 9,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 9,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: windowHeight * 0.03,
  },
  leftButtonRed: {
    backgroundColor: 'red',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: windowWidth * 0.38,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButtonWhite: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: windowWidth * 0.38,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButtonRed: {
    backgroundColor: 'red',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: windowWidth * 0.38,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButtonWhite: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: windowWidth * 0.38,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonRed: {
    fontSize: 18,
    fontWeight: '800',
    color: 'red',
  },
  textButtonWhite: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
  },
  flatlist: {
    marginTop: windowWidth * 0.03,
    flex: 1,
    paddingBottom: windowHeight * 0.02,
  },
  viewEmptyBox: {
    justifyContent: 'center',
    flex: 1,
  },
  imageCoinBadge: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.125,
    justifyContent: 'center',
    marginTop: windowHeight * 0.03,
  },
  textCoins: {
    fontSize: 30,
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
  },
  viewTextCoinsExplaination: {
    marginTop: windowHeight * 0.01,
  },
  textCoinsExplaination: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backgroundRed: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.35,
    borderRadius: 20,
    marginHorizontal: windowWidth * 0.02,
    marginVertical: windowHeight * 0.01,
  },
  backgroundYellow: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.3,
    borderRadius: 20,
    marginHorizontal: windowWidth * 0.02,
    marginVertical: windowHeight * 0.01,
  },
  viewImages: {
    alignItems: 'center',
    width: '100%',
    height: windowHeight * 0.165,
  },
  viewTextIndex: {
    alignItems: 'flex-end',
    marginTop: windowHeight * 0.025,
    marginRight: windowWidth * 0.05,
  },
  textIndex: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
  },
  viewTextCoinsExchange: {
    alignItems: 'flex-end',
    marginTop: windowHeight * 0.025,
    marginRight: windowWidth * 0.03,
  },
  textCoinsExchange: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
  },
  viewTextDescription: {
    marginTop: windowHeight * 0.012,
  },
  textDescriptionBlue: {
    fontWeight: '800',
    color: 'blue',
    fontSize: 16,
    textAlign: 'center',
  },
  viewTextDelivery: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: windowHeight * 0.006,
  },
  textDeliveryStatus: {
    color: 'blue',
    fontSize: 11,
  },
  textDeliveredTrue: {
    fontSize: 11,
    color: 'green',
    fontWeight: '900',
  },
  textDeliveredFalse: {
    fontSize: 11,
    color: 'red',
    fontWeight: '900',
  },
  textQuantity: {
    fontSize: 11,
    color: 'white',
    fontWeight: 'normal',
  },
  imageEmptyBox: {
    alignSelf: 'center',
  },
  textEmptyBoxSection: {
    marginTop: windowHeight * 0.03,
  },
  textEmptyBox: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  buttonExchangeGift: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.06,
    borderRadius: 10,
  },
  textButtonTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'blue',
    textAlign: 'center',
  },
  textDescriptionYellow: {
    fontWeight: '800',
    color: 'yellow',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GiftsDetails;
