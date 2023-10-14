import React, {useState} from 'react';
import {Divider, IconButton, Text} from 'react-native-paper';
import {FlatList, StyleSheet, View} from 'react-native';
import SugradoModal from '../../../components/core/SugradoModal';
import Loading from '../../../components/layout/Loading';
import axiosInstance from '../../../api/axios';
import {DailyMedicineDto, TimeDto} from '../../../dtos/dailyMedicine.dto';
import {COLORS} from '../../../constants';

type MedicineUsingModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onCompleted: (
    medicines: DailyMedicineDto[],
    allMedicinesUsed: boolean,
  ) => void;
  title: string;
  data: TimeDto[];
  medicineId: string;
};

const MedicineUsingModal = ({
  visible,
  onDismiss,
  onCompleted,
  title,
  data,
  medicineId,
}: MedicineUsingModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleUsed = async (timeId: string, isUsed: boolean) => {
    // TODO: go to api and save data
    // axiosInstance
    //   .patch(`daily-medicines`, {
    //     medicineId: medicineId,
    //     timeId: timeId,
    //     isUsed: isUsed,
    //   })
    //   .then((response) => {
    //     onCompleted(
    //       response.data as DailyMedicineDto[],
    //       response.data.find(p => p.id === Number(medicineId))?.times.every((time: TimeDto) => time.used)!,
    //     );
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    setLoading(true);
    await wait(2000);
    onCompleted(
      medicines_dummydata as DailyMedicineDto[],
      medicines_dummydata
        .find(p => p.id === Number(medicineId))
        ?.times.every((time: TimeDto) => time.used)!,
    ); // TODO: post servisinden geriye güncellenmiş ilaçlar dönecek.
    setLoading(false);
  };
  function wait(ms: any) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  }
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
          keyExtractor={(item: TimeDto) => item.id}
        />
      </SugradoModal>
    </>
  );
};

type ItemProps = {
  item: TimeDto;
  onSelected: (timeId: string, isUsed: boolean) => void;
};

const Item = ({item, onSelected}: ItemProps) => (
  <>
    <View style={styles.item_container}>
      <Text>{item.value}</Text>
      <View style={styles.button_container}>
        {!item.used && (
          <IconButton
            icon="close-circle"
            iconColor={COLORS.DARK_RED}
            size={24}
            onPress={() => {
              onSelected(item.id, false);
            }}
          />
        )}
        <IconButton
          icon="check-circle"
          iconColor={COLORS.THEME_GREEN}
          size={24}
          onPress={() => {
            onSelected(item.id, true);
          }}
          disabled={item.used}
        />
      </View>
    </View>
    <Divider />
  </>
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

const medicines_dummydata = [
  {
    id: 1,
    name: 'Martes foina',
    times: [
      {id: '1', value: '09:00', used: true},
      {id: '2', value: '21:00', used: true},
    ] as TimeDto[],
  },
  {
    id: 2,
    name: 'Canis lupus',
    times: [{id: '1', value: '12:30', used: true}] as TimeDto[],
  },
  {
    id: 3,
    name: 'Capreolus capreolus',
    times: [
      {id: '1', value: '09:00', used: true},
      {id: '2', value: '15:00', used: true},
      {id: '3', value: '21:00', used: false},
    ] as TimeDto[],
  },
] as DailyMedicineDto[];
