export interface Data {
  ip: string
  city: string
  region: string
  country: string
  timezone: string
  utc: string
  isp: string
}

export interface Response {
  latitude: number
  longitude: number
  city: string
  region: string
  country_name: string
  timezone: string
  utc_offset: string
  org: string
}

export interface Map {
  center: [number, number]
  zoom: number
  markerPosition: [number, number]
}
