import React from 'react';
import {Button, Text} from 'react-native-paper';
import {COLORS} from '../../constants';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

type SugradoErrorSnackbarProps = {
  retry: () => void;
};

const SugradoErrorPage = ({retry}: SugradoErrorSnackbarProps) => {
  return (
    <View style={styles.retry_container}>
      <Entypo name="tools" size={80} color={COLORS.THEME_COLOR} />
      <Text variant="bodyMedium" style={styles.retry_text}>
        Lütfen internet bağlantınızı kontrol ettikten sonra tekrar deneyin.
        Sorun devam ederse sistem yöneticisi ile iletişime geçin.
      </Text>
      <Button
        mode="outlined"
        onPress={retry}
        buttonColor="transparent"
        style={styles.retry_button}
        textColor={COLORS.BUTTON_COLOR}
        theme={{dark: false}}>
        Tekrar deneyin
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  retry_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  retry_text: {
    color: COLORS.THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  retry_button: {
    marginTop: 30,
    borderColor: COLORS.THEME_COLOR,
  },
});

export default SugradoErrorPage;
