import React from 'react';
import {View, StyleSheet, Text, Modal, Dimensions} from 'react-native';
import RectangleButton from '../buttons/RectangleButton';
import ImageButton from '../buttons/ImageButton';
import {CLOSE_BUTTON, BUTTON_RED} from '../../../../assets/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface DoubleButtonsPopupProps {
  onPressFirst?: () => void;
  //   firstButtonDisable?: boolean;
  onPressSecond?: () => void;
  //   secondButtonDisable?: boolean;
  onClose?: () => void;
  visible: boolean;
  data?: any;
  backgroundImage?: any;
}

const PlayTimesSelection: React.FC<DoubleButtonsPopupProps> = props => {
  const renderPlayTimesLeft = (times: number) => {
    return (
      <View style={styles.subTextContainer}>
        <Text style={styles.subText}>{'Bạn còn '}</Text>
        <Text style={styles.subTextHighlight}>{times}</Text>
        <Text style={styles.subText}>{' lượt chơi'}</Text>
      </View>
    );
  };

  const {onPressFirst, onPressSecond, onClose, visible, data} = props;
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.textContainer}>
            <ImageButton
              onPress={onClose}
              imageSource={CLOSE_BUTTON}
              buttonContainerStyle={styles.closeButon}
            />
            <Text style={styles.text}>{'BẠN MUỐN SỬ DỤNG LƯỢT CHƠI NÀO'}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <RectangleButton
              title="Lượt chơi miễn phí"
              titleStyle={styles.textButton}
              activeStyle={styles.activeButton}
              inactiveStyle={styles.inactiveButton}
              disabled={
                data?.playTimesFree && data?.playTimesFree > 0 ? false : true
              }
              onPress={onPressFirst}
              subComponent={renderPlayTimesLeft(data?.playTimesFree)}
            />
            <RectangleButton
              title="Lượt chơi quy đổi"
              titleStyle={styles.textButton}
              activeStyle={styles.activeButton}
              inactiveStyle={styles.inactiveButton}
              disabled={
                data?.playTimesExchange && data?.playTimesExchange > 0
                  ? false
                  : true
              }
              onPress={onPressSecond}
              subComponent={renderPlayTimesLeft(data?.playTimesExchange)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '70%',
    height: '30%',
    backgroundColor: '#fcd01e',
    borderRadius: 10,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: windowHeight * 0.01,
  },
  text: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.02,
    textAlign: 'center',
  },
  textBold: {
    color: '#0063A7',
    fontSize: 13,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: windowHeight * 0.02,
  },
  closeButon: {
    alignSelf: 'flex-end',
  },
  activeButton: {
    // backgroundColor: 'red',
    width: windowWidth * 0.6,
    height: windowWidth * 0.2,
    marginTop: -windowHeight * 0.015,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  inactiveButton: {
    width: windowWidth * 0.6,
    // backgroundColor: 'grey',
    height: windowWidth * 0.2,
    marginTop: -windowHeight * 0.015,
  },
  subText: {
    fontSize: 11,
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

export default PlayTimesSelection;
