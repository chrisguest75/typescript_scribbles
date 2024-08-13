import fs from 'fs'
import { z } from 'zod'

// can also be z.strictObject
const StrictSchemaConfigZod = z
  .object({
    segmentSize: z.number().min(1).max(100),
    folderPath: z.string().min(1).max(256),
    url: z.string().url(),
    modified: z.optional(z.number()),
  })
  .strict()

export type StrictSchema = z.infer<typeof StrictSchemaConfigZod>

export function LoadStrictSchema(configPath: string): StrictSchema {
  const configText = fs.readFileSync(configPath)
  const configJson = JSON.parse(configText.toString())
  return StrictSchemaConfigZod.parse(configJson)
}
