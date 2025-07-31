import { Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { type TodoItem as TodoItemType } from '@/lib/indexeddb';
import { TodoItem } from './TodoItem';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TodoListProps {
    todos: TodoItemType[];
    loading: boolean;
    error: string | null;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdateTitle: (id: string, newTitle: string) => void;
    onClearAll: () => void;
}

export function TodoList({ todos, loading, error, onToggle, onDelete, onUpdateTitle, onClearAll }: TodoListProps) {
    // 載入狀態
    if (loading) {
        return (
            <Card>
                <CardContent className="p-8">
                    <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        <span>載入中...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // 錯誤狀態
    if (error) {
        return (
            <Card>
                <CardContent className="p-8">
                    <div className="flex items-center justify-center text-red-600">
                        <AlertCircle className="mr-2 h-6 w-6" />
                        <span>{error}</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // 空狀態
    if (todos.length === 0) {
        return (
            <Card>
                <CardContent className="p-8">
                    <div className="text-center">
                        <p className="mb-2 text-lg font-medium">沒有待辦事項</p>
                        <p className="opacity-60">開始新增您的第一個待辦事項吧！</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>待辦事項清單</CardTitle>
                <Button variant="destructive" size="sm" onClick={onClearAll} className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    清空全部
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdateTitle={onUpdateTitle}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
