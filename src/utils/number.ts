export const existsAndNotNaN = (value?: number | string | null) =>
  value == null || value == undefined || isNaN(value as number)
