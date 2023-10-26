import {StyleSheet} from 'react-native';
import {COLORS, DIMENSIONS} from '../../constants';

export const Styles = StyleSheet.create({
  forgot_password: {width: '100%', alignItems: 'flex-end'},
  forgot_password_text: {
    fontWeight: 'bold',
    color: COLORS.BUTTON_COLOR,
  },
  loginButton: {width: '100%', marginTop: 30},
  firstAppointmentButton: {width: '100%', marginTop: 30},
  input: {backgroundColor: '#fff'},
  form_field: {},
  login_container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  login_header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: COLORS.THEME_COLOR,
  },
  login_header_logo: {
    height: (DIMENSIONS.HEIGHT * 1.2) / 10,
    resizeMode: 'contain',
  },
  login_header_text: {
    marginTop: 15,
    color: '#f0f0f0',
    fontSize: 16,
  },
  login_header_text_bold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  login_wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 15,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginTop: -10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 280,
  },
  login_footer_text: {
    color: '#808080',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footer_logo: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
});
