import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import HorizontalImageSwipeButton from '../../components/buttons/HorizotalImageSwipeButton';
import {HEAD, SCREEN_GAME} from '../../../../assets/images';
import Header from '../../components/header/header';
import LogoutPopup from '../../components/popup/LogoutPopup';
import {
  decrementExchange,
  decrementFree,
} from '../../redux';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {getReward} from '../../redux';
import { signOut } from '../../redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Game: React.FC = (props: any) => {
  const {navigation} = props;
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const playType = useSelector(
    (state: RootState) => state.authorized.current_play_type,
  );
  const playTimesExchange = useSelector(
    (state: RootState) => state.authorized.user.play_time_exchange,
  );
  const playTimesFree = useSelector(
    (state: RootState) => state.authorized.user.play_time_free,
  );
  const reward = useSelector((state: RootState) => state.authorized.reward);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetRewardComplete();
  }, [reward]);

  const handleGetRewardComplete = () => {
    // console.log('reward:', reward);

    if (reward != null && reward !== undefined) {
      if (playType === 'exchange') {
        dispatch(decrementExchange());
        navigation.navigate('Congratulation');
      } else if (playType === 'free') {
        dispatch(decrementFree());
        navigation.navigate('Congratulation');
      } else {
        navigation.navigate('Main screen');
      }
    }
  };

  const onFinish = () => {
    dispatch(getReward());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_GAME}
        resizeMode="cover"
        style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
            leftButtonAvailable={true}
            onPressLeftButton={() => {
              navigation.goBack();
            }}
            title={'Vu???t l??n ????? ch??i'}
            rightButtonAvailable={true}
            onPressRightButton={() => {
              setLogoutModalVisible(!logoutModalVisible);
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.informationContainer}>
            <Text style={styles.text}>{'B???n c??n '}</Text>
            {/* <Text style={styles.textHightlight}>
            {playTimesExchange + ' ' + playTimesFree}
          </Text> */}
            <Text style={styles.textHightlight}>
              {playType === 'free' ? playTimesFree : playTimesExchange}
            </Text>
            <Text style={styles.text}>{' l?????t ch??i '}</Text>
            <Text style={styles.text}>
              {playType === 'free' ? 'mi???n ph??' : 'quy ?????i'}
            </Text>
          </View>
          <View style={styles.gameContainer}>
            <HorizontalImageSwipeButton
              imageSource={HEAD}
              onFinish={onFinish}
            />
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
    alignItems: 'center',
  },
  contentContainer: {
    flex: 9,
  },
  informationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
  },
  gameContainer: {
    flex: 9,
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 13,
  },
  textHightlight: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Game;
