// https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.md

// Distributive Conditional Types
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

type MyExclude<T, U> = T extends U ? never : T

type FixedExclude<T> = T extends 'a' ? never : T

type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
type FixedResult = FixedExclude<'a' | 'b' | 'c'> // 'b' | 'c'
