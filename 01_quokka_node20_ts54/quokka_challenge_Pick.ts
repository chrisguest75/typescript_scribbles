// https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md

interface Todo {
    title: string
    description: string
    completed: boolean
}

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>
type TodoPreview2 = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

console.log(todo)
