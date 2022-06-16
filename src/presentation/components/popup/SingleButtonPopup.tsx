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
  CLOSE_BUTTON,
  CRY_FACE,
  POPUP_PLAY_TIME_OVER,
  BUTTON_SCAN_NOW,
} from '../../../../assets/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface SingleButtonsPopupProps {
  onPress?: () => void;
  onClose?: () => void;
  visible: boolean;
  backgroundImage?: any;
  payload?: any;
}

const OutOfPlayTime: React.FC<SingleButtonsPopupProps> = props => {
  const {onPress, onClose, visible, backgroundImage} = props;
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <ImageBackground
            source={backgroundImage ? backgroundImage : POPUP_PLAY_TIME_OVER}
            resizeMode="cover"
            style={styles.modalContent}
            imageStyle={styles.imageBackgorund}>
            <View style={styles.textContainer}>
              <ImageButton
                onPress={onClose}
                imageSource={CLOSE_BUTTON}
                buttonContainerStyle={styles.closeButon}
              />
              <Text style={styles.textTitle}>{'BẠN ĐÃ HẾT LƯỢT!'}</Text>
              <Text style={styles.textContent}>
                {
                  'Hãy scan thêm mã trên bill mua nước hoặc combo Pepsi rạp để nhận thêm lượt chơi'
                }
              </Text>
              <Image source={CRY_FACE} style={styles.cryfaceImage} />
            </View>
            <View style={styles.buttonsContainer}>
              <RectangleButton
                title="Scan ngay"
                backgroundImage={BUTTON_SCAN_NOW}
                titleStyle={styles.textButton}
                activeStyle={styles.activeButton}
                inactiveStyle={styles.inactiveButton}
                onPress={onPress}
              />
            </View>
          </ImageBackground>
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
    width: windowWidth * 0.7,
    height: windowHeight * 0.45,
    alignItems: 'center',
  },
  imageBackgorund: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#debc14',
  },
  textContainer: {
    marginTop: windowHeight * 0.01,
    alignItems: 'center',
  },
  textContent: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.02,
    textAlign: 'center',
    marginHorizontal: windowWidth * 0.05,
  },
  textTitle: {
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: windowHeight * 0.02,
  },
  closeButon: {
    alignSelf: 'flex-end',
    marginRight: windowWidth * 0.02,
  },
  activeButton: {
    // backgroundColor: 'red',
    width: windowWidth * 0.45,
    height: windowWidth * 0.12,
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  cryfaceImage: {
    marginTop: windowHeight * 0.03,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  inactiveButton: {
    width: windowWidth * 0.5,
    // backgroundColor: 'grey',
    height: windowWidth * 0.1,
    // borderWidth: 2,
    // borderColor: 'yellow',
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

export default OutOfPlayTime;
