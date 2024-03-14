// https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type First<T> = T extends [] ? never : T[0]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
