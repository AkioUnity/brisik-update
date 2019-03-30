import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import Utils from '../../utils/Utils';

const styles = StyleSheet.create({
  formPickerContainer: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.florida,
    padding: 5,
    paddingLeft: 20
  },
  formPickerLabel: {
    color: Colors.paysandu,
    fontSize: 16,
    fontFamily: Fonts.get('regular'),
    position: 'absolute',
    top: 5
  },
  formPickerFieldContainer: {
    width: '100%',
    height: '100%'
  },
  formPickerField: {
    flex: 1,
    color: Colors.colonia,
    fontSize: 16,
    fontFamily: Fonts.get('regular'),
    position: 'absolute',
    top: 5
  },
  modalContentContainer: {
    flex: 1
  },
  modalContent: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'rgba(28, 28, 29, 0.7)'
  },
  pickerContainer: {
    backgroundColor: Colors.colonia,
    overflow: 'hidden'
  },
  picker: {
    marginTop: 42,
    borderTopColor: Colors.salto,
    borderTopWidth: 1
  },
  pickerBtn: {
    position: 'absolute',
    top: 0,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelBtnContainer: {
    left: 10
  },
  cancelBtnText: {
    fontSize: 16,
    color: Colors.salto
  },
  confirmBtnContainer: {
    right: 10
  },
  confirmBtnText: {
    fontSize: 16,
    color: Colors.salto
  }
});

export default styles;
