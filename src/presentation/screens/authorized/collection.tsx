import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Text,
} from 'react-native';
import Header from '../../../components/header/header';
import RectangleButton from '../../../components/buttons/rectangle-button';
import {
  SCREEN_COLLECTION,
  BUTTON_PLUS_ENABLE,
  BUTTON_PLUS_DISABLE,
  BUTTON_MINUS_ENABLE,
  BUTTON_MINUS_DISABLE,
  COIN_BADGE_BIGGER,
  CAN_PEPSI,
  CAN_MIRINDA,
  CAN_SEVENUP,
} from '../../../../../resource/images';
import LogoutPopup from '../../../components/popup/logout-popup';
import ImageButton from '../../../components/buttons/image-button';
import {RootState} from '../../../redux/store';
import ModalGift from '../../../components/popup/gift-modal';
import ModalGiftReveal from '../../../components/popup/gift-reveal-modal';
import {
  exchangeCombo,
  updateUser,
} from '../../../redux/actions/authorized.actions';
import {resetExchangeComboResult} from '../../../redux/slices/authorized';
import {signOut} from '../../../redux/actions/authentication.actions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Collection: React.FC = (props: any) => {
  const {navigation} = props;
  const [isPlusDisabled, setIsPlusDisable] = useState(true);
  const [isMinusDisabled, setIsMinusDisable] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [comboAmount, setComboAmount] = useState(0);
  const [maxComboAmount, setMaxComboAmount] = useState(0);
  const [modalGiftVisible, setModalGiftVisible] = useState(false);
  const [modalGiftRevealVisible, setModalGiftRevealVisible] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.authorized.user);
  const exchangeComboResult = useSelector(
    (state: RootState) => state.authorized.exchange_combo_result,
  );

  useEffect(() => {
    findMaxComboAmount(
      user.collection.pepsi_cans,
      user.collection.mirinda_cans,
      user.collection.sevenup_cans,
    );
  }, [
    user.collection.pepsi_cans,
    user.collection.mirinda_cans,
    user.collection.sevenup_cans,
  ]);

  useEffect(() => {
    plusButtonSideEffect(comboAmount, maxComboAmount);
    minusButtonSideEffect(comboAmount);
  }, [comboAmount, maxComboAmount]);

  const findMaxComboAmount = (
    pepsi: number,
    mirinda: number,
    sevenup: number,
  ) => {
    let min = 0;
    min = Math.min(pepsi, mirinda, sevenup);
    setMaxComboAmount(min);
  };

  const plusButtonSideEffect = (combo: number, maxCombo: number) => {
    if (combo < maxCombo) {
      setIsPlusDisable(false);
    } else {
      setIsPlusDisable(true);
    }
  };

  const minusButtonSideEffect = (combo: number) => {
    if (combo <= 0) {
      setIsMinusDisable(true);
    } else {
      setIsMinusDisable(false);
    }
  };

  const handlePlus = () => {
    if (comboAmount < maxComboAmount) {
      setComboAmount(comboAmount + 1);
    }
  };

  const handleMinus = () => {
    if (comboAmount > 0) {
      setComboAmount(comboAmount - 1);
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleConfirmExchangeCombo = () => {
    setModalGiftRevealVisible(!modalGiftRevealVisible);
    setModalGiftVisible(!modalGiftVisible);
    dispatch(exchangeCombo(comboAmount));
  };

  const handleUpdateUser = () => {
    let newUserData = JSON.parse(JSON.stringify(user));
    for (var i = 0; i < exchangeComboResult.length; i++) {
      // if (exchangeComboResult[i].name === 'coins') {
      //   newUserData.collection.coins += 300;
      // }
      switch (exchangeComboResult[i].name) {
        case 'coins':
          newUserData.collection.coins += 300;
          break;
        case 'hat':
          newUserData.gifts.push({
            name: 'hat',
            description: 'Pepsi Bucket Hat',
            delivered: false,
          });
          break;
        case 'jacket':
          newUserData.gifts.push({
            name: 'jacket',
            description: 'Pepsi Jacket',
            delivered: false,
          });
          break;
        case 'bag':
          newUserData.gifts.push({
            name: 'bag',
            description: 'Pepsi Tote Bag',
            delivered: false,
          });
          break;
        case 'tumbler':
          newUserData.gifts.push({
            name: 'tumbler',
            description: 'Pepsi Tumbler',
            delivered: false,
          });
          break;
        default:
          break;
      }
    }

    newUserData.collection.mirinda_cans -= comboAmount;
    newUserData.collection.pepsi_cans -= comboAmount;
    newUserData.collection.sevenup_cans -= comboAmount;

    dispatch(updateUser({user: newUserData}));
    dispatch(resetExchangeComboResult());
    setComboAmount(0);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_COLLECTION}
        style={styles.container}
        resizeMode="cover">
        <View style={styles.headerContainer}>
          <Header
            title="Bộ sưu tập"
            leftButtonAvailable={true}
            onPressLeftButton={() => navigation.goBack()}
            rightButtonAvailable={true}
            onPressRightButton={handleLogout}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <ImageBackground
              source={COIN_BADGE_BIGGER}
              resizeMode="contain"
              style={styles.imageCoinBadge}>
              <Text style={styles.textCoins}>{user.collection.coins}</Text>
            </ImageBackground>
            <Text style={styles.textCoinAmountExplainaion}>
              {'Số coins hiện tại của bạn'}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.cansSection}>
              <View style={styles.singleCanSection}>
                <Image source={CAN_PEPSI} style={styles.imageCan} />
                <Text style={styles.textCanAmount}>
                  {user.collection.pepsi_cans}
                </Text>
              </View>
              <View style={styles.singleCanSection}>
                <Image source={CAN_MIRINDA} style={styles.imageCan} />
                <Text style={styles.textCanAmount}>
                  {user.collection.mirinda_cans}
                </Text>
              </View>
              <View style={styles.singleCanSection}>
                <Image source={CAN_SEVENUP} style={styles.imageCan} />
                <Text style={styles.textCanAmount}>
                  {user.collection.sevenup_cans}
                </Text>
              </View>
            </View>
            <View style={styles.textSection}>
              <View style={styles.textLine}>
                <Text style={styles.textExchangeCombo}>
                  {'Đổi ngay bộ sưu tập'}
                </Text>
                <Text style={styles.textExchangeComboHightlight}>
                  {' AN - LỘC - PHÚC'}
                </Text>
              </View>
              <View style={styles.textLine}>
                <Text style={styles.textExchangeCombo}>
                  {'để có cơ hội nhận ngay'}
                </Text>
                <Text style={styles.textExchangeComboHightlight}>
                  {' 300 coins'}
                </Text>
                <Text style={styles.textExchangeCombo}>{' hoặc'}</Text>
              </View>
              <View style={styles.textLine}>
                <Text style={styles.textExchangeCombo}>{'một'}</Text>
                <Text style={styles.textExchangeComboHightlight}>
                  {' phần quà may mắn'}
                </Text>
              </View>
            </View>
            <View style={styles.comboSection}>
              <ImageButton
                disable={isMinusDisabled}
                imageSource={BUTTON_MINUS_ENABLE}
                imageSourceDisable={BUTTON_MINUS_DISABLE}
                onPress={handleMinus}
                buttonContainerStyle={styles.buttonCombo}
              />
              <Text style={styles.textComboAmount}>{comboAmount}</Text>
              <ImageButton
                disable={isPlusDisabled}
                imageSource={BUTTON_PLUS_ENABLE}
                imageSourceDisable={BUTTON_PLUS_DISABLE}
                onPress={handlePlus}
                buttonContainerStyle={styles.buttonCombo}
              />
            </View>
            <View style={styles.buttonSection}>
              <RectangleButton
                title="Đổi ngay"
                onPress={() => {
                  setModalGiftVisible(!modalGiftVisible);
                }}
                disabled={comboAmount > 0 ? false : true}
              />
            </View>
          </View>
        </View>
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
        <ModalGift
          visible={modalGiftVisible}
          onPress={handleConfirmExchangeCombo}
          onClose={() => {
            setModalGiftVisible(!modalGiftVisible);
          }}
          payload={{comboAmount: comboAmount}}
        />
        <ModalGiftReveal
          visible={modalGiftRevealVisible}
          onClose={() => {
            setModalGiftRevealVisible(!modalGiftRevealVisible);
          }}
          payload={{
            images: exchangeComboResult,
          }}
          sideEffect={handleUpdateUser}
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
    flex: 3,
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 7,
  },
  cansSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.8,
    alignSelf: 'center',
  },
  singleCanSection: {
    alignItems: 'center',
  },
  buttonSection: {
    marginTop: windowHeight * 0.04,
  },
  comboSection: {
    marginTop: windowHeight * 0.02,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonCombo: {
    marginHorizontal: windowWidth * 0.05,
  },
  textSection: {
    marginTop: windowHeight * 0.02,
  },
  textLine: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageCoinBadge: {
    marginTop: windowHeight * 0.04,
    width: windowWidth * 0.25,
    height: windowHeight * 0.125,
    justifyContent: 'center',
  },
  imageCan: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.25,
  },
  textCoinAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.03,
  },
  textCoinAmountExplainaion: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.01,
  },
  textCanAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.03,
  },
  textComboAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textExchangeCombo: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  textExchangeComboHightlight: {
    color: 'yellow',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textCoins: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
  },
});

export default Collection;
