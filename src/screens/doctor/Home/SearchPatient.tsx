import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loading from '../../../components/layout/Loading';
import {qrSummary} from '../../../api/patients/patient';
import {GetQRSummaryResponse} from '../../../api/patients/dtos/get-summary-response';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {CustomError, isCritical} from '../../../utils/customErrors';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import {COLORS, PAGE_NAMES} from '../../../constants';
import {FormatType, calculateAge, formatDate} from '../../../utils/helpers';
import {PatientInfoRow} from './components/PatientInfoRow';
import {Button} from 'react-native-paper';

const SearchPatient = ({navigation, route}: any) => {
  const {code} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCode, setQRCode] = useState<string>();
  const [patient, setPatient] = useState<GetQRSummaryResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    getPatientInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPatientInfo = async () => {
    setLoading(true);
    const res = await qrSummary(code);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setPatient(res.data);
    const base64Image = 'data:image/png;base64,' + res.data!.qrCode;
    setQRCode(base64Image);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getPatientInfo} />
      ) : (
        patient && (
          <ScrollView>
            {/* <SegmentedButtons
              value={'undefined'}
              onValueChange={() => {}}
              buttons={[
                {
                  value: 'walk',
                  label: 'Yanıtlar',
                  labelStyle: {color: COLORS.TEXT},
                  style: {
                    backgroundColor: COLORS.BUTTON_COLOR,
                    borderColor: COLORS.TEXT,
                  },
                  onPress: () => {
                    navigation.navigate(
                      PAGE_NAMES.DOCTOR.HOME.DAILY_QUESTION_ANSWERS,
                      {
                        patientId: patient.id,
                      },
                    );
                  },
                },
                {
                  value: 'train',
                  label: 'Analizler',
                  labelStyle: {color: COLORS.TEXT},
                  style: {
                    backgroundColor: COLORS.BUTTON_COLOR,
                    borderColor: COLORS.TEXT,
                  },
                  onPress: () => {
                    navigation.navigate(
                      PAGE_NAMES.DOCTOR.HOME.MEDICINE_USAGE_ANALYSIS,
                      {
                        patientId: patient.id,
                      },
                    );
                  },
                },
                {
                  value: 'drive',
                  label: 'Kr. Hastalıklar',
                  labelStyle: {color: COLORS.TEXT},
                  style: {
                    backgroundColor: COLORS.BUTTON_COLOR,
                    borderColor: COLORS.TEXT,
                  },
                  onPress: () => {
                    navigation.navigate(
                      PAGE_NAMES.DOCTOR.HOME.CHRONIC_DISEASES,
                      {
                        patientId: patient.id,
                      },
                    );
                  },
                },
                {
                  value: 'drive',
                  label: 'Teşhisler',
                  labelStyle: {color: COLORS.TEXT},
                  style: {
                    backgroundColor: COLORS.BUTTON_COLOR,
                    borderColor: COLORS.TEXT,
                  },
                  onPress: () => {
                    navigation.navigate(PAGE_NAMES.DOCTOR.HOME.DIAGNOSES, {
                      patientId: patient.id,
                    });
                  },
                },
              ]}
              style={{margin: 10}}
            /> */}
            <View style={styles.navigation_buttons}>
              <Button
                mode="text"
                buttonColor={COLORS.BUTTON_COLOR}
                textColor={COLORS.TEXT}
                style={styles.navigation_button}
                onPress={() => {
                  navigation.navigate(
                    PAGE_NAMES.DOCTOR.HOME.DAILY_QUESTION_ANSWERS,
                    {
                      patientId: patient.id,
                    },
                  );
                }}
                theme={{dark: false}}>
                Gün. Yanıtlar
              </Button>
              <Button
                mode="text"
                buttonColor={COLORS.BUTTON_COLOR}
                textColor={COLORS.TEXT}
                style={styles.navigation_button}
                onPress={() => {
                  navigation.navigate(
                    PAGE_NAMES.DOCTOR.HOME.MEDICINE_USAGE_ANALYSIS,
                    {
                      patientId: patient.id,
                    },
                  );
                }}
                theme={{dark: false}}>
                İlaç Analizleri
              </Button>
              <Button
                mode="text"
                buttonColor={COLORS.BUTTON_COLOR}
                textColor={COLORS.TEXT}
                style={styles.navigation_button}
                onPress={() => {
                  navigation.navigate(PAGE_NAMES.DOCTOR.HOME.CHRONIC_DISEASES, {
                    patientId: patient.id,
                  });
                }}
                theme={{dark: false}}>
                Kr. Hastalıklar
              </Button>
              <Button
                mode="text"
                buttonColor={COLORS.BUTTON_COLOR}
                textColor={COLORS.TEXT}
                style={styles.navigation_button}
                onPress={() => {
                  navigation.navigate(PAGE_NAMES.DOCTOR.HOME.DIAGNOSES, {
                    patientId: patient.id,
                  });
                }}
                theme={{dark: false}}>
                Teşhisler
              </Button>
            </View>
            {qrCode && (
              <Image
                source={{uri: qrCode}}
                style={styles.qr_code}
                height={200}
                width={200}
              />
            )}
            <PatientInfoRow label="Ad Soyad" value={patient.fullName} />
            <PatientInfoRow label="Kullanıcı Adı" value={patient.username} />
            <PatientInfoRow label="TCKN" value={patient.identityNumber} />
            <PatientInfoRow
              label={'Doğum Tarihi'}
              value={`${formatDate(
                patient.birthAt,
                FormatType.DATE,
              )} (${calculateAge(patient.birthAt)} yaş)`}
            />
            <PatientInfoRow label="Cinsiyet" value={patient.genderName} />
            <PatientInfoRow label="Boy (cm)" value={patient.height} />
            <PatientInfoRow label="Kilo (kg)" value={patient.weight} />
            <PatientInfoRow
              label="Günlük Çay Tüketimi (ml)"
              value={patient.dailyTeaConsumption}
            />
            <PatientInfoRow
              label="Günlük Kahve Tüketimi (ml)"
              value={patient.dailyCoffeeConsumption}
            />
            <PatientInfoRow
              label="Sigara Kullanımı"
              value={patient.smoke ? 'Evet' : 'Hayır'}
            />
            <PatientInfoRow
              label="Alkol Kullanımı"
              value={patient.alcohol ? 'Evet' : 'Hayır'}
            />
            <PatientInfoRow
              label="Uyuşturucu Madde Kullanımı"
              value={patient.drugs ? 'Evet' : 'Hayır'}
            />
            <PatientInfoRow
              label="Kullandığı İlaçlar ve Sıklığı"
              value={patient.usingMedicinesAndFrequency ?? 'Bulunmuyor'}
            />
            <PatientInfoRow
              label="Geçirdiği Ameliyatlar"
              value={patient.previousSurgery ?? 'Bulunmuyor'}
            />
            <PatientInfoRow
              label="Alerji"
              value={patient.allergy ?? 'Bulunmuyor'}
            />
          </ScrollView>
        )
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const styles = StyleSheet.create({
  navigation_buttons: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navigation_button: {
    paddingHorizontal: 8,
    borderRadius: 10,
    margin: 5,
  },
  qr_code: {
    alignSelf: 'center',
  },
});

export default SearchPatient;
