# React IndexedDB 待辦事項清單

這是一個使用 React、TypeScript、Tailwind CSS、shadcn/ui 和 IndexedDB 建立的待辦事項清單應用程式。

## 功能特色

- ✅ **本地儲存**: 使用 IndexedDB 在瀏覽器中本地儲存待辦事項
- ✅ **完整的 CRUD 操作**: 新增、讀取、更新、刪除待辦事項
- ✅ **即時編輯**: 點擊編輯按鈕即可就地編輯待辦事項標題
- ✅ **完成狀態切換**: 點擊核取方塊切換完成狀態
- ✅ **統計資訊**: 顯示總計、已完成和待完成的項目數量
- ✅ **響應式設計**: 使用 Tailwind CSS 建立的現代化 UI
- ✅ **錯誤處理**: 完整的錯誤處理和使用者回饋
- ✅ **載入狀態**: 顯示載入動畫和狀態

## 技術棧

- **React 19**: 使用最新的 React 版本
- **TypeScript**: 完整的型別安全
- **Tailwind CSS**: 實用優先的 CSS 框架
- **shadcn/ui**: 高品質的 React 元件庫
- **IndexedDB**: 瀏覽器本地資料庫
- **Vite**: 快速的建置工具

## 安裝和執行

1. 安裝依賴：

```bash
pnpm install
```

2. 啟動開發伺服器：

```bash
pnpm dev
```

3. 開啟瀏覽器訪問 `http://localhost:5173`

## IndexedDB 學習重點

這個專案專門設計來學習 IndexedDB 的操作，包含以下重要概念：

### 資料庫結構

- **資料庫名稱**: `TodoListDB`
- **版本**: `1`
- **物件儲存空間**: `todos`
- **索引**: `completed`, `createdAt`

### 主要操作

1. **初始化資料庫**: 建立資料庫和物件儲存空間
2. **新增資料**: 使用 `add()` 方法新增待辦事項
3. **查詢資料**: 使用 `getAll()` 取得所有待辦事項
4. **更新資料**: 使用 `put()` 方法更新待辦事項
5. **刪除資料**: 使用 `delete()` 方法刪除待辦事項

### 非同步處理

- 所有 IndexedDB 操作都是非同步的
- 使用 Promise 包裝 IndexedDB 的回調函數
- 完整的錯誤處理機制

### 交易管理

- 使用 `transaction()` 建立資料庫交易
- 正確設定交易模式 (`readonly` 或 `readwrite`)
- 確保資料一致性和完整性

## 專案結構

```
src/
├── components/          # React 元件
│   ├── ui/            # shadcn/ui 元件
│   ├── AddTodoForm.tsx # 新增待辦事項表單
│   ├── TodoItem.tsx   # 待辦事項項目元件
│   ├── TodoList.tsx   # 待辦事項清單元件
│   └── TodoStats.tsx  # 統計資訊元件
├── hooks/             # 自定義 React Hooks
│   └── useTodos.ts    # 待辦事項狀態管理
├── lib/               # 工具函數和資料庫
│   ├── indexeddb.ts   # IndexedDB 操作類別
│   └── utils.ts       # 通用工具函數
└── App.tsx           # 主要應用程式元件
```

## 學習 IndexedDB 的關鍵點

1. **資料庫生命週期**: 開啟、升級、關閉
2. **物件儲存空間**: 建立、索引設定
3. **交易處理**: 讀取和寫入交易
4. **錯誤處理**: 完整的錯誤捕獲和處理
5. **資料序列化**: 處理 Date 物件等複雜資料型別

這個專案提供了完整的 IndexedDB 實作範例，適合用來學習瀏覽器本地資料庫的操作。
