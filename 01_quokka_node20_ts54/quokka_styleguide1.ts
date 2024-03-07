function add(a: number, b: number): number {
    return a + b
}

function test() {
    return
}

const employees = new Map<string, number>()
employees.set('Gabriel', 32)

const employees2 = new Map<string, number>([['Gabriel', 32]])

console.log(employees.get('Gabriel'))
console.log(employees2.get('Gabriel'))

// call add function
add(1, 2)
test()
