import { Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import React from 'react';

interface IconButtonProps {
  icon: string;
  text?: string;
  onPress: () => void;
  size: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

function IconButton({ 
  icon, 
  text = "★", 
  onPress, 
  size,
  color = "white",
  backgroundColor,
  style,
  textStyle 
}: IconButtonProps) {
  return (
    <Pressable 
      onPress={onPress} 
      style={[
        {
          padding: 12, 
          minWidth: 40, 
          minHeight: 40, 
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: 20,
          marginRight: 16,
          marginTop: 4,
          backgroundColor: backgroundColor
        },
        style
      ]}
    >
      <Text style={[
        {
          color: color, 
          fontSize: size,
          textAlign: 'center',
          lineHeight: size
        },
        textStyle
      ]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default IconButton;
