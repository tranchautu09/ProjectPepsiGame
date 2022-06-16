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
  POPUP_SCAN_CODE_FAIL,
} from '../../../../assets/images';
import {SingleButtonsPopupProps} from './SingleButtonPopup';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalScanCodeFailed: React.FC<SingleButtonsPopupProps> = props => {
  const {onPress, visible, backgroundImage} = props;

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          source={backgroundImage ? backgroundImage : POPUP_SCAN_CODE_FAIL}
          style={styles.modalContainer}>
          <View style={styles.viewRedText}>
            <Text style={styles.redText}>
              {'Hệ thống không nhận được hình ảnh!'}
            </Text>
          </View>
          <View style={styles.viewButton}>
            <RectangleButton
              title="Scan lại"
              titleStyle={styles.textButtonTitle}
              onPress={onPress}
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
    height: windowHeight * 0.22,
  },
  viewRedText: {
    marginTop: windowHeight * 0.05,
    width: '80%',
    alignSelf: 'center',
  },
  redText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewButton: {
    marginTop: windowHeight * 0.02,
  },
  button: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.05,
  },
  textButtonTitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
  },
});

export default ModalScanCodeFailed;
