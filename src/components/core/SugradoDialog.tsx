import {Dialog, Portal, Text} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import SugradoButton from './SugradoButton';

type SugradoDialogProps = {
  visible: boolean;
  title: string;
  body: string;
  actionText: string;
  action: () => void;
  cancelText: string;
  cancelAction: () => void;
};

const SugradoDialog = ({
  visible,
  title,
  body,
  actionText,
  action,
  cancelText,
  cancelAction,
}: SugradoDialogProps) => {
  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={cancelAction}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{body}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <SugradoButton
            title={actionText}
            buttonColor={COLORS.BUTTON_COLOR}
            onPress={action}
          />
          <SugradoButton
            title={cancelText}
            buttonColor={COLORS.DARK_RED}
            onPress={cancelAction}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: COLORS.DIALOG_BACKGROUND_COLOR,
  },
});

export default SugradoDialog;
