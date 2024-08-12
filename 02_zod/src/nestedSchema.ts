import fs from 'fs'
import { z } from 'zod'

const wordSchema = z.object({
  content: z.string(),
  language: z.string(),
})

// can also be z.strictObject
const NestedSchemaConfigZod = z
  .object({
    words: z.array(wordSchema),
  })
  .strict()

export type NestedSchema = z.infer<typeof NestedSchemaConfigZod>

export function LoadNestedSchema(configPath: string): NestedSchema {
  const configText = fs.readFileSync(configPath)
  const configJson = JSON.parse(configText.toString())
  return NestedSchemaConfigZod.parse(configJson)
}
