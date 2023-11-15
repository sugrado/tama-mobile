import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Camera, CameraApi, CameraType} from 'react-native-camera-kit';
import {COLORS} from '../../constants';
import {Text} from 'react-native-paper';

type SugradoBarcodeScannerProps = {
  onBack: () => void;
  onScanned: (barcode: string) => void;
};

const SugradoBarcodeScanner = ({
  onBack,
  onScanned,
}: SugradoBarcodeScannerProps) => {
  const cameraRef = useRef<CameraApi>(null);

  return (
    <View style={styles.screen}>
      <StatusBar hidden />

      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.cameraPreview}
          cameraType={CameraType.Back}
          zoomMode="on"
          focusMode="on"
          laserColor="red"
          frameColor="white"
          scanBarcode={true}
          showFrame={true}
          onReadCode={(event: any) => {
            onScanned(event.nativeEvent.codeStringValue);
          }}
        />
      </View>

      <SafeAreaView style={styles.bottomButtons}>
        <TouchableOpacity onPress={onBack} style={styles.backBtnContainer}>
          <Text variant="titleLarge" style={styles.textStyle}>
            Vazgeç
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default SugradoBarcodeScanner;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'black',
  },
  cameraContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
  },
  bottomButtons: {
    backgroundColor: COLORS.THEME_COLOR,
  },
  backBtnContainer: {
    alignItems: 'center',
    padding: 20,
  },
  textStyle: {
    color: COLORS.TEXT,
  },
});
