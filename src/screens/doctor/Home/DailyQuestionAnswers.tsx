import {View, Text} from 'react-native';
import React from 'react';

const DailyQuestionAnswers = ({route}: any) => {
  const {code} = route.params;

  return (
    <View>
      <Text>{code}</Text>
    </View>
  );
};

export default DailyQuestionAnswers;
