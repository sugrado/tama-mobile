import {StyleSheet} from 'react-native';
import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {COLORS} from '../../constants';

type SugradoModalProps = {
  children: React.ReactNode;
  visible: boolean;
  onDismiss: () => void;
};

const SugradoModal = ({children, visible, onDismiss}: SugradoModalProps) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={styles.modal_container}
        dismissableBackButton={true}
        dismissable={false}
        onDismiss={onDismiss}>
        {children}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal_container: {
    backgroundColor: COLORS.THEME_TRANSPARENT_COLOR,
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
});

export default SugradoModal;
