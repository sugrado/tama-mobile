import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Camera, CameraApi, CameraType} from 'react-native-camera-kit';
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
        <View style={styles.backBtnContainer}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.textStyle}>Back</Text>
          </TouchableOpacity>
        </View>
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
    aspectRatio: 3 / 4,
    width: '100%',
  },
  bottomButtons: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtnContainer: {
    alignItems: 'flex-start',
  },
  textStyle: {
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
});
