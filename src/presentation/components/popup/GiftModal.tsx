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
import {SingleButtonsPopupProps} from './SingleButtonPopup';
import {
  EXCHANGE_COMBO,
  BUTTON_CLOSE_WHITE,
  BUTTON_SCAN_NOW,
} from '../../../../assets/images';
import ImageButton from '../buttons/ImageButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalGift: React.FC<SingleButtonsPopupProps> = props => {
  const {onPress, onClose, visible, payload, backgroundImage} = props;

  return (
    <Modal visible={visible} transparent={false} animationType="fade">
      <View style={styles.modalContainer}>
        <ImageBackground
          source={backgroundImage ? backgroundImage : EXCHANGE_COMBO}
          resizeMode="cover"
          style={styles.modalContentContainer}>
          <View style={styles.textSection}>
            <View style={styles.textLine}>
              <Text style={styles.text}>{'Bạn có chắc chắn muốn đổi'}</Text>
            </View>
            <View style={styles.textLine}>
              <Text
                style={
                  styles.textHightlight
                }>{`${payload?.comboAmount} combo`}</Text>
              <Text style={styles.text}>{' hay không?'}</Text>
            </View>
          </View>
          <RectangleButton
            title="Đổi quà"
            onPress={onPress}
            backgroundImage={BUTTON_SCAN_NOW}
            activeStyle={styles.buttonActive}
          />
          <ImageButton imageSource={BUTTON_CLOSE_WHITE} onPress={onClose} />
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalContentContainer: {
    height: windowHeight * 0.7,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: windowWidth,
  },
  textSection: {
    marginBottom: windowHeight * 0.05,
  },
  textLine: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonActive: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.05,
    marginBottom: windowHeight * 0.07,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  textHightlight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
  },
});

export default ModalGift;
