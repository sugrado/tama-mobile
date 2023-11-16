import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import SugradoModal from '../../../../components/core/SugradoModal';
import SugradoSelectBox from '../../../../components/core/SugradoSelectBox';
import Loading from '../../../../components/layout/Loading';
import {PatientHomeDailyQuestionOption} from '../../../../api/dailyQuestions/dto/patient-home-daily-question.dto';
import {answerDailyQuestion} from '../../../../api/dailyQuestions/dailyQuestions';
import {AnswerDailyQuestionDto} from '../../../../api/dailyQuestions/dto/answer-daily-question.dto';
import {CustomError} from '../../../../utils/customErrors';
import SugradoErrorSnackbar from '../../../../components/core/SugradoErrorSnackbar';

type AnswerModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onCompleted: () => void;
  title: string;
  label: string;
  data: PatientHomeDailyQuestionOption[];
  questionId: number;
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
  const [error, setError] = useState<CustomError | null>();

  const handleCompleted = async (selectedItem: any, _: number) => {
    setLoading(true);
    const res = await answerDailyQuestion({
      dailyQuestionId: questionId,
      answer: String(selectedItem.id),
    } as AnswerDailyQuestionDto);
    setError(res.error);
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
      {error && <SugradoErrorSnackbar error={error} />}
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
