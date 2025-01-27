// src/index.ts
export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`
}

export async function greetFail(name: string): Promise<string> {
  throw new Error('Failed to greet')
}

