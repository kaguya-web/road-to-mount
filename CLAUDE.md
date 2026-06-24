# Course to Mount / mountへの航路

mount inc. への応募準備として作る、メタくらげ（かーくん）が mount に辿り着くまでの物語を語るサイト。シングルページ縦スクロール、Prologue + Chapter 1〜3 + Outro の構成。

## プロジェクト概要

- **目的**: mount応募の核（採用基準4軸: (1)共感 (2)思考プロセス (3)素直さ (4)熱量）に当てる「思考プロセスの実物」
- **インスパイア**: Days of HIRAYAMA形式（短い情景＋余白）+ Perfect Daysのcastページ形式（画像+文章の縦スライド）
- **形式**: シングルページ縦スクロール、scroll-snap で「ピタッ」と止まる cast型UX
- **音声**: 各シーンに朗読音声をつける（noteとの差別化）

## 構成（5/29時点）

| 章 | タイトル | テーマ |
|---|---|---|
| Prologue | 漂流 | 24歳〜創作の渇き・繰り返しの日常 |
| Chapter 1 | 瓶の手紙 | パーフェクトデイズ→Days of HIRAYAMA→Webは作品になる気づき |
| Chapter 2 | 航海 | デイトラ卒業課題、文字化け、AI協働、完成、「普通」の難しさ |
| Chapter 3 | 差出人 | 制作会社探し→mount発見→驚き+納得→イム代表の言葉と根っこが重なる |
| Outro | 返事 | このサイトは私なりの応答、贈与の動機 |

## 現在の進捗（2026-05-31 11:50 時点）

### 完了
- リポ作成、PRECSSスケルトン実装（5/29）
- Prologue初稿（1156字）執筆 → 仮想チーム4部門評価（5/30、my-vault側）
- Prologueをサイトに流し込み（4シーン構成）
  - シーン1: 部屋・スタンドライト・キーボード（段落1-2）
  - シーン2: 家電量販店・ケータイ販売（段落3-6）
  - シーン3: キッチン（段落7-10）
  - シーン4: それでも・作品の希求（段落11-13）
- PC: 横並び（左画像/右テキスト）、モバイル: 縦並び
- 画像プレースホルダー（白色面、aspect-ratio 4/3）
- scroll-snap-type: y mandatory でシーンごとにピタッと止まる挙動

### 保留中
- 各シーンのテキスト量調整（5/31議論で「とりあえず今のままで」採択、サイト完成優先）
- 画像・音声の素材方針（AI生成 / ストック / イラスト / 抽象ビジュアル × 本人朗読 / AI音声 / 環境音）
- Markdown化（編集体験改善、明日以降タスクとして繰り越し。詳細: [[01_data/2026/05/31/road-to-mount_コンテンツ編集方式_HTML継続でMarkdown化保留]]）

### 次のtask候補（優先度順）
1. **scroll-snap挙動の触り確認**（mandatory が硬すぎないか、シーン内テキスト100vh超えてる場合の読み体験）
2. **Chapter 1〜3 + Outro の構造実装**（Prologueと同じシーン形式で骨格作る、本文はプレースホルダー）
3. **章間ナビゲーション**（章タイトル時の余白演出、目次/ナビゲーション）
4. **画像・音声の素材方針決定**（実物を1つ作って試す）
5. **Markdown化検討**（編集体験改善）

## 開発コマンド

```bash
npm run dev      # Vite dev server起動（http://localhost:5173/ or 5174/）
npm run build    # 本番ビルド
npm run preview  # ビルド結果のプレビュー
```

## ディレクトリ構造

```
road-to-mount/
├── index.html
├── package.json
├── vite.config.js
├── public/
└── src/
    ├── main.js
    └── scss/
        ├── style.scss
        ├── foundation/  # variables, mixin, reset, base
        ├── layout/      # _l-main
        └── object/
            ├── project/  # _p-intro, _p-prologue, _p-chapter, _p-outro
            ├── component/
            └── utility/
```

PRECSS命名規約（`p-` prefix = Project、`l-` prefix = Layout、`c-` = Component、`u-` = Utility）。

## 関連ノート（my-vault側）

- `[[Prologue初稿_漂流]]` - サイト本文の現状（1156字）
- `[[Prologue初稿_仮想チーム評価]]` - 千歌・玲・修・凛の評価原文
- `[[【Rule】点は結果的に繋がる、繋げるために打たない]]` - 執筆スタンスの根拠Rule
- `[[2026-05-30セッション総括]]` - 前日のセッション総括
- `[[project_mount_strategy]]` - mount応募戦略の親プロジェクト

## 注意

- mount応募実物としての強度を意識する（Vite+SCSS+フルスクラッチ実装を活かす設計）
- 凛指摘5「1稿目に型完成を要求するな」：段階的に進める、いきなり完成形を求めない
- 「サイトとして立ち上げる必然性」を実装で示す（noteで済まないものを作る）
- 詳細な議論履歴・判断根拠は my-vault 側のノート参照
