import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
  Dimensions,
  TextStyle,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface TextInputFieldProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
  errorLabel?: string;
  placeholder?: string;
  numKeyboard?: boolean;
  inputProps?: TextInputProps;
  ref?: any;
  multiLine?: boolean;
  isInputInValid?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = props => {
  const {
    containerStyle,
    inputContainerStyle,
    errorStyle,
    multiLine,
    errorLabel,
    placeholder,
    numKeyboard,
    isInputInValid,
    inputProps = {},
  } = props;

  return (
    <View style={containerStyle ? containerStyle : styles.container}>
      <View
        style={
          inputContainerStyle
            ? isInputInValid
              ? {...inputContainerStyle, ...styles.errorBorder}
              : inputContainerStyle
            : isInputInValid
              ? {...styles.inputContainer, ...styles.errorBorder}
              : styles.inputContainer
        }>
        <TextInput
          {...inputProps}
          style={styles.inputStyle}
          keyboardType={numKeyboard ? 'numeric' : 'default'}
          placeholder={placeholder}
          multiline={multiLine ? multiLine : false}
        />
      </View>
      <Text style={errorStyle ? errorStyle : styles.errorText}>
        {errorLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: windowHeight * 0.01,
  },
  inputContainer: {
    height: windowHeight * 0.05,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputStyle: {
    color: 'black',
    fontSize: 18,
    marginHorizontal: windowWidth * 0.03,
  },
  placeholderText: {
    fontSize: 20,
    color: '#877e7e',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default TextInputField;
