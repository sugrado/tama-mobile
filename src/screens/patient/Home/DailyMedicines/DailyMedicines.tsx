import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../../constants';
import DailyMedicineCard from './DailyMedicineCard';
import Loading from '../../../../components/layout/Loading';
import MedicineUsingModal from './MedicineUsingModal';
import {getMyDailyMedicines} from '../../../../api/patients/patient';
import {GetMyDailyMedicineDto} from '../../../../api/patients/dtos/my-daily-medicine.dto';
import {CustomError, isCritical} from '../../../../utils/customErrors';
import SugradoErrorPage from '../../../../components/core/SugradoErrorPage';
import SugradoErrorSnackbar from '../../../../components/core/SugradoErrorSnackbar';
import SugradoSuccessSnackbar from '../../../../components/core/SugradoSuccessSnackbar';

const DailyMedicines = () => {
  const [medicines, setMedicines] = useState<GetMyDailyMedicineDto[] | null>(
    null,
  );
  const [error, setError] = useState<CustomError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getMedicines} />
      ) : (
        medicines &&
        medicines.length > 0 &&
        medicines.map(medicine => {
          const allUsed = medicine.times.every(
            (time: any) => time.used !== null,
          );
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
                setError={e => {
                  toggleModal(medicine.medicineId);
                  setError(e);
                }}
                data={medicine.times}
                medicineId={medicine.medicineId}
                title={medicine.name + ' ilacına ait kullanımlar'}
                visible={openModals[medicine.medicineId]}
                onCompleted={async () => {
                  toggleModal(medicine.medicineId);
                  await getMedicines();
                  setSuccess(true);
                }}
                onDismiss={() => {
                  toggleModal(medicine.medicineId);
                }}
              />
            </React.Fragment>
          );
        })
      )}
      {error && <SugradoErrorSnackbar error={error} />}
      <SugradoSuccessSnackbar setVisible={setSuccess} visible={success} />
    </>
  );
};

export default DailyMedicines;
