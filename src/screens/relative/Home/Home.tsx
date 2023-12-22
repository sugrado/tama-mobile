import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  checkCameraPermission,
  showPermissionRequiredAlert,
} from '../../../utils/permission';
import SugradoBarcodeScanner from '../../../components/core/SugradoBarcodeScanner';
import {CustomError, isCritical} from '../../../utils/customErrors';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import Loading from '../../../components/layout/Loading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {COLORS} from '../../../constants';
import {getByRelative} from '../../../api/patients/patient';
import {GetByRelativeListItemDto} from '../../../api/patients/dtos/get-by-relative-list-item.dto';
import {PatientListElement} from './PatientListElement';

const Home = () => {
  const [scanner, setScanner] = useState<JSX.Element>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [myPatients, setMyPatients] = useState<
    GetByRelativeListItemDto[] | null
  >(null);

  useEffect(() => {
    getMyPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (scanner) {
    return scanner;
  }

  const getMyPatients = async () => {
    setLoading(true);
    const response = await getByRelative();
    setError(response.error);
    setMyPatients(response.data!.items);
    setLoading(false);
  };

  const onBack = () => {
    setScanner(undefined);
  };

  const onScanned = (code: string) => {
    onBack();
    console.log(code);
  };

  const handleClickListElement = (item: GetByRelativeListItemDto) => {
    console.log(item);
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
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getMyPatients} />
      ) : (
        <View style={styles.container}>
          {myPatients && (
            <>
              {myPatients.length > 0 ? (
                <>
                  {myPatients.length === 1 ? (
                    <Text>Patient card</Text>
                  ) : (
                    <>
                      <View style={styles.last_patients_title_container}>
                        <MaterialCommunityIcons
                          name="account-multiple"
                          size={26}
                          color={COLORS.BUTTON_COLOR}
                        />
                        <Text
                          variant="titleMedium"
                          style={styles.last_patients_title}>
                          Yakını Olduklarım
                        </Text>
                      </View>
                      <FlatList
                        data={myPatients}
                        keyExtractor={(item, index) =>
                          item.fullName + index.toString()
                        }
                        renderItem={({item}) => (
                          <PatientListElement
                            item={item}
                            onPress={handleClickListElement}
                          />
                        )}
                      />
                    </>
                  )}
                </>
              ) : (
                <TouchableOpacity
                  style={styles.box}
                  activeOpacity={0.5}
                  onPress={handleScanQRCode}>
                  <View style={styles.left_content}>
                    <Text variant="headlineSmall" style={styles.title}>
                      QR Kod Tara
                    </Text>
                    <Text variant="bodyMedium" style={styles.description}>
                      Yakını olduğunuz kişinin QR kodunu okutarak bildirimlerden
                      anında haberdar olun.
                    </Text>
                  </View>
                  <View style={styles.right_content}>
                    <MaterialCommunityIcons
                      name="qrcode-scan"
                      size={80}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
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
    marginBottom: 15,
    alignSelf: 'center',
  },
  last_patients_title: {
    color: COLORS.BUTTON_COLOR,
    marginStart: 10,
    fontWeight: 'bold',
  },
});

export default Home;
