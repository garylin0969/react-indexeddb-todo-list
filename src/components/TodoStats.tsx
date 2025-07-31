import { CheckCircle, Clock, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TodoStatsProps {
    total: number;
    completed: number;
    pending: number;
}

export function TodoStats({ total, completed, pending }: TodoStatsProps) {
    return (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">總計</CardTitle>
                    <List className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{total}</div>
                    <p className="text-xs opacity-60">所有待辦事項</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">已完成</CardTitle>
                    <CheckCircle className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completed}</div>
                    <p className="text-xs opacity-60">完成的項目</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">待完成</CardTitle>
                    <Clock className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pending}</div>
                    <p className="text-xs opacity-60">待完成的項目</p>
                </CardContent>
            </Card>
        </div>
    );
}
