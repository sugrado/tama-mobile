import {StyleSheet} from 'react-native';
import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {COLORS} from '../../constants';

type SugradoModalProps = {
  children: React.ReactNode;
  visible: boolean;
  onDismiss: () => void;
  dismissable?: boolean;
  dismissableBackButton?: boolean;
};

const SugradoModal = ({
  children,
  visible,
  onDismiss,
  dismissable = false,
  dismissableBackButton = true,
}: SugradoModalProps) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={styles.modal_container}
        dismissableBackButton={dismissableBackButton}
        dismissable={dismissable}
        onDismiss={onDismiss}>
        {children}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal_container: {
    backgroundColor: COLORS.MODAL_BACKGROUND_COLOR,
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
});

export default SugradoModal;
