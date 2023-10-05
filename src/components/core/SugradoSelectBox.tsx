import React from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';

type SugradoSelectBoxProps = {
  data: SelectBoxData[];
  onSelected?: (selectedItem: SelectBoxData, index: number) => void;
  label: string;
  disabled?: boolean;
  disableAutoScroll?: boolean;
  displayValue: (item: SelectBoxData) => string;
};

export class SelectBoxData {
  id: string;
  value: string;
}

const SugradoSelectBox = ({
  data,
  onSelected,
  label,
  disabled = false,
  disableAutoScroll = true,
  displayValue,
}: SugradoSelectBoxProps) => {
  const button_text_style = {color: disabled ? 'gray' : 'black', fontSize: 16};
  return (
    <SelectDropdown
      buttonStyle={styles.button_style}
      buttonTextStyle={button_text_style}
      rowTextStyle={button_text_style}
      rowStyle={styles.row_style}
      dropdownStyle={styles.dropdown_style}
      selectedRowTextStyle={styles.selected_row_text_style}
      disabled={disabled}
      rowTextForSelection={displayValue}
      buttonTextAfterSelection={displayValue}
      disableAutoScroll={disableAutoScroll}
      defaultButtonText={label}
      dropdownIconPosition="right"
      renderDropdownIcon={() => (
        <Entypo
          name="chevron-down"
          size={20}
          style={styles.icon_style}
          color={disabled ? 'gray' : 'black'}
        />
      )}
      data={data}
      onSelect={(selectedItem, index) => {
        onSelected && onSelected(selectedItem, index);
      }}
    />
  );
};

const styles = StyleSheet.create({
  button_style: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  row_style: {
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: 'gray',
  },
  dropdown_style: {
    borderRadius: 20,
    backgroundColor: 'white',
  },
  selected_row_text_style: {
    fontWeight: 'bold',
  },
  icon_style: {
    paddingRight: 10,
  },
});

export default SugradoSelectBox;
