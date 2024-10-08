export default async function getConfig(id: string) {
  try {
    const res = await fetch(
      `https://e66a-103-250-159-164.ngrok-free.app/getBridgeConfig`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token_id: id,
        }),
      },
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
