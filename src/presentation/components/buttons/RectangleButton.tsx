import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageBackground,
} from 'react-native';
import {BUTTON_RED, BUTTON_INACTIVE} from '../../../../assets/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface IButton {
  activeStyle?: StyleProp<ViewStyle>;
  inactiveStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  title: string;
  titleStyle?: TextStyle;
  subComponent?: any;
  backgroundImage?: any;
}

const RectangleButton: React.FC<IButton> = props => {
  const {
    activeStyle,
    inactiveStyle,
    disabled,
    onPress,
    title,
    titleStyle,
    subComponent,
    backgroundImage,
  } = props;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          disabled
            ? BUTTON_INACTIVE
            : backgroundImage
            ? backgroundImage
            : BUTTON_RED
        }
        resizeMode="stretch"
        style={
          disabled
            ? [styles.inactiveButton, inactiveStyle]
            : [styles.activeButton, activeStyle]
        }>
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <Text style={titleStyle ? titleStyle : styles.title}>{title}</Text>
          {subComponent}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  activeButton: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.08,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: windowHeight * 0.01,
    borderRadius: 10,
  },
  inactiveButton: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.08,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: windowHeight * 0.01,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default RectangleButton;
