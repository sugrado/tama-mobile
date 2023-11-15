import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../../constants';
import DailyQuestionCard from './DailyQuestionCard';
import AnswerModal from './AnswerModal';
import Loading from '../../../../components/layout/Loading';
import {
  OptionDto,
  QuestionDto,
} from '../../../../api/patients/dtos/question.dto';

const DailyQuestions = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModals, setOpenModals] = useState<Record<number, boolean>>({});

  // TODO: günlük sorular api'dan çekilecek. buna göre statusColor, backgroundColor ve statusText değişecek.
  useEffect(() => {
    setLoading(true);
    setQuestions(questions_dummydata);
    setLoading(false);
  }, []);

  const toggleModal = (questionId: number) => {
    setOpenModals({...openModals, [questionId]: !openModals[questionId]});
  };

  return (
    <>
      {loading && <Loading loading={loading} fillBackground={true} />}
      {questions.map(question => {
        return (
          <React.Fragment key={question.id}>
            <DailyQuestionCard
              answered={question.answered}
              answer={question.answer}
              statusText={question.answered ? 'Cevaplandı' : 'Cevaplanmadı'}
              statusColor={
                question.answered ? COLORS.THEME_COLOR : COLORS.DARK_RED
              }
              backgroundColor={
                question.answered
                  ? COLORS.CARD_SUCCESS_BACKGROUND
                  : COLORS.CARD_UNSUCCESS_BACKGROUND
              }
              bodyText={question.description}
              onPress={() => {
                toggleModal(question.id);
              }}
            />
            <AnswerModal
              data={question.options}
              questionId={question.id}
              label={question.fieldLabel}
              title={question.modalTitle}
              visible={openModals[question.id]}
              onCompleted={newQuestions => {
                setQuestions(newQuestions);
                toggleModal(question.id);
              }}
              onDismiss={() => {
                toggleModal(question.id);
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default DailyQuestions;

export const questions_dummydata = [
  {
    id: 1,
    description: 'Kendini nasıl hissediyorsun?',
    options: [
      {id: '11', value: '10'},
      {id: '10', value: '9'},
      {id: '9', value: '8'},
      {id: '8', value: '7'},
      {id: '7', value: '6'},
      {id: '6', value: '5'},
      {id: '5', value: '4'},
      {id: '4', value: '3'},
      {id: '3', value: '2'},
      {id: '2', value: '1'},
      {id: '1', value: '0'},
    ] as OptionDto[],
    modalTitle: 'Kendini Nasıl Hissediyorsun?',
    fieldLabel: '0-10 arasında seçim yap',
    answered: false,
    answer: null,
  },
  {
    id: 2,
    description: 'Kaç saat uyudun?',
    options: [
      {id: '6', value: '9+ saat'},
      {id: '5', value: '7-9 saat'},
      {id: '4', value: '5-7 saat'},
      {id: '3', value: '3-5 saat'},
      {id: '2', value: '1-3 saat'},
      {id: '1', value: '0-1 saat'},
    ] as OptionDto[],
    modalTitle: 'Kaç Saat Uyudun?',
    fieldLabel: 'Saat aralığı seç',
    answered: true,
    answer: '9+ saat',
  },
  {
    id: 3,
    description: 'İntihar düşüncen nedir?',
    options: [
      {id: '2', value: 'Hayır'},
      {id: '1', value: 'Evet'},
    ] as OptionDto[],
    modalTitle: 'İntihar Düşüncen Nedir?',
    fieldLabel: 'Seçenek seç',
    answered: false,
    answer: null,
  },
] as QuestionDto[];
