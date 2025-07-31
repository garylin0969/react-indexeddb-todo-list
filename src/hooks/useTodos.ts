import { useState, useEffect, useCallback } from 'react';
import {
    type TodoItem,
    initDatabase,
    getAllTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearAllTodos,
} from '@/lib/indexeddb';

// 自定義 Hook 用於管理待辦事項
export function useTodos() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 載入所有待辦事項
    const loadTodos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            await initDatabase();
            const allTodos = await getAllTodos();
            setTodos(allTodos);
        } catch (err) {
            setError(err instanceof Error ? err.message : '載入待辦事項時發生錯誤');
        } finally {
            setLoading(false);
        }
    }, []);

    // 新增待辦事項
    const handleAddTodo = useCallback(async (title: string) => {
        try {
            setError(null);
            const newTodo = await addTodo(title);
            setTodos((prev) => [...prev, newTodo]);
        } catch (err) {
            setError(err instanceof Error ? err.message : '新增待辦事項時發生錯誤');
        }
    }, []);

    // 切換待辦事項完成狀態
    const handleToggleTodo = useCallback(async (id: string) => {
        try {
            setError(null);
            await toggleTodo(id);
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo
                )
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : '更新待辦事項時發生錯誤');
        }
    }, []);

    // 刪除待辦事項
    const handleDeleteTodo = useCallback(async (id: string) => {
        try {
            setError(null);
            await deleteTodo(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : '刪除待辦事項時發生錯誤');
        }
    }, []);

    // 更新待辦事項標題
    const handleUpdateTodoTitle = useCallback(async (id: string, newTitle: string) => {
        try {
            setError(null);
            await updateTodo(id, { title: newTitle });
            setTodos((prev) =>
                prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle, updatedAt: new Date() } : todo))
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : '更新待辦事項時發生錯誤');
        }
    }, []);

    // 清空所有待辦事項
    const handleClearAllTodos = useCallback(async () => {
        try {
            setError(null);
            await clearAllTodos();
            setTodos([]);
        } catch (err) {
            setError(err instanceof Error ? err.message : '清空待辦事項時發生錯誤');
        }
    }, []);

    // 取得統計資訊
    const stats = {
        total: todos.length,
        completed: todos.filter((todo) => todo.completed).length,
        pending: todos.filter((todo) => !todo.completed).length,
    };

    // 初始化時載入待辦事項
    useEffect(() => {
        loadTodos();
    }, [loadTodos]);

    return {
        todos,
        loading,
        error,
        addTodo: handleAddTodo,
        toggleTodo: handleToggleTodo,
        deleteTodo: handleDeleteTodo,
        updateTodoTitle: handleUpdateTodoTitle,
        clearAllTodos: handleClearAllTodos,
        stats,
    };
}
