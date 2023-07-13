export const parseUsingHeader = (
  data: string[][]
): Record<string, string>[] => {
  const [headers, ...rows] = data
  const parsedData: Record<string, string>[] = []

  for (const row of rows) {
    const obj: { [key: string]: string } = {}
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i]
    }
    parsedData.push(obj)
  }

  return parsedData
}
