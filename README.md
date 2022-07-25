# GAS-donate
GASでやってる
寄付されたときに使えるようにする
## 使い方
#### 寄付されたい側
寄付方法を用意しておいて、

寄付されたら専用ページ(Web appsのデプロイされたURL)にログイン

するとコードが表示されるのでそれをコピーして教える
#### アプリ側
トークンと一緒にそのコードをPOSTすると利用可否がわかる

**URL**

`/`(Web appsのデプロイされたURL)

**内容**

`APP_TOKEN=atode settei`

`code=watasareta mono`

## 設定方法
1. Google Drive内の好きな場所にAPP_TOKEN.txtを作る
2. 同じく... GEN_PASS.txtを作る
3. 上記2つに安全な文字列を書き込む
4. 空ののCODES.txtを作る
5. Web appsでデプロイ

できなかったことがあったらおたとげまで
