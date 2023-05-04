# 我的餐廳清單
使用Node.js + Exoress 打造的美食網站
快速且直覺搜尋與觀看餐廳內容

## 專案畫面
Register:
![image](https://raw.githubusercontent.com/deamo771003/Reastaurant-list/main/register.jpg)
Login:
![image](https://raw.githubusercontent.com/deamo771003/Reastaurant-list/main/login.jpg)
Index:
![image](https://raw.githubusercontent.com/deamo771003/Reastaurant-list/main/index3.jpg)
Show:
![image](https://raw.githubusercontent.com/deamo771003/Reastaurant-list/main/show.jpg)

## Features 功能
1. 創帳號登入或使用Facebook登入功能
2. 點擊進入餐廳細項介紹
3. 餐廳位置可點擊小圖示連結至google map
4. 餐廳搜尋功能
5. 新增 / 刪除 / 編輯餐廳資訊
6. 首頁排序功能

## Environment SetUp 環境建置
1. Node.js
2. CSS
3. Handlebars

## Installing 安裝流程
1. Clone 此專案至本機電腦，打開你的 terminal  
```
git clone https://github.com/deamo771003/Reastaurant-list.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾  
```
cd restaurant-list
```

3. 安裝 npm 套件
```
npm init -y
```

4. 安裝 nodemon 套件
```
npm install -g nodemon
```

5. 安裝 express 套件
```
npm i express
```

6. 安裝 express-handlebars 套件
```
npm i express-handlebars@3.0.2
```

7. 安裝 handlebars 套件
```
npm i express handlebars
```

8. 安裝 express-session 套件
```
npm i express-session
```

9. 安裝 bcryptjs 套件
```
npm i bcryptjs
```

10. 安裝 body-parser 套件
```
npm i body-parser
```

11. 安裝 connect-flash 套件
```
npm i connect-flash
```

12. 安裝 method-override 套件
```
npm i method-override
```

13. 安裝 passport 套件
```
npm i passport
```

14. 安裝 passport-facebook 套件
```
npm i passport-facebook
```

15. 安裝 passport-local 套件
```
npm i passport-local
```

16. 安裝 dotenv 套件
```
npm i dotenv -d
```

17. 安裝 mongoose 套件
```
npm i express mongoose
```

18. 新增.env檔並加入以下內容
```
MONGODB_URI=<MONGODB資料庫路徑>
PORT=3000
SESSION_SECRET=自定義
FACEBOOK_ID=Meta for developers 取得
FACEBOOK_SECRET=Meta for developers 取得
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

19. 載入預設範例資料
```
npm run seed
```

20. 啟動伺服器，執行 app.js 檔案  
```
npm run dev
```

21. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結  
```
Express is listening on localhost:3000
```

22. 現在，你可開啟任一瀏覽器瀏覽器輸入以下網址開始使用我的餐廳清單囉！  
```
http://localhost:3000
```

## Contributor 開發人員
[JimmyLin](https://github.com/deamo771003)
