export default {
	async fetch(request, env) {
		if (request.method !== 'GET' && request.method !== 'HEAD') {
			return new Response('Not found', { status: 404 })
		}

		const { pathname } = new URL(request.url)
		const match = pathname.match(/^\/([^/]+)\//)
		if (!match) {
			return new Response('Not found', { status: 404 })
		}

		const shellUrl = new URL(`/${match[1]}/index.html`, request.url)
		const shell = await env.ASSETS.fetch(new Request(shellUrl, { method: request.method }))
		if (!shell.ok) {
			return new Response('Not found', { status: 404 })
		}

		return new Response(shell.body, {
			status: 200,
			headers: shell.headers,
		})
	},
}
