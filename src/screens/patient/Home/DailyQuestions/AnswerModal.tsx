import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import SugradoModal from '../../../../components/core/SugradoModal';
import SugradoSelectBox, {
  SelectBoxData,
} from '../../../../components/core/SugradoSelectBox';
import Loading from '../../../../components/layout/Loading';
import {QuestionDto} from '../../../../dtos/question.dto';
import {questions_dummydata} from './DailyQuestions';

type AnswerModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onCompleted: (questions: QuestionDto[]) => void;
  title: string;
  label: string;
  data: SelectBoxData[];
  questionId: string;
};

const AnswerModal = ({
  visible,
  onDismiss,
  onCompleted,
  title,
  label,
  data,
  questionId,
}: AnswerModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleCompleted = async (selectedItem: any, _: number) => {
    // TODO: go to api and save data
    // axiosInstance
    //   .post(`daily-questions`, {
    //     answer: selectedItem.id,
    //     questionId: questionId,
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    setLoading(true);
    await wait(2000);
    onCompleted(questions_dummydata as QuestionDto[]); // TODO: post servisinden geriye güncellenmiş sorular dönecek.
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
      <SugradoModal visible={visible} onDismiss={onDismiss}>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        <SugradoSelectBox
          data={data}
          displayValue={e => e.value}
          label={label}
          onSelected={handleCompleted}
        />
      </SugradoModal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default AnswerModal;
