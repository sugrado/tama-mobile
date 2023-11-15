import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, IconButton, Text} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import {DailyMedicineDto} from '../../../../api/patients/dtos/dailyMedicine.dto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type DailyMedicineCardProps = {
  onPress: () => void;
  medicine: DailyMedicineDto;
  backgroundColor: string;
  allUsed: boolean;
};

const DailyMedicineCard = ({
  onPress,
  medicine,
  backgroundColor,
  allUsed,
}: DailyMedicineCardProps) => {
  return (
    <Card
      style={{
        backgroundColor: backgroundColor,
        ...styles.card,
      }}
      onPress={allUsed ? () => {} : onPress}>
      <Card.Content>
        <View style={styles.cardBody}>
          <View style={styles.text_column}>
            <Text variant="bodyLarge">İlaç Adı: {medicine.name}</Text>
            {medicine.times?.map((time, index) => (
              <View key={time.id} style={styles.time_container}>
                <Text key={index} style={styles.time_text}>
                  {time.value}
                </Text>
                {time.used && (
                  <FontAwesome5
                    name="check-circle"
                    color={COLORS.THEME_COLOR}
                    size={16}
                  />
                )}
              </View>
            ))}
          </View>
          {!allUsed && (
            <IconButton
              style={styles.button_column}
              icon="file-document-edit-outline"
              iconColor={COLORS.BUTTON_COLOR}
              size={24}
              onPress={onPress}
            />
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderLeftColor: COLORS.THEME_COLOR,
    borderLeftWidth: 5,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  text_column: {
    flexDirection: 'column',
    display: 'flex',
    flexBasis: '80%',
    flex: 1,
  },
  button_column: {
    flexDirection: 'column',
    display: 'flex',
    flexBasis: '20%',
    flex: 1,
  },
  time_text: {
    color: 'gray',
    marginEnd: 5,
  },
  time_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DailyMedicineCard;
