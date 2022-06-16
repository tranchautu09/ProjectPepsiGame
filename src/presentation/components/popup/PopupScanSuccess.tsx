import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  ImageBackground,
} from 'react-native';
import RectangleButton from '../buttons/RectangleButton';
import {
  BUTTON_SCAN_NOW,
  POPUP_SCAN_CODE_SUCCESS,
  CLOSE_BUTTON,
} from '../../../../assets/images';
import {DoubleButtonsPopupProps} from './DoubleButtonsPopup';
import ImageButton from '../buttons/ImageButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalScanCodeSuccessful: React.FC<DoubleButtonsPopupProps> = props => {
  const {onPressFirst, onPressSecond, onClose, data, visible, backgroundImage} =
    props;

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          source={backgroundImage ? backgroundImage : POPUP_SCAN_CODE_SUCCESS}
          style={styles.modalContainer}>
          <ImageButton
            imageSource={CLOSE_BUTTON}
            imageStyle={styles.buttonClose}
            onPress={onClose}
          />
          <View style={styles.viewTextContent}>
            <Text style={styles.textTitle}>{'Bạn nhận được'}</Text>
            <Text
              style={
                styles.textPlayTimeExchange
              }>{`${data.play_times_exchange}`}</Text>
            <Text style={styles.textPlayTimes}>{'Lượt chơi'}</Text>
            <View style={styles.viewTextTotalPlayTimes}>
              <Text style={styles.textTotalPlayTimes}>{'Bạn đang có '}</Text>
              <Text style={styles.textTotalPlayTimesHightLight}>
                {data.total_play_times}
              </Text>
              <Text style={styles.textTotalPlayTimes}>{' lượt chơi'}</Text>
            </View>
          </View>
          <View style={styles.viewButton}>
            <RectangleButton
              title="Scan tiếp"
              titleStyle={styles.textButtonTitle}
              onPress={onPressFirst}
              backgroundImage={BUTTON_SCAN_NOW}
              activeStyle={styles.button}
            />
            <RectangleButton
              title="Chơi ngay"
              titleStyle={styles.textButtonTitle}
              onPress={onPressSecond}
              backgroundImage={BUTTON_SCAN_NOW}
              activeStyle={styles.button}
            />
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
  },
  viewTextContent: {
    marginTop: windowHeight * 0.05,
  },
  textTitle: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  textPlayTimeExchange: {
    fontSize: 80,
    color: '#0B5697',
    fontWeight: '900',
    textAlign: 'center',
  },
  textPlayTimes: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  viewTextTotalPlayTimes: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: windowHeight * 0.04,
  },
  textTotalPlayTimes: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  textTotalPlayTimesHightLight: {
    fontSize: 16,
    color: '#0B5697',
    fontWeight: '900',
    textAlign: 'center',
  },
  buttonClose: {
    alignSelf: 'flex-end',
    marginTop: windowHeight * 0.09,
    marginRight: windowWidth * 0.02,
  },
  viewButton: {
    marginTop: windowHeight * 0.02,
  },
  button: {
    width: windowWidth * 0.35,
    height: windowHeight * 0.05,
  },
  textButtonTitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
  },
});

export default ModalScanCodeSuccessful;
