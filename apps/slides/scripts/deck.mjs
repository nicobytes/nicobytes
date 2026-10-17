import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const slug = process.argv[2]

if (!slug) {
  console.error('Usage: pnpm deck <slug>')
  process.exit(1)
}

const entry = path.join(root, 'decks', slug, 'slides.md')

try {
  await access(entry)
} catch {
  console.error(`No deck at decks/${slug}/slides.md`)
  process.exit(1)
}

const child = spawn('pnpm', ['exec', 'slidev', entry, '--open'], {
  cwd: root,
  stdio: 'inherit',
})

child.on('exit', (code) => process.exit(code ?? 1))
