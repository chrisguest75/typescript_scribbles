function add(a: number, b: number): number {
    return a + b
}

const employees = new Map<string, number>()
employees.set('Gabriel', 32)

console.log(employees.get('Gabriel'))

// call add function
add(1, 2)
