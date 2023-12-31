import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../../constants';
import DailyQuestionCard from './DailyQuestionCard';
import AnswerModal from './AnswerModal';
import Loading from '../../../../components/layout/Loading';
import {CustomError, isCritical} from '../../../../utils/customErrors';
import {MyDailyQuestion} from '../../../../api/patients/dtos/my-daily-question.dto';
import SugradoErrorSnackbar from '../../../../components/core/SugradoErrorSnackbar';
import SugradoErrorPage from '../../../../components/core/SugradoErrorPage';
import SugradoSuccessSnackbar from '../../../../components/core/SugradoSuccessSnackbar';
import {getMyDailyQuestions} from '../../../../api/patients/patient';

const DailyQuestions = () => {
  const [questions, setQuestions] = useState<MyDailyQuestion[] | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModals, setOpenModals] = useState<Record<number, boolean>>({});

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    setLoading(true);
    const res = await getMyDailyQuestions();
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setQuestions(res.data);
    setLoading(false);
  };

  const toggleModal = (questionId: number) => {
    setOpenModals({...openModals, [questionId]: !openModals[questionId]});
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getQuestions} />
      ) : (
        questions &&
        questions.length > 0 &&
        questions.map(question => {
          const answer = question.multipleChoice
            ? question.selectedOption?.value
            : question?.answer;
          return (
            <React.Fragment key={question.questionId}>
              <DailyQuestionCard
                answer={answer}
                statusText={answer ? 'Cevaplandı' : 'Cevaplanmadı'}
                statusColor={answer ? COLORS.THEME_COLOR : COLORS.DARK_RED}
                backgroundColor={
                  answer
                    ? COLORS.CARD_SUCCESS_BACKGROUND
                    : COLORS.CARD_UNSUCCESS_BACKGROUND
                }
                bodyText={question.description}
                onPress={() => {
                  toggleModal(question.questionId);
                }}
              />
              <AnswerModal
                setError={e => {
                  toggleModal(question.questionId);
                  setError(e);
                }}
                data={question.options}
                questionId={question.questionId}
                label={question.fieldLabel}
                title={question.modalTitle}
                visible={openModals[question.questionId]}
                onCompleted={async () => {
                  toggleModal(question.questionId);
                  await getQuestions();
                  setSuccess(true);
                }}
                onDismiss={() => {
                  toggleModal(question.questionId);
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

export default DailyQuestions;
