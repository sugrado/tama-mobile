import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomError, isCritical} from '../../../utils/customErrors';
import {GetByPatientListItemDto} from '../../../api/dailyQuestionAnswers/dto/get-by-patient-list-item.dto';
import {getPatientAnsweredQuestions} from '../../../api/dailyQuestionAnswers/dailyQuestionAnswer';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import Loading from '../../../components/layout/Loading';
import SugradoInfoCard from '../../../components/core/SugradoInfoCard';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {PatientAnsweredQuestionListItem} from './components/PatientAnsweredQuestionsListItem';

const DailyQuestionAnswers = ({route}: any) => {
  const {patientId} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    GetByPatientListItemDto[]
  >([]);
  const [page, setPage] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    getAnsweredQuestions(0);
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAnsweredQuestions = async (pageNum: number) => {
    setLoading(true);
    const res = await getPatientAnsweredQuestions(patientId, pageNum, 10);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setHasNext(res.data!.hasNext);
    setAnsweredQuestions(prev =>
      pageNum === 0 ? res.data!.items : [...prev, ...res.data!.items],
    );
    setLoading(false);
  };

  const getMoreAnsweredQuestion = async () => {
    if (!hasNext) {
      return;
    }
    await getAnsweredQuestions(page + 1);
    setPage(page + 1);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage
          retry={() => {
            getAnsweredQuestions(0);
            setPage(0);
          }}
        />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={answeredQuestions}
            renderItem={({item}) => (
              <PatientAnsweredQuestionListItem answeredQuestion={item} />
            )}
            keyExtractor={(item: GetByPatientListItemDto) => item.date}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  getAnsweredQuestions(0);
                  setPage(0);
                }}
              />
            }
            onEndReached={getMoreAnsweredQuestion}
            ListEmptyComponent={EmptyList}
          />
        </View>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const EmptyList = () => (
  <SugradoInfoCard
    text="Hastanın kronik hastalığı bulunmamaktadır."
    icon="information-circle"
    style={styles.info_card}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info_card: {
    alignSelf: 'center',
    margin: 10,
  },
});

export default DailyQuestionAnswers;
