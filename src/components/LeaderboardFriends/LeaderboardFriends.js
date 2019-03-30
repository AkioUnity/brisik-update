import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import LeaderboardItem from '../LeaderboardItem/LeaderboardItem';
import Styles from './LeaderboardFriends.styles';

const data = [
  {
    user: {
      mediaId: 'Sysk0',
      profileImage: null,
    },
    wins: 91,
    winsPercentage: '98%',
    earnings: 200
  },
  {
    user: {
      mediaId: 'g4mer_win',
      profileImage: null,
    },
    wins: 87,
    winsPercentage: '80%',
    earnings: 199
  },
  {
    user: {
      mediaId: 'kik4',
      profileImage: null,
    },
    wins: 80,
    winsPercentage: '70%',
    earnings: 107
  },
  {
    user: {
      mediaId: 'z0k4_gamer',
      profileImage: null,
    },
    wins: 71,
    winsPercentage: '68%',
    earnings: 92
  },
  {
    user: {
      mediaId: 'nik0_99',
      profileImage: null,
    },
    wins: 60,
    winsPercentage: '52%',
    earnings: 87
  },
  {
    user: {
      mediaId: 'luk4_win',
      profileImage: null,
    },
    wins: 52,
    winsPercentage: '47%',
    earnings: 65
  },
  {
    user: {
      mediaId: 'qw4rta',
      profileImage: null,
    },
    wins: 37,
    winsPercentage: '13%',
    earnings: 22
  },
  {
    user: {
      mediaId: 'w3ndel99',
      profileImage: null,
    },
    wins: 14,
    winsPercentage: '10%',
    earnings: 12
  },
  {
    user: {
      mediaId: 'stok3r',
      profileImage: null,
    },
    wins: 5,
    winsPercentage: '10%',
    earnings: 10
  },
  {
    user: {
      mediaId: 'zk0r3',
      profileImage: null,
    },
    wins: 4,
    winsPercentage: '100%',
    earnings: 40
  }
];

const LeaderboardFriends = () => {
  return (
    <ScrollView style={Styles.container}>
      <View style={Styles.title}>
        <Text style={Styles.rank}>#</Text>
        <Text style={Styles.user}>Gamer</Text>
        <Text style={Styles.wins}>Wins</Text>
        <Text style={Styles.winsPercentage}>Win%</Text>
        <Text style={Styles.earnings}>Earnings</Text>
      </View>
      { data.map((data, i) => <LeaderboardItem {...data} rank={i+1} key={i} style={Styles.item} />) }
    </ScrollView>
  );
};

LeaderboardFriends.title = 'Friends';
LeaderboardFriends.id = 'com.eSportsGlobalGamers.LeaderboardFriends';

export default LeaderboardFriends;