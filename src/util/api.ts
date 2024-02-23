const baseUrl = 'https://fakestoreapi.com/'

export async function getAll(resource: string, size = 10) {
  const res = await fetch(`${baseUrl}${resource}?limit=${size}`)
  return await res.json()
}

export async function getById(resource: string, id: string) {
  const res = await fetch(`${baseUrl}${resource}/${id}`)
  return await res.json()
}