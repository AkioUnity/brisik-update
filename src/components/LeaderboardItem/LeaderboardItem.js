import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { generateWinPercentage } from '../../utils/Utils';
import Avatar from '../Avatar/Avatar';
import Styles from './LeaderboardItem.styles';

const LeaderboardItem = ({
  _id,
  matchesPlayed,
  mediaId,
  matchesWon,
  coinsWon,
  profileImage,
  rank,
  style,
  onPress,
  userData,
  index
}) => {
  const winPercentage = generateWinPercentage(matchesPlayed, matchesWon);
  const profile = profileImage && { uri: profileImage };
  const largeId = mediaId.length > 10;
  const myPosition = userData && userData._id === _id && index === 0;

  return (
    <TouchableOpacity
      style={[Styles.container, myPosition ? Styles.activeContainer : {}]}
      onPress={() => onPress ? onPress(_id, mediaId) : {}}
    >
      <Text style={[Styles.rank, myPosition ? Styles.myRank : {}]}>{rank}</Text>
      <View style={Styles.userContainer}>
        <Avatar style={Styles.avatar} source={profile} />
        <Text style={[Styles.user, myPosition ? Styles.myUser : {}]}>
          {largeId ? mediaId.substring(0, 10) + '...' : mediaId}
        </Text>
      </View>
      <Text style={Styles.wins}>{matchesWon}</Text>
      <Text style={Styles.winsPercentage}>{winPercentage}</Text>
      <View style={Styles.earnings}>
        <Text style={Styles.earningsText}>{`$${coinsWon}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LeaderboardItem;
