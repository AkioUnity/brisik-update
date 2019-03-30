import { StyleSheet, Platform } from 'react-native';

const Styles = StyleSheet.create({
  picker: {
    overflow: 'hidden',
    marginTop: Platform.OS === 'ios' ? -20 : 0, 
  }
});

export default Styles;
