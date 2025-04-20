export async function fetchApiResponse(url: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app${url}`)
    if (!response.ok) throw new Error("Network response was not ok")
    
    const data = await response.json()
    return data;
  }
  