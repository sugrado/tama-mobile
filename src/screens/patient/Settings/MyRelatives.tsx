import React, {useEffect, useState} from 'react';
import {CustomError, isCritical} from '../../../utils/customErrors';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import {Text} from 'react-native-paper';
import SugradoSuccessSnackbar from '../../../components/core/SugradoSuccessSnackbar';
import Loading from '../../../components/layout/Loading';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  getMyRelatives,
  remove,
} from '../../../api/patientRelatives/patientRelative';
import {
  GetMyRelativesListItemDto,
  GetMyRelativesRelativeDto,
} from '../../../api/patientRelatives/dto/get-my-relatives-list-item.dto';
import {COLORS} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SugradoInfoCard from '../../../components/core/SugradoInfoCard';

const MyRelatives = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [myRelatives, setMyRelatives] = useState<
    GetMyRelativesListItemDto[] | null
  >(null);

  useEffect(() => {
    getRelatives();
  }, []);

  const getRelatives = async () => {
    setLoading(true);
    const response = await getMyRelatives();
    if (response?.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setError(null);
    setMyRelatives(response.data!.items);
    setLoading(false);
  };

  const handleDeleteRequest = async (relativeId: number) => {
    setLoading(true);
    const response = await remove(relativeId);
    if (response?.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setError(null);
    await getRelatives();
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getRelatives} />
      ) : (
        <TopSmallIconLayout pageName="Ayarlar | Yakınlarım">
          <View style={styles.container}>
            {myRelatives && myRelatives.length > 0 ? (
              myRelatives.map(relative => (
                <RelativeListItem
                  key={relative.relative.id}
                  relative={relative.relative}
                  onDeleteRequest={handleDeleteRequest}
                />
              ))
            ) : (
              <SugradoInfoCard
                text="Kayıtlı yakınınız bulunmamaktadır. Yakın eklemek için sırasıyla şu adımları takip ediniz: 1) Yakınınızın cep telefonuna TAMA uygulamasını indirin. 2) Yakınınız TAMA uygulamasında 'Hasta Yakını' butonu üzerinden kayıt olmalı ve giriş yapmalıdır. 3) Yakınınız 'Ayarlar' sayfasından 'QR Kod Okut' seçeneğini seçmelidir. Bu ekranda siz de kendi uygulamanızın 'Ayarlar' sayfasından 'QR Kodum' seçeneğini seçerek yakınınıza QR kodunuzu okutmalısınız."
                icon="information-circle"
                style={styles.info_card}
              />
            )}
          </View>
        </TopSmallIconLayout>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
      <SugradoSuccessSnackbar setVisible={setSuccess} visible={success} />
    </>
  );
};

type RelativeListItemProps = {
  relative: GetMyRelativesRelativeDto;
  onDeleteRequest: (relativeId: number) => void;
};

const RelativeListItem = ({
  relative,
  onDeleteRequest,
}: RelativeListItemProps) => {
  return (
    <View style={styles.relative_list_item_container}>
      <Text variant="bodyMedium" style={styles.relative_list_item_name_text}>
        {relative.fullName}
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => onDeleteRequest(relative.id)}>
        <MaterialIcons name="cancel" size={24} color={COLORS.DARK_RED} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  relative_list_item_container: {
    backgroundColor: COLORS.MODAL_BACKGROUND_COLOR,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  relative_list_item_name_text: {
    color: COLORS.BUTTON_COLOR,
    fontWeight: 'bold',
  },
  info_card: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default MyRelatives;
