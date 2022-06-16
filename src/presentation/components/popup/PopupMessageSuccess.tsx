import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';

import RectangleButton from '../buttons/RectangleButton';
import ImageButton from '../buttons/ImageButton';
import {
  BUTTON_CLOSE_WHITE,
  POPUP_MESSAGE_SUCCESS,
} from '../../../../assets/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface ModalMessageSuccessProps {
  visible: boolean;
  backgroundImage?: any;
  onClose: () => void;
}

const ModalMessageSuccess: React.FC<ModalMessageSuccessProps> = props => {
  const {visible, backgroundImage, onClose} = props;

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.messageContainer}>
            <ImageBackground
              style={styles.backgoundImage}
              source={backgroundImage ? backgroundImage : POPUP_MESSAGE_SUCCESS}
              resizeMode="contain">
              <Text style={styles.textTitle}>{'THÀNH CÔNG'}</Text>
              <Text style={styles.textContent}>
                {'Chúc mừng bạn nhận được quà từ'}
              </Text>
              <Text style={styles.textContentHightlight}>{'Pepsi Tết'}</Text>
            </ImageBackground>
          </View>
          <View style={styles.buttonContainer}>
            <ImageButton imageSource={BUTTON_CLOSE_WHITE} onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
  },
  backgoundImage: {
    width: '100%',
    height: '100%',
  },
  messageContainer: {
    flex: 5,
  },
  buttonContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textTitle: {
    color: 'orange',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: windowHeight * 0.04,
  },
  textContent: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: windowHeight * 0.015,
  },
  textContentHightlight: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: windowHeight * 0.005,
  },
});

export default ModalMessageSuccess;
