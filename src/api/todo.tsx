export type Todo = {
    id: number;
    name: string;
};

export const getTodos = (): Todo[] => {
    return [
        { id: 1, name: "Tập thể dục" },
        { id: 2, name: "Học lập trình" },
    ];
};
