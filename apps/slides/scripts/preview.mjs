import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const port = Number(process.env.PORT || 4173)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}

function insideDist(file) {
  const resolved = path.resolve(file)
  return resolved === dist || resolved.startsWith(dist + path.sep)
}

async function resolveFile(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0])
  const relative = pathname.replace(/^\/+/, '')
  const candidate = path.resolve(dist, relative)

  if (!insideDist(candidate)) return null

  try {
    const info = await stat(candidate)
    if (info.isDirectory()) {
      const index = path.join(candidate, 'index.html')
      await stat(index)
      return index
    }
    return candidate
  } catch {
    const [slug] = relative.split('/')
    if (!slug) return null
    const fallback = path.join(dist, slug, 'index.html')
    if (!insideDist(fallback)) return null
    try {
      await stat(fallback)
      return fallback
    } catch {
      return null
    }
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost')
  const pathname = url.pathname

  if (pathname.length > 1 && !pathname.endsWith('/') && !path.extname(pathname)) {
    const asDir = path.resolve(dist, pathname.slice(1))
    if (insideDist(asDir)) {
      try {
        const info = await stat(asDir)
        if (info.isDirectory()) {
          response.writeHead(302, { Location: `${pathname}/${url.search}` })
          response.end()
          return
        }
      } catch {
        // Fall through to the file or SPA lookup.
      }
    }
  }

  const file = await resolveFile(pathname)
  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }

  const type = types[path.extname(file)] ?? 'application/octet-stream'
  response.writeHead(200, { 'Content-Type': type })
  createReadStream(file).pipe(response)
})

server.listen(port, () => {
  console.log(`Preview http://localhost:${port}`)
})
