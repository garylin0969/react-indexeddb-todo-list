import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface AddTodoFormProps {
    onAddTodo: (title: string) => void;
}

const AddTodoForm = ({ onAddTodo }: AddTodoFormProps) => {
    const [title, setTitle] = useState('');

    // 處理提交表單
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTodo(title.trim());
            setTitle('');
        }
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>新增待辦事項</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="輸入待辦事項..."
                        className="flex-1"
                    />
                    <Button type="submit" disabled={!title.trim()}>
                        <Plus className="mr-2 h-4 w-4" />
                        新增
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddTodoForm;
