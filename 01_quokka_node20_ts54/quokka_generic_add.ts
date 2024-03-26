interface MyType {
    test: boolean
}

interface MetadataValue {
    myString: string
    myFlag: boolean
    myType: MyType
}

type MetadataKey = keyof MetadataValue

function add<T extends MetadataKey>(field: T, data: MetadataValue[T]) {
    console.log(field, data)
    return 'Added successfully'
}

add('myString', '123')
add('myFlag', true)
add('myType', { test: true })
add('myType', { test: false }) // this will throw an error too
//add(1,2) // this will raise an error
