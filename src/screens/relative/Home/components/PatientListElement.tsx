import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../constants';
import {Divider, Text} from 'react-native-paper';
import {GetByRelativeListItemDto} from '../../../../api/patients/dtos/get-by-relative-list-item.dto';

type PatientListElementProps = {
  item: GetByRelativeListItemDto;
  onPress: (item: GetByRelativeListItemDto) => void;
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
        <MaterialCommunityIcons
          name="account"
          size={24}
          color={COLORS.BUTTON_COLOR}
        />
        <Text variant="bodyMedium" style={styles.list_item_text}>
          {item.fullName}
        </Text>
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
    margin: 10,
  },
  list_item_text: {
    marginStart: 5,
    color: 'black',
    flex: 1,
    flexWrap: 'wrap',
    marginEnd: 15,
  },
});
