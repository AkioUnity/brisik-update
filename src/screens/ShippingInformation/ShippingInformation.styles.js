import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste,
    backgroundColor: Colors.montevideo
  },
  formContainer: {
    padding: 20,
    flex: 1,
  },
  formInput: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.florida,
    color: Colors.colonia,
    fontSize: 14,
    paddingLeft: 10,
    letterSpacing: 0.5
  },
  formSeparator: {
    marginVertical: 5
  },
  formCheckboxContainer: {
    marginTop: 20
  },
  select: {
    backgroundColor: Colors.florida,
    alignSelf: 'stretch',
    height: 40,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  selectValue: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 5,
    letterSpacing: 0.5,
    color: Colors.colonia
  },
  placeholder: {
    color: Colors.paysandu
  },
  formVerticalSeparator: {
    marginHorizontal: 5
  },
  formRow: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  }
});

export default Styles;
