import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../../constants';
import DailyMedicineCard from './DailyMedicineCard';
import Loading from '../../../../components/layout/Loading';
import MedicineUsingModal from './MedicineUsingModal';
import {getMyDailyMedicines} from '../../../../api/patients/patient';
import {GetMyDailyMedicineDto} from '../../../../api/patients/dtos/my-daily-medicine.dto';
import {CustomError, isCritical} from '../../../../utils/customErrors';
import SugradoErrorPage from '../../../../components/core/SugradoErrorPage';

const DailyMedicines = () => {
  const [medicines, setMedicines] = useState<GetMyDailyMedicineDto[] | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [openModals, setOpenModals] = useState<Record<number, boolean>>({});

  useEffect(() => {
    getMedicines();
  }, []);

  const getMedicines = async () => {
    setLoading(true);
    const res = await getMyDailyMedicines();
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setMedicines(res.data);
    setLoading(false);
  };

  const toggleModal = (medicineId: number) => {
    setOpenModals({...openModals, [medicineId]: !openModals[medicineId]});
  };

  return (
    <>
      {loading && <Loading loading={loading} fillBackground={true} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getMedicines} />
      ) : (
        medicines &&
        medicines.length > 0 &&
        medicines.map(medicine => {
          const allUsed = medicine.times.every((time: any) => time.used);
          return (
            <React.Fragment key={medicine.medicineId}>
              <DailyMedicineCard
                allUsed={allUsed}
                backgroundColor={
                  allUsed
                    ? COLORS.CARD_SUCCESS_BACKGROUND
                    : COLORS.CARD_UNSUCCESS_BACKGROUND
                }
                medicine={medicine}
                onPress={() => {
                  toggleModal(medicine.medicineId);
                }}
              />
              <MedicineUsingModal
                data={medicine.times}
                medicineId={medicine.medicineId}
                title={medicine.name + ' ilacına ait kullanımlar'}
                visible={openModals[medicine.medicineId]}
                onCompleted={(newMedicines, allMedicinesUsed) => {
                  setMedicines(newMedicines);
                  if (allMedicinesUsed) {
                    toggleModal(medicine.medicineId);
                  }
                }}
                onDismiss={() => {
                  toggleModal(medicine.medicineId);
                }}
              />
            </React.Fragment>
          );
        })
      )}
    </>
  );
};

export default DailyMedicines;
