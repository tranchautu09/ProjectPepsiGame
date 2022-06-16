import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, ImageBackground} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Header from '../../../components/header/header';
import LogoutPopup from '../../../components/popup/logout-popup';
import RectangleButton from '../../../components/buttons/rectangle-button';
import {SCREEN_SCAN} from '../../../../../resource/images';
import ModalScanCodeFailed from '../../../components/popup/popup-scan-fail';
import ModalScanCodeSuccessful from '../../../components/popup/popup-scan-success';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {updateUser} from '../../../redux/actions/authorized.actions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ScanCode: React.FC = (props: any) => {
  const {navigation} = props;
  const [playTimesExchange, setPlayTimesExchange] = useState(0);
  const [totalPlayTimes, setTotalPlayTimes] = useState(0);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [showModalScanFail, setShowModalScanFail] = useState(false);
  const [showModalScanSuccess, setShowModalScanSuccess] = useState(false);
  const user = useSelector((state: RootState) => state.authorized.user);
  const dispatch = useDispatch();

  let scanner;

  const onSuccess = e => {
    let data = e.data;
    // Alert.alert('Mã QR code có nội dung: ', data);
    if (data.indexOf('play_times_exchange') < 0) {
      setShowModalScanFail(!showModalScanFail);
    } else {
      data = data.replace(/\s+/g, '');
      // console.log('remove all spaces: ', data);
      let str = data.split('=');
      let resultPlayTime = parseInt(str[1], 10);
      if (isNaN(resultPlayTime)) {
        setShowModalScanFail(!showModalScanFail);
      } else {
        setTotalPlayTimes(
          resultPlayTime + user.play_time_free + user.play_time_exchange,
        );
        setPlayTimesExchange(resultPlayTime);
        setShowModalScanSuccess(!showModalScanSuccess);

        // Update user
        let newUserData = JSON.parse(JSON.stringify(user));
        newUserData.play_time_exchange =
          resultPlayTime + user.play_time_exchange;

        dispatch(updateUser({user: newUserData}));
      }
    }
  };

  const reactivateCamera = () => {
    scanner.reactivate();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_SCAN}
        resizeMode="cover"
        style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
            leftButtonAvailable={true}
            onPressLeftButton={() => navigation.goBack()}
            rightButtonAvailable={true}
            onPressRightButton={() => {
              setLogoutModalVisible(!logoutModalVisible);
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <QRCodeScanner
            ref={node => (scanner = node)}
            onRead={onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            cameraStyle={styles.camStyle}
            // showMarker={true}
            cameraProps={{ratio: '5:3'}}
            fadeIn={true}
            // reactivate={true}
          />
          <RectangleButton title={'Quét mã'} onPress={reactivateCamera} />
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
        <ModalScanCodeFailed
          visible={showModalScanFail}
          onPress={() => {
            setShowModalScanFail(!showModalScanFail);
            reactivateCamera();
          }}
        />
        <ModalScanCodeSuccessful
          visible={showModalScanSuccess}
          onClose={() => setShowModalScanSuccess(!showModalScanSuccess)}
          onPressFirst={() => {
            setShowModalScanSuccess(!showModalScanSuccess);
            reactivateCamera();
          }}
          onPressSecond={() => {
            setShowModalScanSuccess(!showModalScanSuccess);
            navigation.navigate('Main screen');
          }}
          data={{
            play_times_exchange: playTimesExchange,
            total_play_times: totalPlayTimes,
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e76e3',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 9,
  },
  camStyle: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: windowHeight * 0.08,
  },
});

export default ScanCode;
