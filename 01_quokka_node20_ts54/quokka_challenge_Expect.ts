// https://github.com/type-challenges/type-challenges/blob/main/questions/00013-warm-hello-world/README.md

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

// expected to be string
type HelloWorld = string
// you should make this work
type test = Expect<Equal<HelloWorld, string>>

const helloWorld: HelloWorld = 'Hello, World'
console.log(helloWorld)
