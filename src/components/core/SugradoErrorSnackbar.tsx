import React, {useEffect, useState} from 'react';
import {
  AuthorizationError,
  CustomError,
  InternalServerError,
  RequestError,
} from '../../utils/customErrors';
import {Button, Snackbar, Text} from 'react-native-paper';
import {COLORS} from '../../constants';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

type SugradoErrorSnackbarProps = {
  error: CustomError;
  duration?: number;
  retry?: () => void;
};

const SugradoErrorSnackbar = ({
  error,
  duration = 2000,
  retry = undefined,
}: SugradoErrorSnackbarProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (error) {
      setMessage(error.message);
      setVisible(true);
    }
  }, [error]);

  const detectBackgroundColor = () => {
    if (
      error instanceof InternalServerError ||
      error instanceof AuthorizationError ||
      error instanceof RequestError
    ) {
      return {backgroundColor: COLORS.DARK_RED};
    } else {
      return null;
    }
  };

  return (
    <>
      {retry && (
        <View style={styles.retry_container}>
          <Entypo name="tools" size={80} color={COLORS.THEME_COLOR} />
          <Text variant="bodyMedium" style={styles.retry_text}>
            Lütfen internet bağlantınızı kontrol ettikten sonra tekrar deneyin.
            Sorun devam ederse bize bildirin.
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
      )}
      <Snackbar
        style={detectBackgroundColor()}
        visible={visible}
        duration={duration}
        onDismiss={() => {
          setVisible(false);
        }}>
        {message}
      </Snackbar>
    </>
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

export default SugradoErrorSnackbar;
