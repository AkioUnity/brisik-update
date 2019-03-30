import Colors from '../../styles/Colors';
import * as Images from '../../utils/Images';
import { UUID } from '../../utils/Utils';

export const appendNotification = (state, data) => {
  const notifications = state.notifications || [];
  const notification = parseData(data);

  if (notification) {
    notifications.unshift(notification);
  }

  return { ...state, notifications };
};

export const setData = (state, data) => {
  const _notifications = state.notifications || [];
  const notifications = [..._notifications, ...data];

  return { ...state, notifications };
};

export const setHistory = (state, history) => {
  const notifications = history.filter(({ entry }) => typeof entry === 'object')
    .map(({ entry }) => parseData(entry, true)).filter((item) => !!item);

  return {
    ...state,
    notifications
  };
};

export const markSeen = (state, id) => {
  const notifications = state.notifications.map((data) => {
    if (data._id === id) {
      data.seen = true;
    }

    return data;
  });

  return {
    ...state,
    notifications
  };
};

function parseData(data, seen) {
  data.type = data.message || data.action;
  data.seen = seen;
  data._id = UUID();

  switch (data.type) {
    case 'challenge':
      data.color = Colors.tranqueras;
      return parseChallenge(data);
    case 'friend':
      data.color = Colors.salto;
      return parseFriend(data);
    case 'coin':
      data.color = Colors.pasoDeLosToros;
      return parseCoin(data);
    case 'tournament':
      data.color = Colors.lavalleja;
      return parseTournament(data);
    case 'bought':
      data.color = Colors.pasoDeLosToros;
      return parseBought(data);
  }

  return null;
}

function parseChallenge(data) {
  data.icon = Images.cupNotifications;

  if (data.friendlyMessage) {
    return data;
  }

  switch (data.action) {
    case 'invite_request':
      data.friendlyMessage = 'has challenged you';
      break;
    case 'invite_decline':
      data.friendlyMessage = 'has declined you invite';
      break;
    case 'status':
      data.friendlyMessage = 'Hurry up! Upload the score now!';
      delete data.subject;
      break;
    case 'win':
      data.friendlyMessage = 'Congrats! You won the challenge';
      delete data.subject;
      break;
    case 'lose':
      data.friendlyMessage = 'Ouch, you lost but try again!';
      delete data.subject;
      break;
    case 'extend':
      data.friendlyMessage = 'Challenge extended';
      delete data.subject;
      break;
    case 'dispute':
      data.friendlyMessage = 'Your challenge has entered into a dispute';
      delete data.subject;
      break;
    case 'cancel':
      data.friendlyMessage = 'has forfeited';
      break;
    case 'invite_accept':
      data.friendlyMessage = 'has accepted you challenge, let\'s play!';
      break;
    case 'dispute_resolve':
      data.friendlyMessage = 'Your dispute has been resolved. You should see the results';
      delete data.subject;
      break;
    case 'expire':
      data.friendlyMessage = 'Your challenge has expired';
      delete data.subject;
      break;
    case 'join':
      data.friendlyMessage = 'has joined to your challenge';
      break;
    default:
      return null;
  }

  return data;
}

function parseFriend(data) {
  data.icon = Images.defaultAvatar;

  if (data.friendlyMessage) {
    return data;
  }

  switch (data.action) {
    case 'invite':
      data.friendlyMessage = 'wants to be your friend, accept him!';
      break;
    case 'accept':
      data.friendlyMessage = 'has accepted you as friend, challenge him now!';
      break;
    default:
      return null;
  }

  return data;
}

function parseCoin(data) {
  data.icon = Images.coinNotifications;

  if (data.friendlyMessage) {
    return data;
  }

  const { amount } = data;

  switch (data.action) {
    case 'earn':
      data.friendlyMessage = `Hell yeah! You earned ${amount} coin${amount > 1 ? 's' : ''}`;
      break;
    case 'discount':
      data.friendlyMessage = `${amount} coin${amount > 1 ? 's' : ''} ha${amount > 1 ? 's' : 've'} been discounted from your account`;
      break;
    default:
      return null;
  }

  return data;
}

function parseTournament(data) {
  data.icon = Images.tournamentChallengeIcon;

  if (data.friendlyMessage) {
    return data;
  }

  switch (data.action) {
    case 'win':
      data.friendlyMessage = 'Hell yeah! You have won the tournament!';
      break;
    case 'lose':
      data.friendlyMessage = 'Crap, you lost the tournament, good luck at the next one!';
      break;
    case 'create':
      data.friendlyMessage = 'Hey, we have launched a new tournament, play and win awesome prizes!';
      break;
    case 'expired':
      data.friendlyMessage = 'Tournament didn\'t reach four participants and expired';
      break;
    case 'newchallenge':
      data.friendlyMessage = 'A new tournament challenge was created';
      break;
    case 'full':
      data.friendlyMessage = 'Your tournament reached the minimum amount of players to start';
      break;
    case 'newPlayer':
      data.friendlyMessage = 'joined a tournament you\'re participating';
      break;
    default:
      return null;
  }

  return data;
}

function parseBought(data) {
  data.icon = Images.coinNotifications;

  if (data.friendlyMessage) {
    return data;
  }

  const { amount } = data;

  data.friendlyMessage = `Congrats, you bought ${amount} coins!`;

  return data;
}