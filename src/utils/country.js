const globalCountries = [{
  code: 'US',
  en: 'United States of America (USA)',
  cn: '美国'
},
{
  code: 'AR',
  en: 'Argentina',
  ru: 'Аргентина',
  ja: 'アルゼンチン',
  ko: '아르헨티나',
  cn: '阿根廷',
  'zh-TW': '阿根廷'
},
{
  code: 'AD',
  en: 'Andorra',
  ru: 'Андорра',
  ja: 'アンドラ',
  ko: '안도라',
  cn: '安道尔',
  'zh-TW': '安道爾'
},
{
  code: 'AF',
  en: 'Afghanistan',
  ru: 'Афганистан',
  ja: 'アフガニスタン',
  ko: '아프가니스탄',
  cn: '阿富汗',
  'zh-TW': '阿富汗'
},
{
  code: 'AG',
  en: 'Antigua & Barbuda',
  ru: 'Антигуа и Барбуда',
  ja: 'アンティグア・バーブーダ',
  ko: '안티과 & 바르부다',
  cn: '安提瓜和巴布达',
  'zh-TW': '安提瓜和巴布達'
},
{
  code: 'AI',
  en: 'Anguilla',
  ru: 'Ангилья',
  ja: 'アルバニア',
  ko: '앵귈라',
  cn: '安圭拉',
  'zh-TW': '安圭拉'
},
{
  code: 'AL',
  en: 'Albania',
  ru: 'Албания',
  ja: 'アンギラ',
  ko: '알바니아',
  cn: '阿尔巴尼亚',
  'zh-TW': '阿爾巴尼亞'
},
{
  code: 'AM',
  en: 'Armenia',
  ru: 'Армения',
  ja: 'アルメニア',
  ko: '아르메니아',
  cn: '亚美尼亚',
  'zh-TW': '亞美尼亞'
},
{
  code: 'AO',
  en: 'Angola',
  ru: 'Ангола',
  ja: 'アンゴラ',
  ko: '앙골라',
  cn: '安哥拉',
  'zh-TW': '安哥拉'
},
{
  code: 'AQ',
  en: 'Antarctica',
  ru: 'Антарктида',
  ja: '南極大陸',
  ko: '남극 대륙',
  cn: '南极洲',
  'zh-TW': '南極洲'
},
{
  code: 'AS',
  en: 'American Samoa',
  ru: 'Американское Самоа',
  ja: 'アメリカ領サモア',
  ko: '아메리칸 사모아',
  cn: '美属萨摩亚',
  'zh-TW': '美屬薩摩亞'
},
{
  code: 'AT',
  en: 'Austria',
  ru: 'Австрия',
  ja: 'オーストリア',
  ko: '오스트리아',
  cn: '奥地利',
  'zh-TW': '奧地利'
},
{
  code: 'AU',
  en: 'Australia',
  ru: 'Австралия',
  ja: 'オーストラリア',
  ko: '호주',
  cn: '澳大利亚',
  'zh-TW': '澳大利亞'
},
{
  code: 'AW',
  en: 'Aruba',
  ru: 'Аруба',
  ja: 'アルバ',
  ko: '아루바',
  cn: '阿鲁巴',
  'zh-TW': '阿路巴'
},
{
  code: 'AX',
  en: 'Aland Island',
  ru: 'Остров Аланд',
  ja: 'オーランド諸島',
  ko: '알랜드 섬',
  cn: '奥兰群岛',
  'zh-TW': '奧蘭群島'
},
{
  code: 'AZ',
  en: 'Azerbaijan',
  ru: 'Азербайджан',
  ja: 'アゼルバイジャン',
  ko: '아제르바이잔',
  cn: '阿塞拜疆',
  'zh-TW': '亞塞拜然'
},
{
  code: 'DZ',
  en: 'Algeria',
  ru: 'Азербайджан',
  ja: 'アルジェリア',
  ko: '알제리',
  cn: '阿尔及利亚',
  'zh-TW': '阿爾及利亞'
},
{
  code: 'BA',
  en: 'Bosnia & Herzegovina',
  ru: 'Босния и Герцеговина',
  ja: 'ボスニア・ヘルツェゴビナ',
  ko: '보스니아 & 헤르체고비나',
  cn: '波黑',
  'zh-TW': '波黑'
},
{
  code: 'BB',
  en: 'Barbados',
  ru: 'Барбадос',
  ja: 'バルバドス',
  ko: '바베이도스',
  cn: '巴巴多斯',
  'zh-TW': '巴貝多'
},
{
  code: 'BD',
  en: 'Bangladesh',
  ru: 'Бангладеш',
  ja: 'バングラデッシュ',
  ko: '방글라데시',
  cn: '孟加拉',
  'zh-TW': '孟加拉'
},
{
  code: 'BE',
  en: 'Belgium',
  ru: 'Белгия',
  ja: 'ベルギー',
  ko: '벨기에',
  cn: '比利时',
  'zh-TW': '比利時'
},
{
  code: 'BF',
  en: 'Burkina',
  ru: 'Буркина',
  ja: 'ブルキナファソ',
  ko: '부르키나',
  cn: '布基纳法索',
  'zh-TW': '有吉納法索'
},
{
  code: 'BG',
  en: 'Bulgaria',
  ru: 'Болгария',
  ja: 'バーレーン',
  ko: '불가리아',
  cn: '保加利亚',
  'zh-TW': '保加利亞'
},
{
  code: 'BH',
  en: 'Bahrain',
  ru: 'Бахрейн',
  ja: 'ブルガリア',
  ko: '바레인',
  cn: '巴林',
  'zh-TW': '巴林'
},
{
  code: 'BI',
  en: 'Burundi',
  ru: 'Бурунди',
  ja: 'ブルンジ',
  ko: '부룬디',
  cn: '布隆迪',
  'zh-TW': '蒲隆地'
},
{
  code: 'BJ',
  en: 'Benin',
  ru: 'Бенин',
  ja: 'ベナン',
  ko: '베냉',
  cn: '贝宁',
  'zh-TW': '貝南'
},
{
  code: 'BM',
  en: 'Bermuda',
  ru: 'Бермудские острова',
  ja: 'バミューダ',
  ko: '버뮤다',
  cn: '百慕大',
  'zh-TW': '百慕達'
},
{
  code: 'BN',
  en: 'Brunei',
  ru: 'Бруней',
  ja: 'ブルネイ',
  ko: '브루나이',
  cn: '文莱',
  'zh-TW': '汶萊'
},
{
  code: 'BO',
  en: 'Bolivia',
  ru: 'Боливия',
  ja: 'ボリビア',
  ko: '볼리비아',
  cn: '玻利维亚',
  'zh-TW': '玻利維亞'
},
{
  code: 'BR',
  en: 'Brazil',
  ru: 'Бразилия',
  ja: 'ブラジル',
  ko: '브라질',
  cn: '巴西',
  'zh-TW': '巴西'
},
{
  code: 'BS',
  en: 'Bahamas',
  ru: 'Багамские о-ва',
  ja: 'バハマ',
  ko: '바하마',
  cn: '巴哈马',
  'zh-TW': '巴哈馬'
},
{
  code: 'BT',
  en: 'Bhutan',
  ru: 'Бутан',
  ja: 'ブータン',
  ko: '부탄',
  cn: '不丹',
  'zh-TW': '不丹'
},
{
  code: 'IO',
  en: 'British Indian Ocean Territory',
  ru: 'Британская территория Индийского океана',
  ja: 'イギリス領インド洋地域',
  ko: '영국령 인도양 영토',
  cn: '英属印度洋领地',
  'zh-TW': '英屬印度洋領地'
},
{
  code: 'VG',
  en: 'British Virgin Islands',
  ru: 'Британские Виргинские острова',
  ja: 'イギリス領バージン諸島',
  ko: '영국령 버진 아일랜드',
  cn: '英属维尔京群岛',
  'zh-TW': '英屬維爾京群島'
},
{
  code: 'BV',
  en: 'Bouvet Island',
  ru: 'Остров Буве',
  ja: 'ブーベ島',
  ko: '부베섬',
  cn: '布韦岛',
  'zh-TW': '布韋島'
},
{
  code: 'BW',
  en: 'Botswana',
  ru: 'Ботсвана',
  ja: 'ボツワナ',
  ko: '보츠와나',
  cn: '博茨瓦纳',
  'zh-TW': '波札那'
},
{
  code: 'BY',
  en: 'Belarus',
  ru: 'Беларусь',
  ja: 'ベラルーシ',
  ko: '벨로루시',
  cn: '白俄罗斯',
  'zh-TW': '白俄羅斯'
},
{
  code: 'BZ',
  en: 'Belize',
  ru: 'Белиз',
  ja: 'ベリーズ',
  ko: '벨리즈',
  cn: '伯利兹',
  'zh-TW': '貝里斯'
},
{
  code: 'CA',
  en: 'Canada',
  ru: 'Канада',
  ja: 'カナダ',
  ko: '캐나다',
  cn: '加拿大',
  'zh-TW': '加拿大'
},
{
  code: 'HR',
  en: 'Croatia',
  ru: 'Хорватия',
  ja: 'クロアチア',
  ko: '크로아티아',
  cn: '克罗地亚',
  'zh-TW': '克羅埃西亞'
},
{
  code: 'BQ',
  en: 'Caribbean Netherlands',
  ru: 'Карибские острова',
  ja: 'オランダカリブ領域',
  ko: '카리브해 네덜란드',
  cn: '荷兰加勒比区',
  'zh-TW': '荷蘭加勒比區'
},
{
  code: 'CC',
  en: 'Cocos (Keeling) Islands',
  ru: 'Кокосовые (Килинг) острова',
  ja: 'ココス諸島',
  ko: '코코스 제도',
  cn: '科科斯群岛',
  'zh-TW': '科科斯群島'
},
{
  code: 'CF',
  en: 'Central African Republic',
  ru: 'Центрально-Африканская Республика',
  ja: '中央アフリカ',
  ko: '중앙 아프리카 공화국',
  cn: '中非',
  'zh-TW': '中非共和國'
},
{
  code: 'CI',
  en: 'Cote d\'Ivoire',
  ru: 'Берег Слоновой Кости',
  ja: 'コートジボワール',
  ko: '코트 디부 아르',
  cn: '科特迪瓦',
  'zh-TW': '象牙海岸'
},
{
  code: 'CK',
  en: 'Cook Islands',
  ru: 'Острова Кука',
  ja: 'クック諸島',
  ko: '쿡 제도',
  cn: '库克群岛',
  'zh-TW': '科克群島'
},
{
  code: 'CL',
  en: 'Chile',
  ru: 'Чили',
  ja: 'チリ',
  ko: '칠레',
  cn: '智利',
  'zh-TW': '智利'
},
{
  code: 'CM',
  en: 'Cameroon',
  ru: 'Камерун',
  ja: 'カメルーン',
  ko: '카메룬',
  cn: '喀麦隆',
  'zh-TW': '喀麥隆'
},
// {
//   code: 'CN',
//   en: 'China',
//   ru: 'Китай',
//   ja: '中国',
//   ko: '중국',
//   cn: '中国',
//   'zh-TW': '中國大陸'
// },
{
  code: 'HK',
  en: 'Hong Kong',
  ru: 'Гонконг',
  ja: '中国香港',
  ko: '홍콩',
  cn: '中国香港',
  'zh-TW': '香港'
},
{
  code: 'zh-TW',
  en: 'Taiwan',
  ru: 'Тайвань',
  ja: '中華台北（台湾）',
  ko: '대만',
  cn: '中华台北（台湾）',
  'zh-TW': '台灣'
},
{
  code: 'MO',
  en: 'Macao',
  ru: 'Macao',
  ja: '中国マカウ',
  ko: '마카오',
  cn: '中国澳门',
  'zh-TW': '澳門'
},
{
  code: 'CO',
  en: 'Colombia',
  ru: 'Колумбия',
  ja: 'コロンビア',
  ko: '콜롬비아',
  cn: '哥伦比亚',
  'zh-TW': '哥倫比亞'
},
{
  code: 'CR',
  en: 'Costa Rica',
  ru: 'Коста-Рика',
  ja: 'コスタリカ',
  ko: '코스타리카',
  cn: '哥斯达黎加',
  'zh-TW': '哥斯大黎加'
},
{
  code: 'CU',
  en: 'Cuba',
  ru: 'Куба',
  ja: 'キューバ',
  ko: '쿠바',
  cn: '古巴',
  'zh-TW': '古巴'
},
{
  code: 'CV',
  en: 'Cape Verde',
  ru: 'Кабо-Верде',
  ja: 'カボベルデ',
  ko: '카보 베르데',
  cn: '佛得角',
  'zh-TW': '維德角島'
},
{
  code: 'CW',
  en: 'Curacao',
  ru: 'Куракао',
  ja: 'キュラソー島',
  ko: '큐라소',
  cn: '库拉索',
  'zh-TW': '庫拉索'
},
{
  code: 'KH',
  en: 'Cambodia',
  ru: 'Камбоджа',
  ja: 'カンボジア',
  ko: '캄보디아',
  cn: '柬埔寨',
  'zh-TW': '柬埔寨'
},
{
  code: 'CX',
  en: 'Christmas Island',
  ru: 'Остров Рождества',
  ja: 'クリスマス島',
  ko: '크리스마스 섬',
  cn: '圣诞岛',
  'zh-TW': '聖誕島'
},
{
  code: 'CY',
  en: 'Cyprus',
  ru: 'Кипр',
  ja: 'キプロス',
  ko: '키프로스',
  cn: '塞浦路斯',
  'zh-TW': '塞浦路斯'
},
{
  code: 'KY',
  en: 'Cayman Islands',
  ru: 'Каймановы острова',
  ja: 'ケイマン諸島',
  ko: '케이맨 제도',
  cn: '开曼群岛',
  'zh-TW': '開曼群島'
},
{
  code: 'CZ',
  en: 'Czech Republic',
  ru: 'Чешская Республика',
  ja: 'チェコ',
  ko: '체코 공화국',
  cn: '捷克',
  'zh-TW': '捷克'
},
{
  code: 'CD',
  en: 'Democratic Republic of the Congo',
  ru: 'Демократическая Республика Конго',
  ja: 'コンゴ（金）',
  ko: '콩고 민주 공화국',
  cn: '刚果（金）',
  'zh-TW': '剛果'
},
{
  code: 'TD',
  en: 'Chad',
  ru: 'Чад',
  ja: 'チャド',
  ko: '차드',
  cn: '乍得',
  'zh-TW': '查德'
},
{
  code: 'DJ',
  en: 'Djibouti',
  ru: 'Джибути',
  ja: 'ジブチ',
  ko: '지부티',
  cn: '吉布提',
  'zh-TW': '吉布提'
},
{
  code: 'DK',
  en: 'Denmark',
  ru: 'Дания',
  ja: 'デンマーク',
  ko: '덴마크',
  cn: '丹麦',
  'zh-TW': '丹麥'
},
{
  code: 'DM',
  en: 'Dominica',
  ru: 'Доминика',
  ja: 'ドミニカ国',
  ko: '도미니카',
  cn: '多米尼克',
  'zh-TW': '多米尼克'
},
{
  code: 'DO',
  en: 'Dominican Republic',
  ru: 'Доминиканская Республика',
  ko: '도미니카 공화국',
  cn: '多米尼加',
  'zh-TW': '多明尼加'
},
{
  code: 'EC',
  en: 'Ecuador',
  ru: 'Эквадор',
  ja: 'エクアドル',
  ko: '에콰도르',
  cn: '厄瓜多尔',
  'zh-TW': '厄瓜多爾'
},
{
  code: 'EE',
  en: 'Estonia',
  ru: 'Эстония',
  ja: 'エストニア',
  ko: '에스토니아',
  cn: '爱沙尼亚',
  'zh-TW': '愛沙尼亞'
},
{
  code: 'GQ',
  en: 'Equatorial Guinea',
  ru: 'Экваториальная Гвинея',
  ja: '赤道ギニア',
  ko: '적도 기니',
  cn: '赤道几内亚',
  'zh-TW': '幾內亞'
},
{
  code: 'EG',
  en: 'Egypt',
  ru: 'Египт',
  ja: 'エジプト',
  ko: '이집트',
  cn: '埃及',
  'zh-TW': '埃及'
},
{
  code: 'ER',
  en: 'Eritrea',
  ru: 'Эритрея',
  ja: 'エリトリア',
  ko: '에리트리아',
  cn: '厄立特里亚',
  'zh-TW': '厄利垂亞'
},
{
  code: 'ET',
  en: 'Ethiopia',
  ru: 'Эфиопия',
  ja: 'エチオピア',
  ko: '에티오피아',
  cn: '埃塞俄比亚',
  'zh-TW': '衣索匹亞'
},
{
  code: 'SV',
  en: 'El Salvador',
  ru: 'Сальвадор',
  ja: 'エルサルバドル',
  ko: '엘살바도르',
  cn: '萨尔瓦多',
  'zh-TW': '薩爾瓦多'
},
{
  code: 'FI',
  en: 'Finland',
  ru: 'Финляндия',
  ja: 'フィンランド',
  ko: '핀란드',
  cn: '芬兰',
  'zh-TW': '芬蘭'
},
{
  code: 'FJ',
  en: 'Fiji',
  ru: 'Фиджи',
  ja: 'フィジー',
  ko: '피지',
  cn: '斐济群岛',
  'zh-TW': '斐濟'
},
{
  code: 'PF',
  en: 'French polynesia',
  ru: 'Французская Полинезия',
  ja: 'フランス領ポリネシア',
  ko: '프랑스 폴리네시아',
  cn: '法属波利尼西亚',
  'zh-TW': '法屬玻里尼西亞'
},
{
  code: 'GF',
  en: 'French Guiana',
  ru: 'Французская Гвиана',
  ja: 'フランス領ガイアナ',
  ko: '프랑스령 기아나',
  cn: '法属圭亚那',
  'zh-TW': '法屬圭亞那'
},
{
  code: 'FK',
  en: 'Falkland Islands',
  ru: 'Фолклендские острова',
  ja: 'フォークランド諸島（福克兰）',
  ko: '포클랜드 제도',
  cn: '马尔维纳斯群岛（福克兰）',
  'zh-TW': '馬爾維納斯群島（福克蘭）'
},
{
  code: 'FM',
  en: 'Federated States of Micronesia',
  ru: 'Федеративные Штаты Микронезии',
  ja: 'ミクロネシア連邦',
  ko: '미크로네시아 연방',
  cn: '密克罗尼西亚联邦',
  'zh-TW': '密克羅尼西亞聯邦'
},
{
  code: 'FO',
  en: 'Faroe Islands',
  ru: 'Фарерские острова',
  ja: 'フェロー諸島',
  ko: '페로 제도',
  cn: '法罗群岛',
  'zh-TW': '法羅群島'
},
{
  code: 'FR',
  en: 'France',
  ru: 'Франция',
  ja: 'フランス',
  ko: '프랑스',
  cn: '法国',
  'zh-TW': '法國'
},
{
  code: 'TF',
  en: 'French Southern Territories',
  ru: 'Южные Французские Территории',
  ja: 'フランス領南方・南極地域',
  ko: '프랑스 남부 영토',
  cn: '法属南部领地',
  'zh-TW': '法屬南部領地'
},
{
  code: 'GA',
  en: 'Gabon',
  ru: 'Габон',
  ja: 'ガボン',
  ko: '가봉',
  cn: '加蓬',
  'zh-TW': '加彭'
},
{
  code: 'DE',
  en: 'Germany',
  ru: 'Германия',
  ja: 'ドイツ',
  ko: '독일',
  cn: '德国',
  'zh-TW': '德國'
},
{
  code: 'GB',
  en: 'Great Britain (United Kingdom; England)',
  ru: 'Великобритания (Англия)',
  ja: 'イギリス',
  ko: '영국',
  cn: '英国',
  'zh-TW': '英國'
},
{
  code: 'GD',
  en: 'Grenada',
  ru: 'Гренада',
  ja: 'グレナダ ',
  ko: '그레나다',
  cn: '格林纳达',
  'zh-TW': '格瑞那達'
},
{
  code: 'GE',
  en: 'Georgia',
  ru: 'Грузия',
  ja: 'グルジア',
  ko: '조지아',
  cn: '格鲁吉亚',
  'zh-TW': '喬治亞'
},
{
  code: 'GG',
  en: 'Guernsey',
  ru: 'Гернси',
  ja: 'ガーンジー',
  ko: '건지섬',
  cn: '根西岛',
  'zh-TW': '根西島'
},
{
  code: 'GH',
  en: 'Ghana',
  ru: 'Гана',
  ja: 'ガーナ',
  ko: '가나',
  cn: '加纳',
  'zh-TW': '迦納'
},
{
  code: 'GI',
  en: 'Gibraltar',
  ru: 'Гибралтар',
  ja: 'ジブラルタル',
  ko: '지브롤터',
  cn: '直布罗陀',
  'zh-TW': '直布羅陀'
},
{
  code: 'GL',
  en: 'Greenland',
  ru: 'Гренландия',
  ja: 'グリーンランド',
  ko: '그린란드',
  cn: '格陵兰',
  'zh-TW': '格陵蘭'
},
{
  code: 'GM',
  en: 'Gambia',
  ru: 'Гамбия',
  ja: 'ガンビア',
  ko: '감비아',
  cn: '冈比亚',
  'zh-TW': '岡比亞'
},
{
  code: 'GN',
  en: 'Guinea',
  ru: 'Гвинея',
  ja: 'ギニア',
  ko: '기니',
  cn: '几内亚',
  'zh-TW': '幾內亞'
},
{
  code: 'GP',
  en: 'Guadeloupe',
  ru: 'Гваделупа',
  ja: 'グアドループ',
  ko: '과들루프',
  cn: '瓜德罗普',
  'zh-TW': '瓜德羅普'
},
{
  code: 'GR',
  en: 'Greece',
  ru: 'Греция',
  ja: 'ギリシア',
  ko: '그리스',
  cn: '希腊',
  'zh-TW': '希臘'
},
{
  code: 'GT',
  en: 'Guatemala',
  ru: 'Гватемала',
  ja: 'グアテマラ',
  ko: '과테말라',
  cn: '危地马拉',
  'zh-TW': '瓜地馬拉'
},
{
  code: 'GU',
  en: 'Guam',
  ru: 'Гуам',
  ja: 'グアム島',
  ko: '괌',
  cn: '关岛',
  'zh-TW': '關島'
},
{
  code: 'GW',
  en: 'Guinea-Bissau',
  ru: 'Гвинея-Бисау',
  ja: 'ギニアビサウ',
  ko: '기니 비사',
  cn: '几内亚比绍',
  'zh-TW': '幾內亞比紹'
},
{
  code: 'GY',
  en: 'Guyana',
  ru: 'Гайана',
  ja: 'ガイアナ',
  ko: '가이아나',
  cn: '圭亚那',
  'zh-TW': '蓋亞那'
},
{
  code: 'HM',
  en: 'Heard Island and McDonald Islands',
  ru: 'Острова Херд и Макдональд',
  ja: 'ハード島とマクドナルド諸島',
  ko: '허드 아일랜드와 맥도널드 제도',
  cn: '赫德岛和麦克唐纳群岛',
  'zh-TW': '赫德島和麥克唐納群島'
},
{
  code: 'HN',
  en: 'Honduras',
  ru: 'Гондурас',
  ja: 'ホンデュラス',
  ko: '온두라스',
  cn: '洪都拉斯',
  'zh-TW': '宏都拉斯'
},
{
  code: 'HT',
  en: 'Haiti',
  ru: 'Гаити',
  ja: 'ハイチ',
  ko: '아이티',
  cn: '海地',
  'zh-TW': '海地'
},
{
  code: 'HU',
  en: 'Hungary',
  ru: 'Венгрия',
  ja: 'ハンガリー',
  ko: '헝가리',
  cn: '匈牙利',
  'zh-TW': '匈牙利'
},
{
  code: 'ID',
  en: 'Indonesia',
  ru: 'Индонезия',
  ja: 'インドネシア',
  ko: '인도네시아',
  cn: '印尼',
  'zh-TW': '印尼'
},
{
  code: 'IE',
  en: 'Ireland',
  ru: 'Ирландия',
  ja: 'アイルランド',
  ko: '아일랜드',
  cn: '爱尔兰',
  'zh-TW': '愛爾蘭'
},
{
  code: 'IL',
  en: 'Israel',
  ru: 'Израиль',
  ja: 'イスラエル',
  ko: '이스라엘',
  cn: '以色列',
  'zh-TW': '以色列'
},
{
  code: 'IM',
  en: 'Isle of Man',
  ru: 'Остров Мэн',
  ja: 'マルヌ島',
  ko: '맨섬',
  cn: '马恩岛',
  'zh-TW': '馬恩島'
},
{
  code: 'IN',
  en: 'India',
  ru: 'Индия',
  ja: 'インド',
  ko: '인도',
  cn: '印度',
  'zh-TW': '印度'
},
{
  code: 'IQ',
  en: 'Iraq',
  ru: 'Ирак',
  ja: 'イラク',
  ko: '이라크',
  cn: '伊拉克',
  'zh-TW': '伊拉克'
},
{
  code: 'IR',
  en: 'Iran',
  ru: 'Иран',
  ja: 'イラン',
  ko: '이란',
  cn: '伊朗',
  'zh-TW': '依朗'
},
{
  code: 'IS',
  en: 'Iceland',
  ru: 'Исландия',
  ja: 'アイスランド',
  ko: '아이슬란드',
  cn: '冰岛',
  'zh-TW': '冰島'
},
{
  code: 'IT',
  en: 'Italy',
  ru: 'Италия',
  ja: 'イタリア',
  ko: '이탈리아',
  cn: '意大利',
  'zh-TW': '義大利'
},
{
  code: 'JE',
  en: 'Jersey',
  ru: 'Джерси',
  ja: 'ジャージー島',
  ko: '저지',
  cn: '泽西岛',
  'zh-TW': '澤西島'
},
{
  code: 'JM',
  en: 'Jamaica',
  ru: 'Ямайка',
  ja: 'ジャマイカ',
  ko: '자메이카',
  cn: '牙买加',
  'zh-TW': '牙買加'
},
{
  code: 'JO',
  en: 'Jordan',
  ru: 'Иордания',
  ja: 'ヨルダン',
  ko: '요르단',
  cn: '约旦',
  'zh-TW': '約旦'
},
{
  code: 'JP',
  en: 'Japan',
  ru: 'Япония',
  ja: '日本',
  ko: '일본',
  cn: '日本',
  'zh-TW': '日本'
},
{
  code: 'KE',
  en: 'Kenya',
  ru: 'Кения',
  ja: 'ケニア',
  ko: '케냐',
  cn: '肯尼亚',
  'zh-TW': '肯亞'
},
{
  code: 'KG',
  en: 'Kyrgyzstan',
  ru: 'Киргизстан',
  ja: 'キルギス',
  ko: '키르기즈스탄',
  cn: '吉尔吉斯斯坦',
  'zh-TW': '吉爾吉斯斯坦'
},
{
  code: 'KI',
  en: 'Kiribati',
  ru: 'Кирибати',
  ja: 'キリバス',
  ko: '키리바시',
  cn: '基里巴斯',
  'zh-TW': '基里巴斯共和國'
},
{
  code: 'KW',
  en: 'Kuwait',
  ru: 'Кувейт',
  ja: 'クウェート',
  ko: '쿠웨이트',
  cn: '科威特',
  'zh-TW': '科威特'
},
{
  code: 'KZ',
  en: 'Kazakhstan',
  ru: 'Казахстан',
  ja: 'カザフスタン',
  ko: '카자흐스탄',
  cn: '哈萨克斯坦',
  'zh-TW': '哈薩克'
},
{
  code: 'LA',
  en: 'Laos',
  ru: 'Лаос',
  ja: 'ラオス',
  ko: '라오스',
  cn: '老挝',
  'zh-TW': '寮國'
},
{
  code: 'LB',
  en: 'Lebanon',
  ru: 'Ливан',
  ja: 'レバノン',
  ko: '레바논',
  cn: '黎巴嫩',
  'zh-TW': '黎巴嫩'
},
{
  code: 'LI',
  en: 'Liechtenstein',
  ru: 'Лихтенштейн',
  ja: 'リヒテンシュタイン',
  ko: '리히텐슈타인',
  cn: '列支敦士登',
  'zh-TW': '列支敦士登'
},
{
  code: 'LR',
  en: 'Liberia',
  ru: 'Либерия',
  ja: 'リベリア',
  ko: '라이베리아',
  cn: '利比里亚',
  'zh-TW': '賴比瑞亞'
},
{
  code: 'LS',
  en: 'Lesotho',
  ru: 'Лесото',
  ja: 'レソト',
  ko: '레소토',
  cn: '莱索托',
  'zh-TW': '賴索托'
},
{
  code: 'LT',
  en: 'Lithuania',
  ru: 'Литва',
  ja: 'リトアニア',
  ko: '리투아니아',
  cn: '立陶宛',
  'zh-TW': '立陶宛'
},
{
  code: 'LU',
  en: 'Luxembourg',
  ru: 'Люксембург',
  ja: 'ルクセンブルク',
  ko: '룩셈부르크',
  cn: '卢森堡',
  'zh-TW': '盧森堡'
},
{
  code: 'LV',
  en: 'Latvia',
  ru: 'Латвия',
  ja: 'ラトビア',
  ko: '라트비아',
  cn: '拉脱维亚',
  'zh-TW': '拉脫維亞'
},
{
  code: 'LY',
  en: 'Libya',
  ru: 'Ливия',
  ja: 'リビア',
  ko: '리비아',
  cn: '利比亚',
  'zh-TW': '利比亞'
},
{
  code: 'MA',
  en: 'Morocco',
  ru: 'Марокко',
  ja: 'モロッコ',
  ko: '모로코',
  cn: '摩洛哥',
  'zh-TW': '摩洛哥'
},
{
  code: 'MC',
  en: 'Monaco',
  ru: 'Монако',
  ja: 'モナコ',
  ko: '모나코',
  cn: '摩纳哥',
  'zh-TW': '摩納哥'
},
{
  code: 'MD',
  en: 'Moldova',
  ru: 'Молдова',
  ja: 'モルドバ',
  ko: '몰도바',
  cn: '摩尔多瓦',
  'zh-TW': '摩爾多瓦'
},
{
  code: 'ME',
  en: 'Montenegro',
  ru: 'Черногория',
  ja: 'モンテネグロ',
  ko: '몬테네그로',
  cn: '黑山',
  'zh-TW': '黑山'
},
{
  code: 'MG',
  en: 'Madagascar',
  ru: 'Мадагаскар',
  ja: 'マダガスカル',
  ko: '마다가스카르',
  cn: '马达加斯加',
  'zh-TW': '馬達加斯加'
},
{
  code: 'MH',
  en: 'Marshall islands',
  ru: 'Маршалловы острова',
  ja: 'マーシャル諸島',
  ko: '마샬 군도',
  cn: '马绍尔群岛',
  'zh-TW': '馬紹爾群島'
},
{
  code: 'ML',
  en: 'Mali',
  ru: 'Мали',
  ja: 'マリ',
  ko: '말리',
  cn: '马里',
  'zh-TW': '馬利'
},
{
  code: 'MM',
  en: 'Myanmar (Burma)',
  ru: 'Мьянма (Бирма)',
  ja: 'ミャンマー',
  ko: '미얀마 (버마)',
  cn: '缅甸',
  'zh-TW': '緬甸'
},
{
  code: 'MN',
  en: 'Mongolia',
  ru: 'Монголия',
  ja: 'モンゴル',
  ko: '몽골',
  cn: '蒙古国',
  'zh-TW': '蒙古'
},
{
  code: 'MP',
  en: 'Northern Mariana Islands',
  ru: 'Северные Марианские острова',
  ja: '北マリアナ諸島',
  ko: '북 마리아나 제도',
  cn: '北马里亚纳群岛',
  'zh-TW': '北馬里亞納群島'
},
{
  code: 'MQ',
  en: 'Martinique',
  ru: 'Мартиника',
  ja: 'マルティニーク',
  ko: '마르티니크',
  cn: '马提尼克',
  'zh-TW': '馬提尼克'
},
{
  code: 'MR',
  en: 'Mauritania',
  ru: 'Мавритания',
  ja: 'モーリタニア',
  ko: '모리타니',
  cn: '毛里塔尼亚',
  'zh-TW': '茅利塔尼亞'
},
{
  code: 'MS',
  en: 'Montserrat',
  ru: 'Монсеррат',
  ja: '蒙塞拉特岛',
  ko: '몬트세라트',
  cn: '蒙塞拉特岛',
  'zh-TW': '蒙塞拉特島'
},
{
  code: 'MT',
  en: 'Malta',
  ru: 'Мальта',
  ja: 'マルタ',
  ko: '몰타',
  cn: '马耳他',
  'zh-TW': '馬爾他'
},
{
  code: 'MU',
  en: 'Mauritius',
  ru: 'Маврикий',
  ja: 'モーリシャス',
  ko: '모리셔스',
  cn: '毛里求斯',
  'zh-TW': '模里西斯'
},
{
  code: 'MV',
  en: 'Maldives',
  ru: 'Мальдивы',
  ja: 'モルジブ',
  ko: '몰디브',
  cn: '马尔代夫',
  'zh-TW': '馬爾地夫'
},
{
  code: 'MW',
  en: 'Malawi',
  ru: 'Малави',
  ja: 'マラウィ',
  ko: '말라위',
  cn: '马拉维',
  'zh-TW': '馬拉威'
},
{
  code: 'MX',
  en: 'Mexico',
  ru: 'Мексико',
  ja: 'メキシコ',
  ko: '멕시코',
  cn: '墨西哥',
  'zh-TW': '墨西哥'
},
{
  code: 'MY',
  en: 'Malaysia',
  ru: 'Малайзия',
  ja: 'マレーシア',
  ko: '말레이시아',
  cn: '马来西亚',
  'zh-TW': '馬來西亞'
},
{
  code: 'MZ',
  en: 'Mozambique',
  ru: 'Мозамбик',
  ja: 'モザンビーク',
  ko: '모잠비크',
  cn: '莫桑比克',
  'zh-TW': '莫三鼻克'
},
{
  code: 'YT',
  en: 'Mayotte',
  ru: 'Майотта',
  ja: 'マヨット',
  ko: '마요트',
  cn: '马约特',
  'zh-TW': '馬約特'
},
{
  code: 'NA',
  en: 'Namibia',
  ru: 'Намибия',
  ja: 'ナミビア',
  ko: '나미비아',
  cn: '纳米比亚',
  'zh-TW': '納米比亞'
},
{
  code: 'NC',
  en: 'New Caledonia',
  ru: 'Новая Каледония',
  ja: 'ニューカレドニア',
  ko: '뉴 칼레도니아',
  cn: '新喀里多尼亚',
  'zh-TW': '新喀里多尼亞'
},
{
  code: 'NE',
  en: 'Niger',
  ru: 'Нигер',
  ja: 'ニジェール',
  ko: '니제르',
  cn: '尼日尔',
  'zh-TW': '尼日'
},
{
  code: 'NF',
  en: 'Norfolk Island',
  ru: 'Остров Норфолк',
  ja: 'ノーフォーク島',
  ko: '노퍽 섬',
  cn: '诺福克岛',
  'zh-TW': '克羅埃西亞'
},
{
  code: 'NG',
  en: 'Nigeria',
  ru: 'Нигерия',
  ja: 'ナイジェリア',
  ko: '나이지리아',
  cn: '尼日利亚',
  'zh-TW': '奈及利亞'
},
{
  code: 'NI',
  en: 'Nicaragua',
  ru: 'Никарагуа',
  ja: 'ニカラグア',
  ko: '니카라과',
  cn: '尼加拉瓜',
  'zh-TW': '尼加拉瓜'
},
{
  code: 'NL',
  en: 'Netherlands',
  ru: 'Нидерланды',
  ja: 'オランダ',
  ko: '네덜란드',
  cn: '荷兰',
  'zh-TW': '荷蘭'
},
{
  code: 'NO',
  en: 'Norway',
  ru: 'Норвегия',
  ja: 'ノルウェー',
  ko: '노르웨이',
  cn: '挪威',
  'zh-TW': '挪威'
},
{
  code: 'NP',
  en: 'Nepal',
  ru: 'Непал',
  ja: 'ネパール',
  ko: '네팔',
  cn: '尼泊尔',
  'zh-TW': '尼泊爾'
},
{
  code: 'KP',
  en: 'North Korea',
  ru: 'Северная Корея',
  ja: '北朝鮮',
  ko: '북한',
  cn: '朝鲜',
  'zh-TW': '北韓'
},
{
  code: 'NR',
  en: 'Nauru',
  ru: 'Науру',
  ja: 'ナウル',
  ko: '나우루',
  cn: '瑙鲁',
  'zh-TW': '諾魯'
},
{
  code: 'NU',
  en: 'Niue',
  ru: 'Ниуэ',
  ja: 'ニウエ',
  ko: '니우에',
  cn: '纽埃',
  'zh-TW': '紐埃'
},
{
  code: 'NZ',
  en: 'New Zealand',
  ru: 'Новая Зеландия',
  ja: 'ニュージーランド',
  ko: '뉴질랜드',
  cn: '新西兰',
  'zh-TW': '紐西蘭'
},
{
  code: 'OM',
  en: 'Oman',
  ru: 'Оман',
  ja: 'オマン',
  ko: '오만',
  cn: '阿曼',
  'zh-TW': '阿曼'
},
{
  code: 'PA',
  en: 'Panama',
  ru: 'Панама',
  ja: 'パナマ',
  ko: '파나마',
  cn: '巴拿马',
  'zh-TW': '巴拿馬'
},
{
  code: 'PE',
  en: 'Peru',
  ru: 'Перу',
  ja: 'ペルー',
  ko: '페루',
  cn: '秘鲁',
  'zh-TW': '秘魯'
},
{
  code: 'PG',
  en: 'Papua New Guinea',
  ru: 'Папуа - Новая Гвинея',
  ja: 'パプアニューギニア',
  ko: '파푸아 뉴기니',
  cn: '巴布亚新几内亚',
  'zh-TW': '巴布亞紐幾內亞'
},
{
  code: 'PK',
  en: 'Pakistan',
  ru: 'Пакистан',
  ja: 'パキスタン',
  ko: '파키스탄',
  cn: '巴基斯坦',
  'zh-TW': '巴基斯坦'
},
{
  code: 'PL',
  en: 'Poland',
  ru: 'Польша',
  ja: 'ポーランド',
  ko: '폴란드',
  cn: '波兰',
  'zh-TW': '波蘭'
},
{
  code: 'PM',
  en: 'Saint-Pierre and Miquelon',
  ru: 'Сен-Пьер и Микелон',
  ja: 'サンピエール島・ミクロン島',
  ko: '생피에르 미클롱n',
  cn: '圣皮埃尔和密克隆',
  'zh-TW': '聖皮埃爾和密克隆'
},
{
  code: 'PN',
  en: 'Pitcairn Islands',
  ru: 'Острова Питкэрн',
  ja: 'ピトケアン諸島',
  ko: '핏케언 제도',
  cn: '皮特凯恩群岛',
  'zh-TW': '皮特凱恩群島'
},
{
  code: 'PR',
  en: 'Puerto Rico',
  ru: 'Пуэрто-Рико',
  ja: 'プエルトリコ',
  ko: '푸에르토 리코',
  cn: '波多黎各',
  'zh-TW': '波多黎各'
},
{
  code: 'PS',
  en: 'Palestinian territories',
  ru: 'Территории Палестины',
  ja: 'パレスチナ',
  ko: '팔레스타인 영토',
  cn: '巴勒斯坦',
  'zh-TW': '巴勒斯坦'
},
{
  code: 'PT',
  en: 'Portugal',
  ru: 'Португалия',
  ja: 'ポルトガル',
  ko: '포르투갈',
  cn: '葡萄牙',
  'zh-TW': '葡萄牙'
},
{
  code: 'PW',
  en: 'Palau',
  ru: 'Палау',
  ja: 'パラオ',
  ko: '팔라우',
  cn: '帕劳',
  'zh-TW': '帕勞'
},
{
  code: 'PY',
  en: 'Paraguay',
  ru: 'Парагвай',
  ja: 'パラグアイ',
  ko: '파라과이',
  cn: '巴拉圭',
  'zh-TW': '巴拉圭'
},
{
  code: 'QA',
  en: 'Qatar',
  ru: 'Катар',
  ja: 'カタール',
  ko: '카타르',
  cn: '卡塔尔',
  'zh-TW': '卡達'
},
{
  code: 'RE',
  en: 'Réunion',
  ru: 'Реюньон',
  ja: 'レユニオン',
  ko: '레위니옹',
  cn: '留尼汪',
  'zh-TW': '留尼汪'
},
{
  code: 'CG',
  en: 'Republic of the Congo',
  ru: 'Республика Конго',
  ja: 'コンゴ（布）',
  ko: '콩고 공화국',
  cn: '刚果（布）',
  'zh-TW': '剛果'
},
{
  code: 'RO',
  en: 'Romania',
  ru: 'Румыния',
  ja: 'ルーマニア',
  ko: '루마니아',
  cn: '罗马尼亚',
  'zh-TW': '羅馬尼亞'
},
{
  code: 'RS',
  en: 'Serbia',
  ru: 'Сербия',
  ja: 'セルビア',
  ko: '세르비아',
  cn: '塞尔维亚',
  'zh-TW': '塞爾維亞'
},
{
  code: 'RU',
  en: 'Russian Federation',
  ru: 'Российская Федерация',
  ja: 'ロシア',
  ko: '러시아 연방',
  cn: '俄罗斯',
  'zh-TW': '俄羅斯'
},
{
  code: 'RW',
  en: 'Rwanda',
  ru: 'Руанда',
  ja: 'ルワンダ',
  ko: '르완다',
  cn: '卢旺达',
  'zh-TW': '盧安達'
},
{
  code: 'MK',
  en: 'Republic of Macedonia (FYROM)',
  ru: 'Республика Македония (БЮРМ)',
  ja: 'マケドニア',
  ko: '마케도니아 공화국 (FYROM)',
  cn: '马其顿',
  'zh-TW': '馬其頓'
},
{
  code: 'SA',
  en: 'Saudi Arabia',
  ru: 'Саудовская Аравия',
  ja: 'サウジアラビア',
  ko: '사우디 아라비아',
  cn: '沙特阿拉伯',
  'zh-TW': '沙烏地阿拉伯'
},
{
  code: 'SB',
  en: 'Solomon Islands',
  ru: 'Соломоновы острова',
  ja: 'ソロモン諸島',
  ko: '솔로몬 제도',
  cn: '所罗门群岛',
  'zh-TW': '索羅門群島'
},
{
  code: 'CH',
  en: 'Switzerland',
  ru: 'Швейцария',
  ja: 'スイス',
  ko: '스위스',
  cn: '瑞士',
  'zh-TW': '瑞士'
},
{
  code: 'SC',
  en: 'Seychelles',
  ru: 'Сейшельские острова',
  ja: 'セーシェル',
  ko: '세이셸',
  cn: '塞舌尔',
  'zh-TW': '塞席爾'
},
{
  code: 'SD',
  en: 'Sudan',
  ru: 'Судан',
  ja: 'スーダン',
  ko: '수단',
  cn: '苏丹',
  'zh-TW': '蘇丹'
},
{
  code: 'SE',
  en: 'Sweden',
  ru: 'Швеция',
  ja: 'スウェーデン',
  ko: '스웨덴',
  cn: '瑞典',
  'zh-TW': '瑞典'
},
{
  code: 'GS',
  en: 'South Georgia and the South Sandwich Islands',
  ru: 'Южная Георгия и Южные Сандвичевы острова',
  ja: 'サウスジョージア・サウスサンドウィッチ諸島',
  ko: '사우스 조지아 및 사우스 샌드위치 제도',
  cn: '南乔治亚岛和南桑威奇群岛',
  'zh-TW': '南喬治亞島和南桑威奇群島'
},
{
  code: 'SH',
  en: 'St. Helena & Dependencies',
  ru: 'Остров Св. Елены и Зависимости',
  ja: 'セントヘレナ',
  ko: '세인트헬레나',
  cn: '圣赫勒拿',
  'zh-TW': '聖赫勒拿'
},
{
  code: 'SI',
  en: 'Slovenia',
  ru: 'Словения',
  ja: 'スロベニア',
  ko: '슬로베니아',
  cn: '斯洛文尼亚',
  'zh-TW': '斯洛維尼亞'
},
{
  code: 'SJ',
  en: 'Svalbard and Jan Mayen',
  ru: 'Свальбард и Ян-Майен',
  ja: 'スヴァールバル諸島およびヤンマイエン島',
  ko: '스발바르 얀마옌 제도',
  cn: '斯瓦尔巴群岛和扬马延岛',
  'zh-TW': '斯瓦爾巴群島和揚馬延島'
},
{
  code: 'SK',
  en: 'Slovakia',
  ru: 'Словакия',
  ja: 'スロバキア',
  ko: '슬로바키아',
  cn: '斯洛伐克',
  'zh-TW': '斯洛伐克'
},
{
  code: 'LC',
  en: 'St. Lucia',
  ru: 'Сент-Люсия',
  ja: 'セントルシア',
  ko: '세인트루시아',
  cn: '圣卢西亚',
  'zh-TW': '聖露西亞'
},
{
  code: 'LK',
  en: 'Sri Lanka',
  ru: 'Шри-Ланка',
  ja: 'スリランカ',
  ko: '스리랑카',
  cn: '斯里兰卡',
  'zh-TW': '斯里蘭卡'
},
{
  code: 'BL',
  en: 'Saint Barthélemy',
  ru: 'Сен-Бартелеми',
  ja: 'サン・バルテルミ',
  ko: '생바르텔레미',
  cn: '圣巴泰勒米岛',
  'zh-TW': '聖巴泰勒米島'
},
{
  code: 'KR',
  en: 'South Korea',
  ru: 'Южная Корея',
  ja: '韓国',
  ko: '대한민국',
  cn: '韩国',
  'zh-TW': '韓國'
},
{
  code: 'SL',
  en: 'Sierra Leone',
  ru: 'Сьерра-Леоне',
  ja: 'シエラレオネ',
  ko: '시에라 리온',
  cn: '塞拉利昂',
  'zh-TW': '獅子山'
},
{
  code: 'SM',
  en: 'San Marino',
  ru: 'Сан-Марино',
  ja: 'サンマリノ',
  ko: '산 마리노',
  cn: '圣马力诺',
  'zh-TW': '聖馬力諾'
},
{
  code: 'SN',
  en: 'Senegal',
  ru: 'Сенегал',
  ja: 'セネガル',
  ko: '세네갈',
  cn: '塞内加尔',
  'zh-TW': '塞內加爾'
},
{
  code: 'SO',
  en: 'Somalia',
  ru: 'Сомали',
  ja: 'ソマリア',
  ko: '소말리아',
  cn: '索马里',
  'zh-TW': '索馬利亞'
},
{
  code: 'SR',
  en: 'Suriname',
  ru: 'Суринам',
  ja: 'スリナム',
  ko: '수리남',
  cn: '苏里南',
  'zh-TW': '蘇利南'
},
{
  code: 'ES',
  en: 'Spain',
  ru: 'Испания',
  ja: 'スペイン',
  ko: '스페인',
  cn: '西班牙',
  'zh-TW': '西班牙'
},
{
  code: 'SS',
  en: 'South Sudan',
  ru: 'Южный Судан',
  ja: '南スーダン',
  ko: '남수단',
  cn: '南苏丹',
  'zh-TW': '南蘇丹'
},
{
  code: 'ST',
  en: 'Sao Tome & Principe',
  ru: 'Сан-Томе и Принсипи',
  ja: 'サントメプリンシペ',
  ko: '상투메 프린시페',
  cn: '圣多美和普林西比',
  'zh-TW': '聖多美及普林西比'
},
{
  code: 'KN',
  en: 'St. Kitts & Nevis',
  ru: 'Сент-Китс и Невис',
  ja: 'セントクリストファー・ネイビス',
  ko: '세인트키츠 네비스',
  cn: '圣基茨和尼维斯',
  'zh-TW': '聖克里斯多福及尼維斯'
},
{
  code: 'VC',
  en: 'St. Vincent & the Grenadines',
  ru: 'Сент-Винсент и Гренадины',
  ja: 'セントビンセント・グレナディーン',
  ko: '세인트빈센트 그레나딘',
  cn: '圣文森特和格林纳丁斯',
  'zh-TW': '聖文森及格瑞那丁'
},
{
  code: 'MF',
  en: 'Saint Martin (France)',
  ru: 'Сен-Мартен (Франция)',
  ja: 'サン・マルタン島',
  ko: '생마르탱 (프랑스)',
  cn: '法属圣马丁',
  'zh-TW': '法屬聖馬丁'
},
{
  code: 'SX',
  en: 'Sint Maarten',
  ru: 'Синт-Маартен',
  ja: 'シント・マールテン島',
  ko: '신트 마틴',
  cn: '荷属圣马丁',
  'zh-TW': '荷屬聖馬丁'
},
{
  code: 'SY',
  en: 'Syria',
  ru: 'Сирия',
  ja: 'シリア',
  ko: '시리아',
  cn: '叙利亚',
  'zh-TW': '敘利亞'
},
{
  code: 'WS',
  en: 'Samoa',
  ru: 'Самоа',
  ja: 'サモア',
  ko: '사모아',
  cn: '萨摩亚',
  'zh-TW': '西薩摩亞'
},
{
  code: 'SZ',
  en: 'Swaziland',
  ru: 'Свазиленд',
  ja: 'スワジランド',
  ko: '스와질란드',
  cn: '斯威士兰',
  'zh-TW': '史瓦濟蘭'
},
{
  code: 'ZA',
  en: 'South Africa',
  ru: 'Южная Африка',
  ja: '南アフリカ',
  ko: '남아프리카 공화국',
  cn: '南非',
  'zh-TW': '南非'
},
{
  code: 'TC',
  en: 'Turks & Caicos Islands',
  ru: 'Острова Теркс и Кайкос',
  ja: 'タークス・カイコス諸島',
  ko: '터크스 케이커스 제도',
  cn: '特克斯和凯科斯群岛',
  'zh-TW': '特克斯和凱科斯群島'
},
{
  code: 'TG',
  en: 'Togo',
  ru: 'Того',
  ja: 'トーゴ',
  ko: '토고',
  cn: '多哥',
  'zh-TW': '多哥'
},
{
  code: 'PH',
  en: 'The Philippines',
  ru: 'Филиппины',
  ja: 'フィリピン',
  ko: '필리핀',
  cn: '菲律宾',
  'zh-TW': '菲律賓'
},
{
  code: 'TH',
  en: 'Thailand',
  ru: 'Тайланд',
  ja: 'タイ',
  ko: '태국',
  cn: '泰国',
  'zh-TW': '泰國'
},
{
  code: 'TJ',
  en: 'Tajikistan',
  ru: 'Таджикистан',
  ja: 'タジキスタン',
  ko: '타지키스탄',
  cn: '塔吉克斯坦',
  'zh-TW': '塔吉克斯坦'
},
{
  code: 'TK',
  en: 'Tokelau',
  ru: 'Токелау',
  ja: 'トケラウ',
  ko: '토켈라우',
  cn: '托克劳',
  'zh-TW': '托克勞'
},
{
  code: 'TL',
  en: 'Timor-Leste (East Timor)',
  ru: 'Тимор-Лешти (Восточный Тимор)',
  ja: '東ティモール',
  ko: '동티모르',
  cn: '东帝汶',
  'zh-TW': '東帝汶'
},
{
  code: 'TM',
  en: 'Turkmenistan',
  ru: 'Туркменистан',
  ja: 'トルクメニスタン',
  ko: '투르크메니스탄',
  cn: '土库曼斯坦',
  'zh-TW': '土庫曼'
},
{
  code: 'TN',
  en: 'Tunisia',
  ru: 'Тунис',
  ja: 'チュニジア',
  ko: '튀니지',
  cn: '突尼斯',
  'zh-TW': '突尼西亞'
},
{
  code: 'TO',
  en: 'Tonga',
  ru: 'Тонга',
  ja: 'トンガ',
  ko: '통가',
  cn: '汤加',
  'zh-TW': '東加王國'
},
{
  code: 'TR',
  en: 'Turkey',
  ru: 'Турция',
  ja: 'トルコ',
  ko: '터키',
  cn: '土耳其',
  'zh-TW': '土耳其'
},
{
  code: 'TT',
  en: 'Trinidad & Tobago',
  ru: 'Тринидад и Тобаго',
  ja: 'トリニダード・トバゴ',
  ko: '트리니다드 & 토바고',
  cn: '特立尼达和多巴哥',
  'zh-TW': '千里達及托貝哥'
},
{
  code: 'TV',
  en: 'Tuvalu',
  ru: 'Тувалу',
  ja: 'ツバル',
  ko: '투발루',
  cn: '图瓦卢',
  'zh-TW': '吐瓦魯'
},
{
  code: 'TZ',
  en: 'Tanzania',
  ru: 'Танзания',
  ja: 'タンザニア',
  ko: '탄자니아',
  cn: '坦桑尼亚',
  'zh-TW': '坦尚尼亞'
},
{
  code: 'KM',
  en: 'The Comoros',
  ru: 'Коморские острова',
  ja: 'コモロ',
  ko: '코모로',
  cn: '科摩罗',
  'zh-TW': '科摩羅'
},
{
  code: 'UA',
  en: 'Ukraine',
  ru: 'Украина',
  ja: 'ウクライナ',
  ko: '우크라이나',
  cn: '乌克兰',
  'zh-TW': '烏克蘭'
},
{
  code: 'UG',
  en: 'Uganda',
  ru: 'Уганда',
  ja: 'ウガンダ',
  ko: '우간다',
  cn: '乌干达',
  'zh-TW': '烏干達'
},
{
  code: 'UM',
  en: 'United States Minor Outlying Islands',
  ru: 'Малые отдаленные острова Соединенных Штатов',
  ja: '合衆国領有小離島',
  ko: '미국령 군소 제도',
  cn: '美国本土外小岛屿',
  'zh-TW': '美國本土外小島嶼'
},
{
  code: 'UY',
  en: 'Uruguay',
  ru: 'Уругвай',
  ja: 'ウルグアイ',
  ko: '우루과이',
  cn: '乌拉圭',
  'zh-TW': '烏拉圭'
},
{
  code: 'UZ',
  en: 'Uzbekistan',
  ru: 'Узбекистан',
  ja: 'ウズベキスタン',
  ko: '우즈베키스탄',
  cn: '乌兹别克斯坦',
  'zh-TW': '烏茲別克斯坦'
},
{
  code: 'AE',
  en: 'United Arab Emirates',
  ru: 'Объединенные Арабские Эмираты',
  ja: 'エミレーツ',
  ko: '아랍 에미리트',
  cn: '阿联酋',
  'zh-TW': '阿拉伯聯合大公國'
},
{
  code: 'VA',
  en: 'Vatican City (The Holy See)',
  ru: 'Ватикан (Святой Престол)',
  ja: 'バチカン',
  ko: '바티칸 시국',
  cn: '梵蒂冈',
  'zh-TW': '克羅埃西亞'
},
{
  code: 'VE',
  en: 'Venezuela',
  ru: 'Венесуэла',
  ja: 'ベネズエラ',
  ko: '베네수엘라',
  cn: '委内瑞拉',
  'zh-TW': '委內瑞拉'
},
{
  code: 'VI',
  en: 'United States Virgin Islands',
  ru: 'Виргинские острова Соединенных Штатов',
  ja: 'アメリカ領バージン諸島',
  ko: '미국령 버진 아일랜드',
  cn: '美属维尔京群岛',
  'zh-TW': '美屬維爾京群島'
},
{
  code: 'VN',
  en: 'Vietnam',
  ru: 'Вьетнам',
  ja: 'ベトナム',
  ko: '베트남',
  cn: '越南',
  'zh-TW': '越南'
},
{
  code: 'VU',
  en: 'Vanuatu',
  ru: 'Вануату',
  ja: 'バヌアツ',
  ko: '바누아투',
  cn: '瓦努阿图',
  'zh-TW': '瓦努阿圖'
},
{
  code: 'WF',
  en: 'Wallis and Futuna',
  ru: 'Уоллис и Футуна',
  ja: 'ウォリス・フツナ',
  ko: '왈리스 퓌튀나',
  cn: '瓦利斯和富图纳',
  'zh-TW': '克羅埃西亞'
},
{
  code: 'EH',
  en: 'Western Sahara',
  ru: 'Западная Сахара',
  ja: '西サハラ',
  ko: '서사하라',
  cn: '西撒哈拉',
  'zh-TW': '西撒哈拉'
},
{
  code: 'YE',
  en: 'Yemen',
  ru: 'Йемен',
  ja: 'イエメン',
  ko: '예멘',
  cn: '也门',
  'zh-TW': '葉門'
},
{
  code: 'ZM',
  en: 'Zambia',
  ru: 'Замбия',
  ja: 'ザンビア',
  ko: '잠비아',
  cn: '赞比亚',
  'zh-TW': '尚比亞'
},
{
  code: 'ZW',
  en: 'Zimbabwe',
  ru: 'Зимбабве',
  ja: 'ジンバブエ',
  ko: '짐바브웨',
  cn: '津巴布韦',
  'zh-TW': '辛巴威'
},
{
  code: 'SG',
  en: 'Singapore',
  ru: 'Сингапур',
  ja: 'シンガポール',
  ko: '싱가포르',
  cn: '新加坡',
  'zh-TW': '新加坡'
}
]

export default globalCountries
