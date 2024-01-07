import React, {Fragment, useState} from 'react';
import {Divider, IconButton, Text} from 'react-native-paper';
import {FlatList, StyleSheet, View} from 'react-native';
import SugradoModal from '../../../../components/core/SugradoModal';
import Loading from '../../../../components/layout/Loading';
import {COLORS} from '../../../../constants';
import {GetMyDailyMedicineTimeDto} from '../../../../api/patients/dtos/my-daily-medicine.dto';
import {CustomError} from '../../../../utils/customErrors';
import {saveMedicineUsage} from '../../../../api/diagnosisMedicineTimeUsages/diagnosisMedicineTimeUsage';

type MedicineUsingModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onCompleted: () => void;
  title: string;
  data: GetMyDailyMedicineTimeDto[];
  medicineId: number;
  setError: React.Dispatch<React.SetStateAction<CustomError | null>>;
};

const MedicineUsingModal = ({
  visible,
  onDismiss,
  onCompleted,
  title,
  data,
  medicineId,
  setError,
}: MedicineUsingModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleUsed = async (time: string, used: boolean) => {
    setLoading(true);
    const res = await saveMedicineUsage({
      medicineId: medicineId,
      time: time,
      used: used,
      requestedAt: new Date(),
    });
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(false);
    onCompleted();
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      <SugradoModal visible={visible} onDismiss={onDismiss} dismissable={true}>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        <FlatList
          data={data}
          renderItem={({item}) => <Item item={item} onSelected={handleUsed} />}
          keyExtractor={(item: GetMyDailyMedicineTimeDto) => item.time}
        />
      </SugradoModal>
    </>
  );
};

type ItemProps = {
  item: GetMyDailyMedicineTimeDto;
  onSelected: (time: string, used: boolean) => void;
};

const Item = ({item, onSelected}: ItemProps) => (
  <Fragment>
    <View style={styles.item_container}>
      <Text>{item.time}</Text>
      <View style={styles.button_container}>
        {item.used != null ? (
          item.used ? (
            <IconButton
              icon="check-circle"
              disabled={true}
              size={24}
              onPress={() => {
                onSelected(item.time, false);
              }}
            />
          ) : (
            <IconButton
              icon="close-circle"
              disabled={true}
              size={24}
              onPress={() => {
                onSelected(item.time, true);
              }}
            />
          )
        ) : (
          <>
            <IconButton
              icon="close-circle"
              iconColor={COLORS.DARK_RED}
              size={24}
              onPress={() => {
                onSelected(item.time, false);
              }}
            />
            <IconButton
              icon="check-circle"
              iconColor="#4d7e3e"
              size={24}
              onPress={() => {
                onSelected(item.time, true);
              }}
            />
          </>
        )}
      </View>
    </View>
    <Divider />
  </Fragment>
);

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  item_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MedicineUsingModal;
