import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '@/constants/styles';

type LoadingOverlayProps = {
  message?: string;
  visible?: boolean;
};

export default function LoadingOverlay({ message = 'Loading...', visible = true }: LoadingOverlayProps) {
  if (!visible) return null;
  return (
    <Modal transparent animationType="fade" visible={visible} statusBarTranslucent>
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
          {message ? <Text style={styles.text}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 180,
  },
  text: {
    marginTop: 12,
    color: GlobalStyles.colors.primary500,
  },
});

