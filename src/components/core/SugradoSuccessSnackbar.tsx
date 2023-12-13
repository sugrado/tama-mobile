import React, {Dispatch} from 'react';
import {Snackbar} from 'react-native-paper';
import {COLORS} from '../../constants';
import {StyleSheet} from 'react-native';

type SugradoSuccessSnackbarProps = {
  content?: string;
  duration?: number;
  visible: boolean;
  setVisible: Dispatch<React.SetStateAction<boolean>>;
};

const SugradoSuccessSnackbar = ({
  visible,
  setVisible,
  content = 'İşlem başarılı bir şekilde gerçekleştirildi.',
  duration = 2000,
}: SugradoSuccessSnackbarProps) => {
  return (
    <Snackbar
      style={styles.snackbar}
      visible={visible}
      duration={duration}
      onDismiss={() => {
        setVisible(false);
      }}>
      {content}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: COLORS.THEME_COLOR,
  },
});

export default SugradoSuccessSnackbar;
