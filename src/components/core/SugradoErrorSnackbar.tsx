import React, {useEffect, useState} from 'react';
import {CustomError, isCritical} from '../../utils/customErrors';
import {Snackbar} from 'react-native-paper';
import {COLORS} from '../../constants';

type SugradoErrorSnackbarProps = {
  error: CustomError;
  duration?: number;
  retry?: () => void;
};

const SugradoErrorSnackbar = ({
  error,
  duration = 2000,
}: SugradoErrorSnackbarProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (error) {
      setMessage(error.message);
      setVisible(true);
    }
  }, [error]);

  const detectBackgroundColor = () =>
    isCritical(error) ? {backgroundColor: COLORS.DARK_RED} : null;

  return (
    <Snackbar
      style={detectBackgroundColor()}
      visible={visible}
      duration={duration}
      onDismiss={() => {
        setVisible(false);
      }}>
      {message}
    </Snackbar>
  );
};

export default SugradoErrorSnackbar;
