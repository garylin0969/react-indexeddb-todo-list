// IndexedDB 相關型別定義
export interface TodoItem {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// 資料庫設定
const DB_NAME = 'TodoListDB';
const DB_VERSION = 1;
const STORE_NAME = 'todos';

// 資料庫連接和初始化
export class TodoDatabase {
    private db: IDBDatabase | null = null;

    // 初始化資料庫
    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                reject(new Error('無法開啟 IndexedDB'));
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // 建立物件儲存空間 (Object Store)
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    // 建立索引以便查詢
                    store.createIndex('completed', 'completed', { unique: false });
                    store.createIndex('createdAt', 'createdAt', { unique: false });
                }
            };
        });
    }

    // 取得所有待辦事項
    async getAllTodos(): Promise<TodoItem[]> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('資料庫未初始化'));
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                const todos = request.result as TodoItem[];
                // 將字串日期轉換回 Date 物件
                const convertedTodos = todos.map((todo) => ({
                    ...todo,
                    createdAt: new Date(todo.createdAt),
                    updatedAt: new Date(todo.updatedAt),
                }));
                resolve(convertedTodos);
            };

            request.onerror = () => {
                reject(new Error('無法取得待辦事項'));
            };
        });
    }

    // 新增待辦事項
    async addTodo(title: string): Promise<TodoItem> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('資料庫未初始化'));
                return;
            }

            const todo: TodoItem = {
                id: crypto.randomUUID(),
                title,
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(todo);

            request.onsuccess = () => {
                resolve(todo);
            };

            request.onerror = () => {
                reject(new Error('無法新增待辦事項'));
            };
        });
    }

    // 更新待辦事項
    async updateTodo(id: string, updates: Partial<TodoItem>): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('資料庫未初始化'));
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            // 先取得現有的待辦事項
            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const existingTodo = getRequest.result as TodoItem;
                if (!existingTodo) {
                    reject(new Error('待辦事項不存在'));
                    return;
                }

                // 更新待辦事項
                const updatedTodo: TodoItem = {
                    ...existingTodo,
                    ...updates,
                    updatedAt: new Date(),
                };

                const putRequest = store.put(updatedTodo);

                putRequest.onsuccess = () => {
                    resolve();
                };

                putRequest.onerror = () => {
                    reject(new Error('無法更新待辦事項'));
                };
            };

            getRequest.onerror = () => {
                reject(new Error('無法取得待辦事項'));
            };
        });
    }

    // 刪除待辦事項
    async deleteTodo(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('資料庫未初始化'));
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(new Error('無法刪除待辦事項'));
            };
        });
    }

    // 切換待辦事項完成狀態
    async toggleTodo(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('資料庫未初始化'));
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const todo = getRequest.result as TodoItem;
                if (!todo) {
                    reject(new Error('待辦事項不存在'));
                    return;
                }

                const updatedTodo: TodoItem = {
                    ...todo,
                    completed: !todo.completed,
                    updatedAt: new Date(),
                };

                const putRequest = store.put(updatedTodo);

                putRequest.onsuccess = () => {
                    resolve();
                };

                putRequest.onerror = () => {
                    reject(new Error('無法更新待辦事項'));
                };
            };

            getRequest.onerror = () => {
                reject(new Error('無法取得待辦事項'));
            };
        });
    }

    // 清空所有待辦事項
    async clearAllTodos(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('資料庫未初始化'));
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.clear();

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(new Error('無法清空待辦事項'));
            };
        });
    }
}

// 建立全域資料庫實例
export const todoDB = new TodoDatabase();
