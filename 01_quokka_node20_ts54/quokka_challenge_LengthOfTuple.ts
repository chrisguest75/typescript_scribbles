// https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md

type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type Length<T extends any[]> = T['length']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5

const a: tesla = ['tesla', 'model 3', 'model X', 'model Y']
const b: teslaLength = 4
console.log(a)
console.log(b)
