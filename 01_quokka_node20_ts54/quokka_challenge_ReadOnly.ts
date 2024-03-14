// https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md

interface Todo {
    title: string
    description: string
}

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}

type ReadonlyTodo = MyReadonly<Todo>

const todo: ReadonlyTodo = {
    title: 'Hey',
    description: 'foobar',
} as const

todo.title = 'Hello' // Error: cannot reassign a readonly property
// @ts-expect-error "Cannot assign to 'description' because it is a read-only property."
todo.description = 'barFoo' // Error: cannot reassign a readonly property

console.log(todo)
