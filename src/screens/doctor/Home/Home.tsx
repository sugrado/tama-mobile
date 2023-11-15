import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import SugradoBarcodeScanner from '../../../components/core/SugradoBarcodeScanner';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, PAGE_NAMES} from '../../../constants';
import {PatientListElement} from './PatientListElement';

import {
  checkCameraPermission,
  showPermissionRequiredAlert,
} from '../../../utils/permission';

const Home = ({navigation}: any) => {
  const [scanner, setScanner] = useState<JSX.Element>();
  const [lastPatients, setLastPatients] = useState<any[]>();

  useEffect(() => {
    setLastPatients(dummyData);
  }, []);

  if (scanner) {
    return scanner;
  }

  const onBack = () => {
    setScanner(undefined);
  };

  const onScanned = (code: string) => {
    onBack();
    navigateToPatientSearch(code);
  };

  const handleClickListElement = (item: any) => {
    navigateToPatientSearch(item.id);
  };

  const navigateToPatientSearch = (code: string) => {
    navigation.navigate(PAGE_NAMES.DOCTOR.HOME.SEARCH_PATIENT, {
      code,
    });
  };

  const handleScanQRCode = async () => {
    const permissionGranted = await checkCameraPermission();
    if (!permissionGranted) {
      showPermissionRequiredAlert();
    } else {
      setScanner(
        <SugradoBarcodeScanner onBack={onBack} onScanned={onScanned} />,
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        activeOpacity={0.5}
        onPress={handleScanQRCode}>
        <View style={styles.left_content}>
          <Text variant="headlineSmall" style={styles.title}>
            QR Kod Tara
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            Hasta bilgilerini görüntülemek için QR kodunu okutun.
          </Text>
        </View>
        <View style={styles.right_content}>
          <MaterialCommunityIcons name="qrcode-scan" size={80} color="white" />
        </View>
      </TouchableOpacity>
      {lastPatients && lastPatients.length > 0 && (
        <>
          <View style={styles.last_patients_title_container}>
            <MaterialCommunityIcons
              name="history"
              size={24}
              color={COLORS.BUTTON_COLOR}
            />
            <Text variant="titleMedium" style={styles.last_patients_title}>
              Son sorgulananlar
            </Text>
          </View>
          <FlatList
            data={lastPatients}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <PatientListElement
                item={item}
                onPress={handleClickListElement}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: COLORS.THEME_COLOR,
    padding: 30,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
  },
  left_content: {
    flex: 1,
    paddingRight: 20,
  },
  right_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.TEXT,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: COLORS.TEXT,
  },
  last_patients_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  last_patients_title: {
    color: COLORS.BUTTON_COLOR,
    marginStart: 10,
  },
});

const dummyData = [
  {
    id: 1,
    name: 'Görkem Rıdvan ARIK',
    createdAt: '12.12.2020 12:12',
    qrCodeId: '00000000-0000-0000-0000-000000000000',
  },
  {id: 2, name: 'Ayşe Fatma', createdAt: '12.12.2020 12:12'},
  {
    id: 3,
    name: 'Mehmet Ali',
    createdAt: '12.12.2020 12:12',
  },
  {
    id: 4,
    name: 'Ahmet Mehmet',
    createdAt: '12.12.2020 12:12',
  },
  {id: 5, name: 'Veli Ayşe', createdAt: '12.12.2020 12:12'},
  {id: 6, name: 'Ali Veli', createdAt: '12.12.2020 12:12'},
  {id: 7, name: 'Ayşe Fatma', createdAt: '12.12.2020 12:12'},
];
