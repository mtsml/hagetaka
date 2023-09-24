# hagetaka
WebSocketを用いた「ハゲタカのえじき」の実装。

### 起動方法
開発

```sh
# FE
npm run client
# BE
npm start
```

本番

```sh
npm run build
npm start
```

### ルール
- 全15回実施するラウンド制のゲームであり、最終ラウンド終了時に最も獲得ポイントが高いプレイヤーが勝者となる
- 各ラウンドではそのラウンドで獲得できるポイントが表示される
  - 表示されるポイントは、0を除く-5から+10の計15個種類である
  - 同じポイントが表示されることはない
- 各プレイヤーは1から15の数字を手札として持ち、ラウンド毎に数字を1つ選択する
  - 数字はそれぞれ一度ずつしか選択できない
- すべてのプレイヤーが数字を選び終わると、以下のルールでポイントを獲得するプレイヤーを決めて、そのラウンドを終了する
  - 同じ数字を出したプレイヤーはバッティング状態となり、ポイントを獲得することはできない
  - すべてのプレイヤーがバッティングした場合は、キャリーオーバーとして次のターンにポイントを持ち越す
  - ポイントが+1から+10のとき：バッティングしていないプレイヤーの中で最も大きい数字を選択したプレイヤーがポイントを獲得する
  - ポイントが-5から-1のとき：バッティングしていないプレイヤーの中で最も小さい数字を選択したプレイヤーがポイントを獲得する
 
### Screenshots
|ログイン|待機|
|--|--|
|<img src="https://github.com/mtsml/hagetaka/blob/images/login.png" width="300px">|<img src="https://github.com/mtsml/hagetaka/blob/images/wait.png" width="300px">|

|プラスポイント|バッティング|
|--|--|
|<img src="https://github.com/mtsml/hagetaka/blob/images/play_pluspoint.png" width="300px">|<img src="https://github.com/mtsml/hagetaka/blob/images/play_conflict.png" width="300px">|

|マイナスポイント|キャリーオーバー|
|--|--|
|<img src="https://github.com/mtsml/hagetaka/blob/images/play_minuspoint.png" width="300px">|<img src="https://github.com/mtsml/hagetaka/blob/images/play_carryover.png" width="300px">|

|2位|4位|
|--|--|
|<img src="https://github.com/mtsml/hagetaka/blob/images/result_2nd.png" width="300px">|<img src="https://github.com/mtsml/hagetaka/blob/images/result_4th.png" width="300px">|
