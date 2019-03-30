import React from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import Styles from './ProfileGamertagsItem.styles';

const ProfileGamertagsItem = ({ platformLogo, value, onPress, showButton, loading, platformName }) => {
  const Wrapper = typeof onPress === 'function' ? TouchableOpacity : View;

  return (
    <Wrapper style={Styles.container} onPress={() => !loading && onPress()}>
      <Image source={platformLogo} style={Styles.platformLogo} resizeMode="contain" />
      {loading
        ? <View style={Styles.loading}>
            <ActivityIndicator />
          </View>
        : <Text style={Styles.platformName}>
            { platformName }
          </Text>}
      {!loading &&
        <Text style={Styles.value}>
          {value || '-'}
        </Text>
      }
    </Wrapper>
  );
};

export default ProfileGamertagsItem;
