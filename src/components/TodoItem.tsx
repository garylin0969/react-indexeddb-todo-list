import { Trash2, Edit, Save, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { type TodoItem as TodoItemType } from '@/lib/indexeddb';

interface TodoItemProps {
    todo: TodoItemType;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdateTitle: (id: string, newTitle: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onUpdateTitle }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    // 處理儲存編輯
    const handleSave = () => {
        if (editTitle.trim()) {
            onUpdateTitle(todo.id, editTitle.trim());
            setIsEditing(false);
        }
    };

    // 處理取消編輯
    const handleCancel = () => {
        setEditTitle(todo.title);
        setIsEditing(false);
    };

    // 處理按鍵事件
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <Card className="mb-2">
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    {/* 完成狀態核取方塊 */}
                    <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => onToggle(todo.id)}
                        className="flex-shrink-0"
                    />

                    {/* 待辦事項內容 */}
                    <div className="min-w-0 flex-1">
                        {isEditing ? (
                            <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="h-8"
                                autoFocus
                            />
                        ) : (
                            <span className={`block truncate ${todo.completed ? 'line-through opacity-60' : ''}`}>
                                {todo.title}
                            </span>
                        )}
                    </div>

                    {/* 操作按鈕 */}
                    <div className="flex items-center gap-1">
                        {isEditing ? (
                            <>
                                <Button size="sm" variant="ghost" onClick={handleSave} className="h-8 w-8 p-0">
                                    <Save className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 w-8 p-0">
                                    <X className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setIsEditing(true)}
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => onDelete(todo.id)}
                                    className="h-8 w-8 p-0"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* 時間資訊 */}
                <div className="mt-2 text-xs opacity-60">
                    <span>建立時間: {todo.createdAt.toLocaleString()}</span>
                    {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
                        <span className="ml-2">更新時間: {todo.updatedAt.toLocaleString()}</span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TodoItem;
