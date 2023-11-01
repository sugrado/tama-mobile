import React, {useEffect, useRef, useState} from 'react';
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

class CreatedAppointmentDto {
  doctorFullName: string;
  date: string;
  time: string;
}

type NewAppointmentProps = {
  onAppointmentCreated: (appointment: CreatedAppointmentDto) => void;
};

const NewAppointment = ({onAppointmentCreated}: NewAppointmentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<SelectBoxData[] | null>(null);
  const [dates, setDates] = useState<SelectBoxData[] | null>(null);
  const [times, setTimes] = useState<SelectBoxData[] | null>(null);
  const doctorDropdownRef: any = useRef();
  const dateDropdownRef: any = useRef();
  const timeDropdownRef: any = useRef();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setDoctors(dummyData.doctors);
  }, []);

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

  const showModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const onSubmit = (data: any) => {
    setLoading(true);
    // TODO: API call
    console.log(data);
    onAppointmentCreated({
      doctorFullName: 'Eduardo Wayon',
      date: '2023-10-5',
      time: '10:00',
    } as CreatedAppointmentDto);
    hideModal();
    setLoading(false);
  };

  function wait(ms: any) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  }

  const loadDatesByDoctor = async (doctorId: string) => {
    // TODO: backend request and filter dates by doctor
    setLoading(true);
    resetDate();
    resetTime();
    await wait(2000);
    setDates(dummyData.dates);
    setLoading(false);
  };

  const loadTimesByDate = (date: string) => {
    // TODO: backend request and filter times by date
    setLoading(true);
    resetTime();
    setTimes(dummyData.times);
    setLoading(false);
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
                btnDefaultText="Doktorunuzu Seçiniz"
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
                disabled={getValues('doctorId') === ''}
                data={dates || []}
                label="Tarih"
                btnDefaultText="Tarih Seçiniz"
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
                disabled={getValues('date') === ''}
                data={times || []}
                label="Saat"
                btnDefaultText="Saat Seçiniz"
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

const dummyData = {
  doctors: [
    {
      id: '1',
      value: 'Eduardo Wayon',
    },
    {
      id: '2',
      value: 'Tamera Peinke',
    },
    {
      id: '3',
      value: 'Karie Hubner',
    },
    {
      id: '4',
      value: 'Verla Archanbault',
    },
    {
      id: '5',
      value: 'Lindi Allcorn',
    },
    {
      id: '6',
      value: 'Ilysa Cabane',
    },
    {
      id: '7',
      value: 'Mendy Kleinsinger',
    },
    {
      id: '8',
      value: 'Bradford Mansford',
    },
    {
      id: '9',
      value: 'Whitby Dance',
    },
    {
      id: '10',
      value: 'Kit Malden',
    },
    {
      id: '11',
      value: 'Goldina Dunk',
    },
    {
      id: '12',
      value: 'Pebrook Revelle',
    },
    {
      id: '13',
      value: 'Linnell Mottershaw',
    },
    {
      id: '14',
      value: 'Karia Garnar',
    },
    {
      id: '15',
      value: 'Johnathon Toyer',
    },
    {
      id: '16',
      value: 'Flora Densey',
    },
    {
      id: '17',
      value: 'Kathie Geerdts',
    },
    {
      id: '18',
      value: 'Riva Bromont',
    },
    {
      id: '19',
      value: 'Issy McCay',
    },
    {
      id: '20',
      value: 'Chester Passie',
    },
    {
      id: '21',
      value: 'Ula Paterson',
    },
    {
      id: '22',
      value: 'Yancey Berkeley',
    },
    {
      id: '23',
      value: 'Garreth Riepl',
    },
    {
      id: '24',
      value: 'Alayne Puddin',
    },
    {
      id: '25',
      value: 'Dal Mahaddie',
    },
    {
      id: '26',
      value: 'Nessie Girhard',
    },
    {
      id: '27',
      value: 'Peadar Hail',
    },
    {
      id: '28',
      value: 'Erin Flag',
    },
    {
      id: '29',
      value: 'Glenna Gadney',
    },
    {
      id: '30',
      value: 'Jannelle Frawley',
    },
  ] as SelectBoxData[],
  dates: [
    {
      id: '1',
      value: '2023-10-5',
    },
    {
      id: '2',
      value: '2023-10-6',
    },
    {
      id: '3',
      value: '2023-10-9',
    },
    {
      id: '4',
      value: '2023-10-10',
    },
  ] as SelectBoxData[],
  times: [
    {
      id: '1',
      value: '10:00',
    },
    {
      id: '2',
      value: '10:30',
    },
    {
      id: '3',
      value: '11:00',
    },
    {
      id: '4',
      value: '11:30',
    },
  ] as SelectBoxData[],
};
