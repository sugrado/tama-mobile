import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../../constants';
import DailyMedicineCard from './DailyMedicineCard';
import Loading from '../../../../components/layout/Loading';
import {View} from 'react-native';
import {DailyMedicineDto, TimeDto} from '../../../../dtos/dailyMedicine.dto';
import MedicineUsingModal from './MedicineUsingModal';

const DailyMedicines = () => {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModals, setOpenModals] = useState<Record<number, boolean>>({});

  // TODO: günlük sorular api'dan çekilecek. buna göre statusColor, backgroundColor ve statusText değişecek.
  useEffect(() => {
    setLoading(true);
    setMedicines(medicines_dummydata);
    setLoading(false);
  }, []);

  const toggleModal = (medicineId: number) => {
    setOpenModals({...openModals, [medicineId]: !openModals[medicineId]});
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {medicines.map(medicine => {
        const allUsed = medicine.times.every((time: any) => time.used);
        return (
          <View key={medicine.id}>
            <DailyMedicineCard
              allUsed={allUsed}
              backgroundColor={
                allUsed
                  ? COLORS.CARD_SUCCESS_BACKGROUND
                  : COLORS.CARD_UNSUCCESS_BACKGROUND
              }
              medicine={medicine}
              onPress={() => {
                toggleModal(medicine.id);
              }}
            />
            <MedicineUsingModal
              data={medicine.times}
              medicineId={medicine.id}
              title={medicine.name + ' ilacına ait kullanımlar'}
              visible={openModals[medicine.id]}
              onCompleted={(newMedicines, allMedicinesUsed) => {
                setMedicines(newMedicines);
                if (allMedicinesUsed) {
                  toggleModal(medicine.id);
                }
              }}
              onDismiss={() => {
                toggleModal(medicine.id);
              }}
            />
          </View>
        );
      })}
    </>
  );
};

export default DailyMedicines;

export const medicines_dummydata = [
  {
    id: 1,
    name: 'Martes foina',
    times: [
      {id: '1', value: '09:00', used: true},
      {id: '2', value: '21:00', used: false},
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
