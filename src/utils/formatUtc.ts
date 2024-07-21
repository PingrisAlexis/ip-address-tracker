export const formatTimezone = (timezone: string) => {
  if (/^[+-]\d{4}$/.test(timezone)) {
    return timezone.slice(0, 3) + 'h'
  } else {
    throw new Error('Invalid timezone format')
  }
}
