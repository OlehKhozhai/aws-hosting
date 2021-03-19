export const BASE_URL =
  "https://ffqzt00xy8.execute-api.us-east-1.amazonaws.com/production"
export const TO_DO_PATH = "to-do"

export const doFetch = async <T>({
  url,
  params = {},
}: {
  url: RequestInfo
  params?: RequestInit
}): Promise<T> => {
  const response = await fetch(url, params)
  return response.json()
}
