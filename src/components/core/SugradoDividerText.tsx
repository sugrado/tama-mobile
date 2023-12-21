import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

type SugradoDividerTextProps = {
  text: string;
  style?: any;
};

const SugradoDividerText = ({text, style}: SugradoDividerTextProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.line} />
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  line: {flex: 1, height: 1, backgroundColor: 'black'},
  text: {textAlign: 'center', marginHorizontal: 10},
});

export default SugradoDividerText;
