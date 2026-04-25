export async function GET() {
  const response = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=9"
  );
  const data = await response.json();
  return Response.json(data);
}