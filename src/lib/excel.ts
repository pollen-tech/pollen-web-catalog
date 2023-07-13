import { read, utils } from 'xlsx'

export interface FileReader {
  json: any
  buffer: Buffer | ArrayBuffer | null
}

export const readFromFile = async (file: Blob): Promise<FileReader> => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const result = event.target?.result
      const data = new Uint8Array(result as ArrayBuffer)
      const workbook = read(data, { type: 'array' })

      // Access the worksheet(s) or perform further processing
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]

      // Define the range of rows to process (starting from row 4)
      const range = utils.decode_range(worksheet['!ref'] ?? '')
      range.s.r = 3 // Start from row 4

      const jsonData = utils.sheet_to_json(worksheet, { header: 1, range })

      resolve({ buffer: result as Buffer, json: jsonData })
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsArrayBuffer(file)
  })
}
