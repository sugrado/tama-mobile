import {View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS, DIMENSIONS} from '../../constants';

type LoadingProps = {
  loading: boolean;
};

const Loading = ({loading}: LoadingProps) => {
  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <TouchableOpacity activeOpacity={1} style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={COLORS.THEME_GREEN} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DIMENSIONS.HEIGHT,
    width: DIMENSIONS.WIDTH,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    borderRadius: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Loading;
