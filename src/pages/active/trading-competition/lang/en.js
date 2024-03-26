export default {
  bannerText: {
    title: 'Trading Strategy Competition',
    desc: 'Win up to 2,000USDT!',
    time: 'Competition Period From 12:00, Dec 5 to 12:00, Dec 12, 2018 (UTC+8)'
  },
  profitRate: {
    p1: 'During the competition period, Riostox will rank each user\'s rate of return of all trading pairs on the platform. Top 1 trader will win as high as 2,000 USDT! The total reward pool is 4,500USDT.',
    title: 'What is the Rate of Return:',
    desc: 'The rate of Return = [Holdings at the end - (Holdings at the beginning + Deposits + Rewards)]/(Holdings at the beginning + Deposits)*100%',
    list: [
      'Holdings at the beginning : Subject to the snapshot of crypto account taken at 12:00 on Dec 5, 2018 (UTC+8), including available balance and frozen balance (all converted to USDT)',
      'Holdings at the end : Subject to the snapshot of crypto account taken at 12:00 on Dec 12, 2018 (UTC+8), including available balance and frozen balance (all converted to USDT)',
      'Deposits : Including transfer from options account and crypto deposits between 12:00, Dec 5 and 12:00, Dec 12, 2018 (UTC+8) (all converted to USDT)',
      'Rewards : All rewards received between 12:00, Dec 5 and 12:00, Dec 12, 2018 (UTC+8), including holding rewards and event rewards (all converted to USDT)'
    ]
  },
  rewward: {
    title: 'Award Scheme',
    toTrade: 'Trade Now',
    rank: 'Ranking',
    prize: 'Prize（USDT）',
    avage: function(number) {
      return `Share ${number} Equally`
    }
  },
  rankingList: {
    title: function(date) {
      return `Ranking as of ${date}`
    },
    rank: 'Ranking',
    username: 'User Name',
    return: 'The Rate of Return',
    tips: 'Ranking of participants\' rates of return will be updated on each calendar day (UTC+8)'
  },
  notice: {
    title: '[Terms & Conditions]',
    list: [
      'Deposits, holdings rewards and rewards of all other events are not counted as a return in this competition; only return from trading activities are counted;',
      'Users must complete KYC or enable SMS authentication before the competition ends to be qualified;',
      'Users who make any withdrawal during the competition will be disqualified;',
      'Rewards will be credited into winners\' Riostox accounts before 24:00 on Dec 21 (UTC+8);',
      'USDT is the unit of account in this competition;',
      'To facilitate fair play in this giveaway, participants with any cheating behavior detected will be disqualified immediately. Riostox reserves the right of the final interpretation of this Terms & Conditions;',
      'Campaign ID: EVT02500.'
    ]
  }
}
