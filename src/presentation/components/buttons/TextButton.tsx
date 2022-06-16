import React from 'react';
import {Text, TouchableOpacity, StyleSheet, TextStyle} from 'react-native';

export interface ITextButton {
  title: string;
  titleStyle?: TextStyle;
  onPress?: () => void;
}

const TextButton: React.FC<ITextButton> = props => {
  const {title, titleStyle, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'yellow',
    // fontStyle: 'italic',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TextButton;
