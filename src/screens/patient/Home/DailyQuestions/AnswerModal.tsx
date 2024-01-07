import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import SugradoModal from '../../../../components/core/SugradoModal';
import SugradoSelectBox from '../../../../components/core/SugradoSelectBox';
import Loading from '../../../../components/layout/Loading';
import {answerDailyQuestion} from '../../../../api/dailyQuestions/dailyQuestions';
import {AnswerDailyQuestionDto} from '../../../../api/dailyQuestions/dto/answer-daily-question.dto';
import {CustomError} from '../../../../utils/customErrors';
import {MyDailyQuestionOption} from '../../../../api/patients/dtos/my-daily-question.dto';

type AnswerModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onCompleted: () => void;
  title: string;
  label: string;
  data: MyDailyQuestionOption[];
  questionId: number;
  setError: React.Dispatch<React.SetStateAction<CustomError | null>>;
};

const AnswerModal = ({
  visible,
  onDismiss,
  onCompleted,
  title,
  label,
  data,
  questionId,
  setError,
}: AnswerModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCompleted = async (selectedItem: any, _: number) => {
    setLoading(true);
    const res = await answerDailyQuestion({
      dailyQuestionId: questionId,
      answer: String(selectedItem.id),
    } as AnswerDailyQuestionDto);
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
