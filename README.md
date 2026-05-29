# Road to Mount

メタくらげが [mount inc.](https://mount.jp/) に辿り着くまでの物語を語るサイト。

> 面倒くさくて仕方ないことをどうせやるなら、納得できるものをつくっていこう。
> — イム・ジョンホ（mount inc. 代表）

## このサイトは何か

mount inc. の作品 [Days of HIRAYAMA](https://www.perfectdays-movie.jp/) （映画『パーフェクトデイズ』公式サイト内のコンテンツ）に出会った日、Webサイトが「ツール」ではなく「作品」になりうると気づいた。そこから web 制作の学習を始め、いま mount inc. への応募準備をしている。

その軌跡を、Days of HIRAYAMA の形式へのオマージュとして1本のサイトに編んだもの。応募の核として作っているが、主役は自分ではなく **「出会った作品の力」** に置いている。

## 設計の大枠

- **構成**: シングルページ、縦スクロール、3章セクション（出会い / 学習 / 確信）
- **タイポ**: 明朝体ベース、サイズ大きめ、行間広め（「読ませる」タイポ）
- **章切り替わり**: 視覚的に明確（背景色・余白・タイポ）、IntersectionObserver で軽い演出
- **オープニング/エンディング**: フルビューポート

## 使用技術

- HTML / CSS（BEM / PRECSS）
- Sass
- JavaScript（IntersectionObserver、CSS animations/transitions）
- （オプション）背景video、BGM

## リファレンス

- [Days of HIRAYAMA](https://www.perfectdays-movie.jp/)（構造の本丸リファレンス、mount inc. 制作）
- [PERFECT DAYS - cast](https://www.perfectdays-movie.jp/cast/)（縦スクロール+セクション区切りのリファレンス）
- [mount inc.](https://mount.jp/)
- [iamjeongho note](https://note.com/iamjeongho)
- [mount_inc note](https://note.com/mount_inc)

## AI との協働について

このサイトの制作にあたっては、Anthropic 社の [Claude](https://claude.com)（Claude Code）をパートナーとして活用している。

- **AI が担う領域**: 実装の壁打ち、コード提案、テキストの構造化補助、設計判断の選択肢出し
- **自分が担う領域**: 何を作るかの判断、章構成と本文の決定、最終的な「これでよし」の判定、mountへの共感の言語化

イム・ジョンホ氏が[インタビュー](https://designing.jp/mount-im) で語る「AIを選択肢生成ツールと位置付け、判断する側に回る」というスタンスに学びながら、自分の判断と思考プロセスを残すかたちで制作している。

## ステータス

- 2026-05-29 着手
- 2026-06-30 メイン完成目標
- 2026-07-31 磨き込み完了（応募提出可能状態）

## 開発記録

各セクションの設計判断・捨てた選択肢・試行錯誤の記録は、commit メッセージと [docs/](./docs/) ディレクトリ（予定）に残していく。

## ライセンス

このリポジトリのコードは、本人の応募・学習用途で書かれている。自由に参考にしてもらって構わないが、 mount inc. の作品や引用テキストの著作権は各権利者に帰属する。
