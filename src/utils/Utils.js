export const UUID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const randomId = (n = 10) => {
  const timestamp = Date.now().toString();
  return timestamp.substring(timestamp.length, timestamp.length - n);
};

export const RandomUser = () => {
  return {
    _id: randomId(),
    name: `random${randomId(3)}`,
    avatar: `https://api.adorable.io/avatars/40/${randomId(3)}`
  };
};

export const isObjectEmpty = object => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

export const encodeJSONToQueryString = json => {
  let formBody = [];
  for (let property in json) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(json[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join('&');
};

export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const generateWinPercentage = (matchesPlayed, matchesWon) => {
  if (matchesPlayed == 0 || matchesWon == 0) {
    return '0%';
  }

  let res = matchesWon * 100;
  res /= matchesPlayed;
  return Math.round(res) + '%';
};

export const findDuplicate = (_product, cart) =>
  cart.findIndex(({ product }) => product._id === _product._id);

export const statesUSA = [
  { name: 'ALABAMA', abbreviation: 'AL' },
  { name: 'ALASKA', abbreviation: 'AK' },
  { name: 'AMERICAN SAMOA', abbreviation: 'AS' },
  { name: 'ARIZONA', abbreviation: 'AZ' },
  { name: 'ARKANSAS', abbreviation: 'AR' },
  { name: 'CALIFORNIA', abbreviation: 'CA' },
  { name: 'COLORADO', abbreviation: 'CO' },
  { name: 'CONNECTICUT', abbreviation: 'CT' },
  { name: 'DELAWARE', abbreviation: 'DE' },
  { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
  { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM' },
  { name: 'FLORIDA', abbreviation: 'FL' },
  { name: 'GEORGIA', abbreviation: 'GA' },
  { name: 'GUAM', abbreviation: 'GU' },
  { name: 'HAWAII', abbreviation: 'HI' },
  { name: 'IDAHO', abbreviation: 'ID' },
  { name: 'ILLINOIS', abbreviation: 'IL' },
  { name: 'INDIANA', abbreviation: 'IN' },
  { name: 'IOWA', abbreviation: 'IA' },
  { name: 'KANSAS', abbreviation: 'KS' },
  { name: 'KENTUCKY', abbreviation: 'KY' },
  { name: 'LOUISIANA', abbreviation: 'LA' },
  { name: 'MAINE', abbreviation: 'ME' },
  { name: 'MARSHALL ISLANDS', abbreviation: 'MH' },
  { name: 'MARYLAND', abbreviation: 'MD' },
  { name: 'MASSACHUSETTS', abbreviation: 'MA' },
  { name: 'MICHIGAN', abbreviation: 'MI' },
  { name: 'MINNESOTA', abbreviation: 'MN' },
  { name: 'MISSISSIPPI', abbreviation: 'MS' },
  { name: 'MISSOURI', abbreviation: 'MO' },
  { name: 'MONTANA', abbreviation: 'MT' },
  { name: 'NEBRASKA', abbreviation: 'NE' },
  { name: 'NEVADA', abbreviation: 'NV' },
  { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
  { name: 'NEW JERSEY', abbreviation: 'NJ' },
  { name: 'NEW MEXICO', abbreviation: 'NM' },
  { name: 'NEW YORK', abbreviation: 'NY' },
  { name: 'NORTH CAROLINA', abbreviation: 'NC' },
  { name: 'NORTH DAKOTA', abbreviation: 'ND' },
  { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP' },
  { name: 'OHIO', abbreviation: 'OH' },
  { name: 'OKLAHOMA', abbreviation: 'OK' },
  { name: 'OREGON', abbreviation: 'OR' },
  { name: 'PALAU', abbreviation: 'PW' },
  { name: 'PENNSYLVANIA', abbreviation: 'PA' },
  { name: 'PUERTO RICO', abbreviation: 'PR' },
  { name: 'RHODE ISLAND', abbreviation: 'RI' },
  { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
  { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
  { name: 'TENNESSEE', abbreviation: 'TN' },
  { name: 'TEXAS', abbreviation: 'TX' },
  { name: 'UTAH', abbreviation: 'UT' },
  { name: 'VERMONT', abbreviation: 'VT' },
  { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
  { name: 'VIRGINIA', abbreviation: 'VA' },
  { name: 'WASHINGTON', abbreviation: 'WA' },
  { name: 'WEST VIRGINIA', abbreviation: 'WV' },
  { name: 'WISCONSIN', abbreviation: 'WI' },
  { name: 'WYOMING', abbreviation: 'WY' }
];

export const Faqs = [
  {
    question: 'What/Who is Brisik?',
    answer: [
      'Brisik is your online eSports destination for',
      'skills-based, head-to-head battles as well as both',
      'small and large scale cash tournaments, for Fifa, Madden, and NBA2K franchises.',
      'We facilitate gaming opportunities on Xbox One, Xbox 360, Playstation 3, and Playstation 4.',
      'Sign up, challenge players of your appropriate skill levels,',
      'report your outcomes, and earn prizes. It’s that simple.'
    ]
  },
  {
    question: 'How much does it cost to join Brisik?',
    answer: [
      'Brisik is free to join, and we will even provide you your first ___ coins just for signing up.',
      'You can earn coins by winning matches/tournaments,',
      'staying active and playing on the site ___ days in a row,',
      'and even just for referring your friends!'
    ]
  },
  {
    question: 'What/Who is Brisik?',
    answer: [
      'Brisik is your online eSports destination for',
      'skills-based, head-to-head battles as well as both',
      'small and large scale cash tournaments, for Fifa, Madden, and NBA2K franchises.',
      'We facilitate gaming opportunities on Xbox One, Xbox 360, Playstation 3, and Playstation 4.',
      'Sign up, challenge players of your appropriate skill levels,',
      'report your outcomes, and earn prizes. It’s that simple.'
    ]
  },
  {
    question: 'How do I sign up?',
    answer: [
      'We’re so glad you asked! Click here to register and begin your Brisik journey.'
    ]
  },
  {
    question: 'Is playing on Brisik legal?',
    answer: [
      'Yes, playing on Brisik is legal based on extensive research',
      'and data proving the three games we offer are games of skill and not games of chance.',
      'Every state has different legislation, so click here for a',
      'detailed description of your state. Click here to write a letter to your',
      'representatives telling them how much you enjoy eSports!',
      '(partially written letter similar to what FanDuel/DraftKings provides).',
      'Unfortunately, players in the the following six states will not be',
      'able to play for cash prizes on Brisik: Alaska, Arizona, Delaware, Maryland, and Tennessee.',
      'As always, legislation is constantly changing, check back on our site for additional updates.'
    ]
  },
  {
    question: 'Is my personal information secure on the Brisik website?',
    answer: [
      'Trust us when we say we know how important your personal',
      'information is to you. All of our sensitive information is secured',
      'with vigorous (specific technical definition? Ex.All sensitive',
      'data is transmitted through high-grade 256-bit encryption -- from Gamer Saloon )',
      'and all our credit card transactions are done through PayPal.'
    ]
  },
  {
    question: 'How does Brisik work?',
    answer: [
      'Brisik works as an independent third-party host that provides a safe place to game.',
      'For free, for coins, and for other unmatched prizes. Once a matchup',
      'has been agreed to, the money is automatically withdrawn from each participant\'s',
      'account and once the outcome has been reported by both, the winnings',
      'will be deposited into the appropriate account?',
      'We don’t want to replace how you play, just where you play.'
    ]
  },
  {
    question: 'Will there be any monthly charges on my credit card?',
    answer: [
      'Brisik is absolutely positively 100 percent free to join and play.',
      'However, you if you to advance your gaming you can join the Brisik VIP Program,',
      'which will provide you many advantages such as data-driven',
      'statistics to improve performance, access to exclusive Brisik tournaments, and much more.',
      'Click here to learn more about the VIP Program.'
    ]
  },
  {
    question: 'How much does it cost me to play?',
    answer: [
      'We know how diverse the gaming community is. If you are here just for casual fun, we have a game for you.',
      'If you’re an aspiring professional, we have a game for you. And if you’re an elite gamer, of course,',
      'we have a game for you as well.',
      'Entries are as low as ___ and as high as ____.'
    ]
  },
  {
    question: 'How do I get matched up?',
    answer: [
      'Well that depends on what you’re looking for!',
      'You choose the game and the amount of coins you’re looking to wager. We’ll play matchmaker',
      'and find someone else looking for the same thing.'
    ]
  },
  {
    question: 'What happens once I am matched up with an opponent?',
    answer: [
      'A: From Players Lounge',
      '1. Add your opponent as a friend on Xbox Live or PSN using their Gamertag or Username.',
      '2. Go to the game mode where you can play a friend online. For example, the Online Friendlies mode in FIFA.',
      '3. Send a game invite to your opponent.',
      '4. Check and confirm the match rules and settings.',
      '5. Start the match.',
      'Note: Be sure to take pictures/screenshots of the match final score in case of a dispute about the match result.',
      '(??). Are we going to use something that will identify winner and not force players to do this like Amine suggested?'
    ]
  },
  {
    question: 'What happens if I am disconnected while playing?',
    answer: [
      'Each player is responsible for their own internet connection.',
      'However, if easily suitable to resume playing (i.e. if the disconnection happens',
      'at halftime, play a new game just one half). If there is not a suitable place to resume play,',
      'or if it cannot be agreed upon, click here to contact Brisik support.'
    ]
  },
  {
    question: 'What happens if there is a dispute?',
    answer: [
      'Brisik puts supreme importance on the integrity of your gameplay.',
      'While we hope the vast majority of players will abide by ethical guidelines, we know there are always bad apples.',
      'If you won a match, but your opponent reports that they won, please contact us immediately.',
      'If you are caught intentionally misreporting the results of gameplay,',
      'your account will be reviewed and you may be banned.'
    ]
  },
  {
    question: 'How do I accumulate coins?',
    answer: [
      'You receive ___ coins just for joining. But if that’s not enough to quench your insatiable gaming thirst,',
      'you can purchase coins here, earn them by defeating your opponents,',
      'earn___ coins just for playing ___ days in a row, or joining our Brisik VIP Program',
      'which provides these coin-earning opportunities.'
    ]
  },
  {
    question: 'What prizes does Brisik offer?',
    answer: [
      'Click here to browse our truly one-of-a-kind store. We offer standard prizes like gaming consoles,',
      'but also spectacular opportunities you are sure not to find anywhere else!',
      'We promise, you’re not going to find what we offer anywhere else.'
    ]
  },
  {
    question: 'Does Brisik offer in-person tournaments?',
    answer: [
      'Although we are primarily an online based gaming host, we do incorporate live events into our schedule.',
      'Click here to check out upcoming events nationally.'
    ]
  },
  {
    question: 'How old do I need to be to join Brisik?',
    answer: [
      'You need to be 18 years of age to become a Brisik member. Click here to join.'
    ]
  },
  {
    question: 'Can I have more than one account?',
    answer: [
      'No, you can only have one account.'
    ]
  },
  {
    question: 'What do I do for a forgotten password?',
    answer: [
      'Click here to reset your password (will also be on login page like other websites)'
    ]
  },
  {
    question: 'What type of internet do I need to have?',
    answer: [
      'In order to produce seamless, high-quality, uninterrupted gameplay,',
      'we suggest broadband internet connection of at least ___ MBPS.'
    ]
  },
  {
    question: 'What is my Brisik Profile Rating?',
    answer: [
      'We want to match up players of appropriate skill levels and maintain gamer fairness.',
      'Therefore, for each win, you will earn ___ points towards your BPR.',
      'If you beat someone with a higher BPR, your rating will go up significantly more',
      'than if you beat someone with a lower BPR.',
      'Compete against the best and climb the ladder board to gaming glory!'
    ]
  }
];
