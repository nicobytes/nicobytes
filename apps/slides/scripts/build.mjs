import { spawn } from 'node:child_process'
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const decksDir = path.join(root, 'decks')
const dist = path.join(root, 'dist')

const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return `${day} ${months[month - 1]} ${year}`
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} ${args.join(' ')} exited with ${code}`))
    })
  })
}

async function loadDecks() {
  const entries = await readdir(decksDir, { withFileTypes: true })
  const decks = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const slug = entry.name
    const metaPath = path.join(decksDir, slug, 'deck.json')
    const raw = JSON.parse(await readFile(metaPath, 'utf8'))

    if (raw.draft) continue

    for (const field of ['title', 'description', 'date']) {
      if (typeof raw[field] !== 'string' || raw[field].length === 0) {
        throw new Error(`decks/${slug}/deck.json is missing "${field}"`)
      }
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw.date)) {
      throw new Error(`decks/${slug}/deck.json date must be YYYY-MM-DD`)
    }

    const tags = raw.tags ?? []
    if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string')) {
      throw new Error(`decks/${slug}/deck.json tags must be an array of strings`)
    }

    decks.push({
      slug,
      title: raw.title,
      description: raw.description,
      date: raw.date,
      tags,
    })
  }

  decks.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
  return decks
}

function renderDeck(deck, index) {
  const href = `/${deck.slug}/`
  const tags = deck.tags
    .map((tag) => `<li>${escapeHtml(tag)}</li>`)
    .join('')

  return `<li class="entry" style="--i: ${index}">
        <time datetime="${escapeHtml(deck.date)}">${escapeHtml(formatDate(deck.date))}</time>
        <div class="entry-body">
          <h2><a href="${href}">${escapeHtml(deck.title)}</a></h2>
          <p>${escapeHtml(deck.description)}</p>
          ${tags ? `<ul class="tags">${tags}</ul>` : ''}
          <a class="go" href="${href}">Ver slides</a>
        </div>
      </li>`
}

const decks = await loadDecks()

await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })

for (const deck of decks) {
  await run('pnpm', [
    'exec',
    'slidev',
    'build',
    path.join('decks', deck.slug, 'slides.md'),
    '--base',
    `/${deck.slug}/`,
    '--out',
    path.join(dist, deck.slug),
  ])
  await rm(path.join(dist, deck.slug, '_redirects'), { force: true })
}

await cp(path.join(root, 'home', 'home.css'), path.join(dist, 'home.css'))

const template = await readFile(path.join(root, 'home', 'template.html'), 'utf8')
const list = decks.length
  ? decks.map(renderDeck).join('\n')
  : '<li class="empty">Todavía no hay slides publicados.</li>'

await writeFile(path.join(dist, 'index.html'), template.replace('<!-- decks -->', list))

console.log(`Built ${decks.length} deck${decks.length === 1 ? '' : 's'} into dist/`)
