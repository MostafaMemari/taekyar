export function extractStatusCode(error: unknown): number | null {
  if (!error || typeof error !== 'object') return null

  const status = (error as any).status

  if (typeof status === 'number') return status

  const message = (error as any).message ?? ''
  const match = message.match(/status:\s*(\d+)/)

  if (match) {
    return parseInt(match[1], 10)
  }

  return null
}
