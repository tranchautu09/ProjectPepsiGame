import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface ImageButtonProps {
  imageSource?: any;
  imageSourceDisable?: any;
  imageStyle?: StyleProp<ImageStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
  onPress?: () => void;
}

const ImageButton: React.FC<ImageButtonProps> = props => {
  const {
    imageSource,
    imageSourceDisable,
    buttonContainerStyle,
    imageStyle,
    disable,
    onPress,
  } = props;

  return (
    <View
      style={
        buttonContainerStyle ? buttonContainerStyle : styles.buttonContainer
      }>
      <TouchableOpacity disabled={disable} onPress={onPress}>
        {imageSource ? (
          <Image
            source={disable ? imageSourceDisable : imageSource}
            resizeMode="contain"
            style={imageStyle}
          />
        ) : (
          <View style={styles.defaultButtonStyle} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {},
  defaultButtonStyle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'red',
    backgroundColor: 'white',
  },
});

export default ImageButton;
