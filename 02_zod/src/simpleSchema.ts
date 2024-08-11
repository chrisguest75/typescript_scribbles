import fs from 'fs'
import { z } from 'zod'

const SimpleSchemaConfigZod = z.object({
  segmentSize: z.number().min(1).max(100),
  folderPath: z.string().min(1).max(256),
  url: z.string().url(),
  modified: z.optional(z.number()),
})

export type SimpleSchema = z.infer<typeof SimpleSchemaConfigZod>

export function LoadSimpleSchema(configPath: string): SimpleSchema {
  const configText = fs.readFileSync(configPath)
  const configJson = JSON.parse(configText.toString())
  return SimpleSchemaConfigZod.parse(configJson)
}
