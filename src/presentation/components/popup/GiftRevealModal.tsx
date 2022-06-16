import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  ImageBackground,
} from 'react-native';
import ImageButton from '../buttons/ImageButton';
import {
  EXCHANGE_COMBO_RESULT,
  BUTTON_CLOSE_WHITE,
} from '../../../../assets/images';
import ImageCarousel from '../listviews/ImagesCarousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface ModalGiftRevealProps {
  visible: boolean;
  onClose: () => void;
  payload?: any;
  backgoundImage?: any;
  sideEffect: () => void;
}

const ModalGiftReveal: React.FC<ModalGiftRevealProps> = props => {
  const {visible, onClose, payload, backgoundImage, sideEffect} = props;

  // useEffect(() => {
  //   sideEffect();
  // }, []);

  const handleOnClose = () => {
    onClose();
    sideEffect();
  };

  return (
    <Modal visible={visible} transparent={false} animationType="fade">
      <View style={styles.modalContainer}>
        <ImageBackground
          source={backgoundImage ? backgoundImage : EXCHANGE_COMBO_RESULT}
          style={styles.modalContentContainer}
          resizeMode="cover">
          <View style={styles.rewardSection}>
            <ImageCarousel images={payload.images} />
          </View>
          <ImageButton
            imageSource={BUTTON_CLOSE_WHITE}
            onPress={handleOnClose}
          />
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
    width: windowWidth,
    justifyContent: 'flex-end',
  },
  rewardSection: {
    marginBottom: windowHeight * 0.02,
  },
  textSection: {
    marginBottom: windowHeight * 0.1,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  textHightlight: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ModalGiftReveal;
