export default {
  currencies: [
    {
      key: 'satoshi',
      code: 'btc',
      coin: true,
      blockchain: 'https://blockchain.info/tx/#{txid}',
      readable_name: 'Bitcoin',
      minimum_withdraw_amount: 0.0016,
      withdraw_fee: 0.0008,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'litecoin',
      code: 'ltc',
      coin: true,
      blockchain: 'https://insight.litecore.io/tx/#{txid}',
      readable_name: 'Litecoin',
      minimum_withdraw_amount: 0.02,
      withdraw_fee: 0.01,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'ethereum',
      code: 'eth',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Ethereum',
      minimum_withdraw_amount: 0.01,
      withdraw_fee: 0.005,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'tether',
      code: 'usdt',
      coin: true,
      blockchain: 'https://omniexplorer.info/tx/#{txid}',
      readable_name: 'Tether',
      minimum_withdraw_amount: 10,
      withdraw_fee: 5,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'qtum',
      code: 'qtum',
      coin: true,
      blockchain: 'https://explorer.qtum.org/tx/#{txid}',
      readable_name: 'Qtum',
      minimum_withdraw_amount: 0.02,
      withdraw_fee: 0.01,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'bitcoincash',
      code: 'bch',
      coin: true,
      blockchain: 'https://bccblock.info/tx/#{txid}',
      readable_name: 'BitcoinCash',
      minimum_withdraw_amount: 0.002,
      withdraw_fee: 0.001,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'eos',
      code: 'eos',
      coin: true,
      blockchain: 'https://eosflare.io/tx/#{txid}',
      readable_name: 'EOS',
      minimum_withdraw_amount: 100,
      withdraw_fee: 0.1,
      require_memo: true,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'ripple',
      code: 'xrp',
      coin: true,
      blockchain: 'http://ripplescan.com/transactions/#{txid}',
      readable_name: 'Ripple',
      minimum_withdraw_amount: 20,
      withdraw_fee: 0.1,
      require_memo: true,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'dash',
      code: 'dash',
      coin: true,
      blockchain: 'https://chainz.cryptoid.info/dash/tx.dws?#{txid}',
      readable_name: 'Dash',
      minimum_withdraw_amount: 0.004,
      withdraw_fee: 0.002,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'omisego',
      code: 'omg',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'OmiseGO',
      minimum_withdraw_amount: 0.2,
      withdraw_fee: 0.1,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'waykichain',
      code: 'wicc',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'WaykiChain',
      minimum_withdraw_amount: 2,
      withdraw_fee: 1,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'ethereumclassic',
      code: 'etc',
      coin: true,
      blockchain: 'https://gastracker.io/tx/#{txid}',
      readable_name: 'EthereumClassic',
      minimum_withdraw_amount: 0.02,
      withdraw_fee: 0.01,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'zrx',
      code: 'zrx',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: '0x',
      minimum_withdraw_amount: 4,
      withdraw_fee: 2,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'funfair',
      code: 'fun',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'FunFair',
      minimum_withdraw_amount: 70,
      withdraw_fee: 35,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'civic',
      code: 'cvc',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Civic',
      minimum_withdraw_amount: 10,
      withdraw_fee: 5,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'golem',
      code: 'gnt',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Golem',
      minimum_withdraw_amount: 10,
      withdraw_fee: 5,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'basicattentiontoken',
      code: 'bat',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Basic Attention Token',
      minimum_withdraw_amount: 24,
      withdraw_fee: 12,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'ethlend',
      code: 'lend',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'ETHLend',
      minimum_withdraw_amount: 100,
      withdraw_fee: 50,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'reptoken',
      code: 'rep',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Augur',
      minimum_withdraw_amount: 0.2,
      withdraw_fee: 0.1,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'soctoken',
      code: 'soc',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'All Sports',
      minimum_withdraw_amount: 20,
      withdraw_fee: 10,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'cndtoken',
      code: 'cnd',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Cindicator',
      minimum_withdraw_amount: 100,
      withdraw_fee: 50,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'dpytoken',
      code: 'dpy',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Delphy',
      minimum_withdraw_amount: 1.6,
      withdraw_fee: 0.8,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'xmxtoken',
      code: 'xmx',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'XMAX',
      minimum_withdraw_amount: 3000,
      withdraw_fee: 1500,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'edgtoken',
      code: 'edg',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Edgeless',
      minimum_withdraw_amount: 40,
      withdraw_fee: 20,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'gnotoken',
      code: 'gno',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Gnosis',
      minimum_withdraw_amount: 0.2,
      withdraw_fee: 0.1,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'rtetoken',
      code: 'rte',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Rate3',
      minimum_withdraw_amount: 200,
      withdraw_fee: 100,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'cnntoken',
      code: 'cnn',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Content Neutrality Network',
      minimum_withdraw_amount: 2400,
      withdraw_fee: 1200,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'attoken',
      code: 'at',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Riostox Token',
      minimum_withdraw_amount: 6,
      withdraw_fee: 3,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'yeetoken',
      code: 'yee',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Yeecall',
      minimum_withdraw_amount: 120,
      withdraw_fee: 60,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'ttutoken',
      code: 'ttu',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Tatatu',
      minimum_withdraw_amount: 80,
      withdraw_fee: 40,
      require_memo: false,
      can_withdraw: false,
      can_deposit: false,
      vote_currency: false,
    },
    {
      key: 'icxtoken',
      code: 'icx',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'ICON',
      minimum_withdraw_amount: 1,
      withdraw_fee: 0.5,
      require_memo: false,
      can_withdraw: false,
      can_deposit: false,
      vote_currency: false,
    },
    {
      key: 'adacoin',
      code: 'ada',
      coin: true,
      blockchain: 'https://cardanoexplorer.com/tx/#{txid}',
      readable_name: 'Cardano',
      minimum_withdraw_amount: 20,
      withdraw_fee: 10,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'elftoken',
      code: 'elf',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'aelf',
      minimum_withdraw_amount: 6,
      withdraw_fee: 3,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'snttoken',
      code: 'snt',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Status',
      minimum_withdraw_amount: 80,
      withdraw_fee: 40,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'iosttoken',
      code: 'iost',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'internet of Services',
      minimum_withdraw_amount: 200,
      withdraw_fee: 100,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'mcotoken',
      code: 'mco',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Crypto.com',
      minimum_withdraw_amount: 0.4,
      withdraw_fee: 0.2,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'npxstoken',
      code: 'npxs',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'PundiX',
      minimum_withdraw_amount: 800,
      withdraw_fee: 400,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'knctoken',
      code: 'knc',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Kyber Network',
      minimum_withdraw_amount: 2,
      withdraw_fee: 1,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'engtoken',
      code: 'eng',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Enigma Project',
      minimum_withdraw_amount: 4,
      withdraw_fee: 2,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'bnttoken',
      code: 'bnt',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Bancor',
      minimum_withdraw_amount: 2,
      withdraw_fee: 1,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'powrtoken',
      code: 'powr',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Power Ledger',
      minimum_withdraw_amount: 10,
      withdraw_fee: 5,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'salttoken',
      code: 'salt',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'SALT',
      minimum_withdraw_amount: 4,
      withdraw_fee: 2,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'storjtoken',
      code: 'storj',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Storj',
      minimum_withdraw_amount: 6,
      withdraw_fee: 3,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'keytoken',
      code: 'key',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Selfkey',
      minimum_withdraw_amount: 400,
      withdraw_fee: 200,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'dnttoken',
      code: 'dnt',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'District0x',
      minimum_withdraw_amount: 100,
      withdraw_fee: 50,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'xlmcoin',
      code: 'xlm',
      coin: true,
      blockchain: 'https://stellarchain.io/tx/#{txid}',
      readable_name: 'Stellar',
      minimum_withdraw_amount: 0.02,
      withdraw_fee: 0.01,
      require_memo: true,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'hottoken',
      code: 'hot',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Holo',
      minimum_withdraw_amount: 5600,
      withdraw_fee: 2800,
      require_memo: false,
      can_withdraw: true,
      can_deposit: true,
      vote_currency: false,
    },
    {
      key: 'trxcoin',
      code: 'trx',
      coin: true,
      blockchain: 'https://tronscan.org/#/transaction/#{txid}',
      readable_name: 'Tron',
      minimum_withdraw_amount: 40000,
      withdraw_fee: 80,
      require_memo: false,
      can_withdraw: false,
      can_deposit: true,
      vote_currency: true,
    },
    {
      key: 'nfctoken',
      code: 'nfc',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'NoFakeCoin',
      minimum_withdraw_amount: 100000,
      withdraw_fee: 200,
      require_memo: false,
      can_withdraw: false,
      can_deposit: true,
      vote_currency: true,
    },
    {
      key: 'datxtoken',
      code: 'datx',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Digital Advertising Terminals',
      minimum_withdraw_amount: 250000,
      withdraw_fee: 500,
      require_memo: false,
      can_withdraw: false,
      can_deposit: true,
      vote_currency: true,
    },
    {
      key: 'polytoken',
      code: 'poly',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Polymath Network',
      minimum_withdraw_amount: 4500,
      withdraw_fee: 9,
      require_memo: false,
      can_withdraw: false,
      can_deposit: true,
      vote_currency: true,
    },
    {
      key: 'kwatttoken',
      code: 'kwatt',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: '4New',
      minimum_withdraw_amount: 10000,
      withdraw_fee: 20,
      require_memo: false,
      can_withdraw: false,
      can_deposit: true,
      vote_currency: true,
    },
    {
      key: 'vikkytoken',
      code: 'vikky',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'VikkyToken',
      minimum_withdraw_amount: 7500000,
      withdraw_fee: 15000,
      require_memo: false,
      can_withdraw: false,
      can_deposit: true,
      vote_currency: true,
    },
    {
      key: 'luctoken',
      code: 'luc',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Level Up Coin',
      minimum_withdraw_amount: 250000,
      withdraw_fee: 500,
      require_memo: false,
      can_withdraw: false,
      can_deposit: true,
      vote_currency: true,
    },
    {
      key: 'tnstoken',
      code: 'tns',
      coin: true,
      blockchain: 'https://etherscan.io/tx/#{txid}',
      readable_name: 'Transcodium',
      minimum_withdraw_amount: 175000,
      withdraw_fee: 350,
      require_memo: false,
      can_withdraw: false,
      can_deposit: true,
      vote_currency: true,
    },
  ],
}
