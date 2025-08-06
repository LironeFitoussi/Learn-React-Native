import { Pressable, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

function IconButton({ 
  icon, 
  onPress, 
  size,
  color = "white",
  backgroundColor,
  style
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
      <Ionicons 
        name={icon} 
        size={size} 
        color={color} 
      />
    </Pressable>
  );
};

export default IconButton;
