import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import TodoStats from '@/components/TodoStats';
import { useTodos } from '@/hooks/useTodos';

const App = () => {
    const { todos, loading, error, addTodo, toggleTodo, deleteTodo, updateTodoTitle, clearAllTodos, stats } =
        useTodos();

    return (
        <div className="min-h-screen p-4">
            <div className="mx-auto max-w-4xl">
                {/* 標題 */}
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold">待辦事項清單</h1>
                    <p className="opacity-60">使用 IndexedDB 儲存的本地待辦事項管理</p>
                </div>

                {/* 統計資訊 */}
                <TodoStats total={stats.total} completed={stats.completed} pending={stats.pending} />

                {/* 新增待辦事項表單 */}
                <AddTodoForm onAddTodo={addTodo} />

                {/* 待辦事項清單 */}
                <TodoList
                    todos={todos}
                    loading={loading}
                    error={error}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdateTitle={updateTodoTitle}
                    onClearAll={clearAllTodos}
                />
            </div>
        </div>
    );
};

export default App;
