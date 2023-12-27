import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {COLORS} from '../../../../constants';
import {Divider, Text} from 'react-native-paper';
import {LastTransactionDto} from '../../../../api/patientSearchTransactions/dto/get-my-last-transactions-response.dto';
import {FormatType, formatDate} from '../../../../utils/helpers';

type PatientListElementProps = {
  item: LastTransactionDto;
  onPress: (item: LastTransactionDto) => void;
};

export const PatientListElement = ({
  item,
  onPress,
}: PatientListElementProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.list_item_container}
        onPress={() => onPress(item)}
        activeOpacity={0.5}>
        <View style={styles.column_item}>
          <MaterialCommunityIcons
            name="account"
            size={30}
            color={COLORS.BUTTON_COLOR}
          />
          <Text variant="bodyMedium" style={styles.list_item_text}>
            {item.patientFullName}
          </Text>
        </View>
        <View style={styles.column_item}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={20}
            color={COLORS.BUTTON_COLOR}
          />
          <Text variant="bodyMedium" style={styles.date_text}>
            {formatDate(item.createdAt, FormatType.DATE_TIME)}
          </Text>
        </View>
      </TouchableOpacity>
      <Divider bold={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  list_item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  list_item_text: {
    marginStart: 5,
    color: COLORS.BUTTON_COLOR,
    flex: 1,
    flexWrap: 'wrap',
    marginEnd: 15,
    fontWeight: 'bold',
  },
  column_item: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  date_text: {
    color: 'gray',
    marginStart: 5,
  },
});
