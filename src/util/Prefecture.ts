const SelectPrefecture_TAB = [
    "北海道", "東北", "関東", "中部", "近畿", "四国", "中国", "九州沖縄"
];

const HOKKAIDO = [
    "北海道"
];

const TOHOKU = [
    "青森", "岩手", "秋田", "宮城", "山形", "福島"
];

const KANTO = [
    "栃木", "茨城", "群馬", "埼玉", "千葉", "東京", "神奈川"
];

const TYUBU = [
    "新潟", "山梨", "静岡", "長野", "岐阜", "愛知", "富山", "石川", "福井"
];

const KINKI = [
    "三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山"
];

const SHIKOKU = [
    "香川", "徳島", "高知", "愛媛"
];

const TYUGOKU = [
    "鳥取", "島根", "岡山", "広島", "山口"
];

const KYUSHU_OKINAWA = [
    "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"
];

const ZENKOKU = HOKKAIDO.concat(TOHOKU, KANTO, TYUBU, KINKI, SHIKOKU, TYUGOKU, KYUSHU_OKINAWA);

export {
    SelectPrefecture_TAB,
    HOKKAIDO,
    TOHOKU,
    KANTO,
    TYUBU,
    KINKI,
    SHIKOKU,
    TYUGOKU,
    KYUSHU_OKINAWA,
    ZENKOKU
}


