// https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md

const fn = (v: boolean): 1 | 2 => {
    if (v) return 1
    else return 2
}

type MyReturnType<T> = T extends (v: boolean) => infer R ? R : never
type MyType = MyReturnType<typeof fn> // should be "1 | 2"

type MyType2 = ReturnType<typeof fn> // should be "1 | 2"

const value: MyType = 1
console.log(value)
