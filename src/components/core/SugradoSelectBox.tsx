import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';

type SugradoSelectBoxProps = {
  data: SelectBoxData[];
  onSelected?: (selectedItem: SelectBoxData, index: number) => void;
  label: string;
  disabled?: boolean;
  disableAutoScroll?: boolean;
  displayValue: (item: SelectBoxData) => string;
  onBlur?: () => void;
  style?: any;
  btnDefaultText?: string;
  innerRef?: any;
};

export class SelectBoxData {
  id: string;
  value: string;
}

const SugradoSelectBox = ({
  data,
  onSelected,
  label,
  btnDefaultText = 'Seç...',
  disabled = false,
  disableAutoScroll = true,
  displayValue,
  onBlur,
  style,
  innerRef,
}: SugradoSelectBoxProps) => {
  const color = disabled ? 'gray' : 'black';
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <SelectDropdown
        ref={innerRef}
        buttonStyle={styles.button_style}
        buttonTextStyle={[styles.button_text_style, {color}]}
        rowTextStyle={styles.rowTextStyle}
        rowStyle={styles.row_style}
        dropdownStyle={styles.dropdown_style}
        selectedRowTextStyle={styles.selected_row_text_style}
        disabled={disabled}
        rowTextForSelection={displayValue}
        buttonTextAfterSelection={displayValue}
        disableAutoScroll={disableAutoScroll}
        defaultButtonText={btnDefaultText}
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
        onBlur={onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button_style: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    height: 56,
    textAlign: 'left',
  },
  rowTextStyle: {
    fontSize: 16,
    textAlign: 'left',
  },
  button_text_style: {
    fontSize: 16,
    color: '#444',
    textAlign: 'left',
  },
  row_style: {
    backgroundColor: 'white',
    borderColor: 'gray',
  },
  dropdown_style: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
  selected_row_text_style: {
    fontWeight: 'bold',
  },
  icon_style: {
    paddingRight: 10,
  },
  label: {
    marginLeft: 5,
    marginBottom: 3,
  },
});

export default SugradoSelectBox;
