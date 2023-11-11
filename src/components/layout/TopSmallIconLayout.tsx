import {View, ScrollView, Image, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {Text} from 'react-native-paper';
import {COLORS, DIMENSIONS} from '../../constants';

type TopSmallIconLayoutProps = {
  pageName: string;
  children: ReactNode;
};

const TopSmallIconLayout = ({pageName, children}: TopSmallIconLayoutProps) => {
  return (
    <ScrollView
      style={styles.scroll_container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/icon_transparent.png')}
          style={styles.header_logo}
        />
        <Text variant="titleMedium" style={styles.header_text}>
          TAMA - {pageName}
        </Text>
      </View>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll_container: {
    backgroundColor: COLORS.THEME_COLOR,
    flex: 1,
  },
  header: {
    height: (DIMENSIONS.AVAILABLE_HEIGHT * 15) / 100,
    padding: 5,
    alignItems: 'center',
  },
  header_text: {
    marginTop: 5,
    color: COLORS.TEXT,
  },
  header_logo: {
    resizeMode: 'contain',
    height: '60%',
    width: 100,
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingBottom: 20,
    flex: 1,
  },
});

export default TopSmallIconLayout;
