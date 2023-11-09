import {View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {ActivityIndicator, Text} from 'react-native-paper';
import {COLORS, DIMENSIONS} from '../../constants';

type LoadingProps = {
  loading: boolean;
  fillBackground?: boolean;
};

const Loading = ({loading, fillBackground = false}: LoadingProps) => {
  const backgroundStyle = {
    backgroundColor: fillBackground ? 'white' : 'rgba(0,0,0,0.5)',
  };
  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, backgroundStyle]}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={COLORS.THEME_COLOR} />
          <Text style={styles.loading_text}>Yükleniyor...</Text>
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
  loading_text: {
    marginTop: 10,
    color: COLORS.THEME_COLOR,
  },
});

export default Loading;
