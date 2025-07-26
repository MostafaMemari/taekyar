export function extractTimeFromMessage(message: string): string | null {
  const match = message.match(/(\d{1,2}:\d{2})/)

  return match ? match[1] : null
}
