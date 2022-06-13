import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {RootState} from '../../../redux/store';
import {useSelector, useDispatch} from 'react-redux';
import RectangleButton from '../../../components/buttons/rectangle-button';
import {
  BUTTON_WHITE,
  HEAD,
  SCREEN_MAIN,
  BUTTON_PLAY_NOW,
} from '../../../../../resource/images';
import LogoutPopup from '../../../components/popup/logout-popup';
import PlayTimesSelection from '../../../components/popup/double-buttons-popup';
import Header from '../../../components/header/header';
import {setPlayType} from '../../../redux/slices/authorized';
import OutOfPlayTime from '../../../components/popup/single-button-popup';
import TextButton from '../../../components/buttons/text-button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainScreen: React.FC = (props: any) => {
  const {navigation} = props;
  const user = useSelector((state: RootState) => state.authorized.user);
  const playTimesExchange = user.play_time_exchange;
  const playTimesFree = user.play_time_free;

  const dispatch = useDispatch();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [ptsModalVisible, setPtsModalVisible] = useState(false);
  const [optModalVisible, setOptModalVisible] = useState(false);

  const renderPlayTimesLeft = (times: number) => {
    return (
      <View style={styles.subTextContainer}>
        <Text style={styles.subText}>{'Bạn có tổng cộng '}</Text>
        <Text style={styles.subTextHighlight}>{times}</Text>
        <Text style={styles.subText}>{' lượt chơi'}</Text>
      </View>
    );
  };

  const navigateToGame = (playType: string) => {
    dispatch(setPlayType(playType));
    navigation.navigate('Game');
    setPtsModalVisible(!ptsModalVisible);
  };

  const navigateToScanCode = () => {
    navigation.navigate('Scan code');
    setOptModalVisible(!optModalVisible);
  };

  const selectModal = () => {
    if (playTimesExchange > 0 || playTimesFree > 0) {
      setPtsModalVisible(!ptsModalVisible);
    } else {
      setOptModalVisible(!optModalVisible);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_MAIN}
        resizeMode="cover"
        style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
            leftButtonAvailable={false}
            rightButtonAvailable={true}
            onPressRightButton={() => {
              setLogoutModalVisible(!logoutModalVisible);
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <Image style={styles.headImage} source={HEAD} />
          </View>
          <View style={styles.bottomContainer}>
            <TextButton
              title="Hướng dẫn"
              titleStyle={styles.textInstruction}
              onPress={() => navigation.navigate('Instruction')}
            />
            <RectangleButton
              title={'Chơi ngay'}
              activeStyle={styles.buttonRed}
              subComponent={renderPlayTimesLeft(
                playTimesExchange + playTimesFree,
              )}
              onPress={selectModal}
              backgroundImage={BUTTON_PLAY_NOW}
            />
            <RectangleButton
              title={'Quét mã'}
              activeStyle={styles.buttonWhite}
              titleStyle={styles.textButton}
              onPress={() => navigation.navigate('Scan code')}
              backgroundImage={BUTTON_WHITE}
            />
            <RectangleButton
              title={'Bộ sưu tập'}
              activeStyle={styles.buttonWhite}
              titleStyle={styles.textButton}
              backgroundImage={BUTTON_WHITE}
              onPress={() => navigation.navigate('Collection')}
            />
            <RectangleButton
              title={'Chi tiết quà tặng'}
              activeStyle={styles.buttonWhite}
              titleStyle={styles.textButton}
              backgroundImage={BUTTON_WHITE}
              onPress={() => navigation.navigate('Gifts details')}
            />
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
          <PlayTimesSelection
            visible={ptsModalVisible}
            onClose={() => setPtsModalVisible(!ptsModalVisible)}
            data={{playTimesFree, playTimesExchange}}
            onPressFirst={() => navigateToGame('free')}
            onPressSecond={() => navigateToGame('exchange')}
          />
          <OutOfPlayTime
            visible={optModalVisible}
            onClose={() => setOptModalVisible(!optModalVisible)}
            onPress={navigateToScanCode}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1e76e3',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 9,
    justifyContent: 'center',
  },
  topContainer: {
    flex: 4,
  },
  bottomContainer: {
    flex: 6,
  },
  textInstruction: {
    color: 'yellow',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  logoutButton: {
    alignSelf: 'flex-end',
    marginTop: windowHeight * 0.05,
    marginRight: windowWidth * 0.02,
    width: '6%',
  },
  textLogout: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-end',
    marginRight: windowWidth * 0.02,
    marginTop: windowHeight * 0.01,
  },
  buttonRed: {
    height: windowHeight * 0.1,
    width: '70%',
    borderRadius: 5,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  buttonWhite: {
    marginTop: -windowHeight * 0.01,
    height: windowHeight * 0.08,
    width: '70%',
    borderRadius: 5,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  headImage: {
    alignSelf: 'center',
    marginTop: windowHeight * 0.035,
  },
  textButton: {
    fontSize: 18,
    color: '#0063A7',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subText: {
    fontSize: 12,
    color: 'white',
  },
  subTextHighlight: {
    fontSize: 13,
    color: 'yellow',
    fontWeight: 'bold',
  },
  subTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default MainScreen;
