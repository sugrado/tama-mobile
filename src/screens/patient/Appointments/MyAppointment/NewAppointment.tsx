import React, {Dispatch, useRef, useState} from 'react';
import SugradoButton from '../../../../components/core/SugradoButton';
import {Text} from 'react-native-paper';
import {StyleSheet, ScrollView, View} from 'react-native';
import SugradoSelectBox, {
  SelectBoxData,
} from '../../../../components/core/SugradoSelectBox';
import SugradoModal from '../../../../components/core/SugradoModal';
import Loading from '../../../../components/layout/Loading';
import {useForm} from 'react-hook-form';
import {FORM_ERROR_MESSAGES} from '../../../../constants';
import SugradoFormField from '../../../../components/core/SugradoFormField';
import {getListForAppointment} from '../../../../api/doctors/doctor';
import {CustomError} from '../../../../utils/customErrors';
import {
  create,
  getAvailableTimesFromDoctorAndDate,
  getDoctorAvailableDates,
} from '../../../../api/appointments/appointment';
import {FormatType, formatDate} from '../../../../utils/helpers';
import {
  CreateAppointmentCommand,
  CreatedAppointmentResponse,
} from '../../../../api/appointments/dtos/create-appointment-command';

type NewAppointmentProps = {
  onAppointmentCreated: (appointment: CreatedAppointmentResponse) => void;
  setError: Dispatch<React.SetStateAction<CustomError | null>>;
  setSuccess: Dispatch<React.SetStateAction<boolean>>;
};

const NewAppointment = ({
  onAppointmentCreated,
  setError,
  setSuccess,
}: NewAppointmentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<SelectBoxData[] | null>(null);
  const [dates, setDates] = useState<SelectBoxData[] | null>(null);
  const [times, setTimes] = useState<SelectBoxData[] | null>(null);
  const doctorDropdownRef: any = useRef();
  const dateDropdownRef: any = useRef();
  const timeDropdownRef: any = useRef();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset: resetForm,
    getValues,
  } = useForm({
    defaultValues: {
      doctorId: '',
      date: '',
      time: '',
    },
  });

  const rules = {
    doctorId: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
    },
    date: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
    },
    time: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
    },
  };

  const showModal = async () => {
    resetFormAndDataSources();
    await getDoctors();
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const appointment = {
      doctorId: Number(data.doctorId),
      takenDate: data.date,
      probableStartTime: data.time.split('-')[0],
      probableEndTime: data.time.split('-')[1],
    } as CreateAppointmentCommand;
    const createdResponse = await create(appointment);
    if (createdResponse?.error) {
      setError(createdResponse.error);
      setModalVisible(false);
      setLoading(false);
      return;
    }
    setError(null);
    onAppointmentCreated(createdResponse.data!);
    hideModal();
    setSuccess(true);
    setLoading(false);
  };

  const loadDatesByDoctor = async (doctorId: string) => {
    setLoading(true);
    resetDate();
    resetTime();
    await getDates(Number(doctorId));
    setLoading(false);
  };

  const loadTimesByDate = async (date: string) => {
    setLoading(true);
    resetTime();
    await getTimes(Number(getValues('doctorId')), date);
    setLoading(false);
  };

  const getDoctors = async () => {
    setLoading(true);
    const res = await getListForAppointment();
    if (res?.error) {
      setError(res.error);
      setModalVisible(false);
      setLoading(false);
      return;
    }
    setError(null);
    setDoctors(
      res.data!.items.map(e => ({
        id: String(e.id),
        value: e.fullName,
      })) as SelectBoxData[],
    );
    setLoading(false);
  };

  const getDates = async (doctorId: number) => {
    const res = await getDoctorAvailableDates(doctorId);
    if (res?.error) {
      setError(res.error);
      setModalVisible(false);
      setLoading(false);
      return;
    }
    setError(null);
    setDates(
      res.data!.map(e => ({
        id: e.date,
        value: formatDate(e.date, FormatType.DATE),
      })) as SelectBoxData[],
    );
  };

  const getTimes = async (doctorId: number, date: string) => {
    const res = await getAvailableTimesFromDoctorAndDate(doctorId, date);
    if (res?.error) {
      setError(res.error);
      setModalVisible(false);
      setLoading(false);
      return;
    }
    setError(null);
    setTimes(
      res.data!.map(e => ({
        id: `${e.startTime}-${e.endTime}`,
        value: `${formatDate(e.startTime, FormatType.TIME)} - ${formatDate(
          e.endTime,
          FormatType.TIME,
        )}`,
      })) as SelectBoxData[],
    );
  };

  const resetFormAndDataSources = () => {
    resetForm();
    setDoctors(null);
    setDates(null);
    setTimes(null);
  };

  const resetTime = () => {
    timeDropdownRef.current && timeDropdownRef.current.reset();
    setValue('time', '');
    setTimes(null);
  };

  const resetDate = () => {
    dateDropdownRef.current && dateDropdownRef.current.reset();
    setValue('date', '');
    setDates(null);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      <SugradoButton
        title="Randevu al"
        icon="calendar-plus"
        onPress={showModal}
        style={styles.new_appointment_button}
      />
      <SugradoModal visible={modalVisible} onDismiss={hideModal}>
        <Text variant="titleLarge" style={styles.modal_header_text}>
          Randevu Oluştur
        </Text>
        <ScrollView>
          <SugradoFormField
            control={control}
            name="doctorId"
            rules={rules.doctorId}
            style={styles.input}
            error={errors && errors.doctorId}
            render={({field: {onChange, onBlur}}) => (
              <SugradoSelectBox
                innerRef={doctorDropdownRef}
                data={doctors || []}
                label="Doktor"
                btnDefaultText={
                  doctors && doctors.length < 1
                    ? 'Uygun doktor bulunamadı.'
                    : 'Doktorunuzu Seçiniz'
                }
                disabled={!doctors || doctors.length < 1}
                displayValue={item => item.value}
                onSelected={(selectedItem, _) => {
                  onChange(selectedItem.id);
                  loadDatesByDoctor(selectedItem.id);
                }}
                onBlur={onBlur}
              />
            )}
          />
          <SugradoFormField
            control={control}
            name="date"
            rules={rules.date}
            style={styles.input}
            error={errors && errors.date}
            render={({field: {onChange, onBlur}}) => (
              <SugradoSelectBox
                innerRef={dateDropdownRef}
                disabled={
                  getValues('doctorId') === '' || !dates || dates.length < 1
                }
                data={dates || []}
                label="Tarih"
                btnDefaultText={
                  dates && dates.length < 1
                    ? 'Uygun tarih bulunamadı.'
                    : 'Tarih Seçiniz'
                }
                displayValue={item => item.value}
                onSelected={(selectedItem, _) => {
                  onChange(selectedItem.id);
                  loadTimesByDate(selectedItem.id);
                }}
                onBlur={onBlur}
              />
            )}
          />
          <SugradoFormField
            control={control}
            name="time"
            style={styles.input}
            rules={rules.time}
            error={errors && errors.time}
            render={({field: {onChange, onBlur}}) => (
              <SugradoSelectBox
                innerRef={timeDropdownRef}
                disabled={
                  getValues('date') === '' || !times || times.length < 1
                }
                data={times || []}
                label="Saat"
                btnDefaultText={
                  times && times.length < 1
                    ? 'Uygun saat bulunamadı'
                    : 'Saat Seçiniz'
                }
                displayValue={item => item.value}
                onSelected={(selectedItem, _) => {
                  onChange(selectedItem.id);
                }}
                onBlur={onBlur}
              />
            )}
          />
          <View style={styles.modal_footer}>
            <SugradoButton
              onPress={hideModal}
              title="Vazgeç"
              buttonColor="gray"
              style={styles.modal_footer_button}
            />
            <SugradoButton
              title="Tamamla"
              onPress={handleSubmit(onSubmit)}
              style={styles.modal_footer_button}
            />
          </View>
        </ScrollView>
      </SugradoModal>
    </>
  );
};

const styles = StyleSheet.create({
  new_appointment_button: {
    marginTop: 10,
    width: '80%',
  },
  modal_footer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modal_footer_button: {
    marginHorizontal: 5,
  },
  modal_header_text: {
    textAlign: 'center',
    marginBottom: 25,
  },
  field: {
    marginBottom: 10,
  },
  input: {
    marginTop: 15,
  },
});

export default NewAppointment;
