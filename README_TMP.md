1, タイトルと概要、URL
2, 使用技術
3, AWS(インフラ)構成図
4, 機能、非機能一覧

タイトル
未定


概要
観光地検索サービス.

興味のある都道府県の観光地をランダムに表示します。
興味のある観光地が表示されればお気に入りボタンを押して、
記憶に留めておきましょう。(ログインが必要)



使用技術
-フロントエンド-
・react 18.2.0
・react-router-dom 6.3.0
・typescript 4.7.4
・styled-components 5.1.25
・jest 28.1.3
・Material UI 5.8.7
・storybook 6.5.9
・axios 1.1.3(実際の機能には実装されていない)
・sessionStorage



-インフラ-
・firebase 9.8.4
firestore
Authentication

-その他-
Git
figma




機能一覧
・検索機能
・お気に入り機能
・ログイン機能

テスト
・Jest(単体テスト)
・StoryBook