# 我的餐廳清單
使用Node.js + Exoress 打造的美食網站，可快速且直覺搜尋與觀看餐廳內容

## 專案畫面
index:
![image](https://raw.githubusercontent.com/deamo771003/Reastaurant-list/main/index.jpg)
show:
![image](https://raw.githubusercontent.com/deamo771003/Reastaurant-list/main/show.jpg)

## Features 功能
1. 首頁列出所有合作餐廳與資訊
2. 點擊進入餐廳細項介紹
3. 餐廳位置可點擊小圖示連結至google map

## Environment SetUp 環境建置
1. Node.js
2. Express
3. Express-handlebars

## Installing 安裝流程
打開你的 terminal，Clone 此專案至本機電腦
git clone https://github.com/pierceshih15/restaurantList.git
開啟終端機(Terminal)，進入存放此專案的資料夾
cd restaurantList
安裝 npm 套件
在 Terminal 輸入 npm install 指令
安裝 nodemon 套件
在 Terminal 輸入 nodemon app.js 指令
匯入種子檔案
在 Terminal 找到 Seeder.js 檔案

執行 node models/seeds/Seeder.js 匯入使用者與餐廳資料
當 terminal 出現以下字樣，即表示種子資料已新增至資料庫，按下 ctrl + c 結束執行

Mongodb is connected!

User and Restaurant data get done!
啟動伺服器，執行 app.js 檔案
nodemon app.js
當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結
The Express server is running on http://localhost:3000

Mongodb is connected!
現在，你可開啟任一瀏覽器瀏覽器輸入 http://localhost:3000 開始使用皮皮美食網囉！歡迎使用官方測試帳號操作。

Contributor 專案開發人員
[JimmyLin]<'https://github.com/deamo771003'>
