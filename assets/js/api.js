// assets/js/api.js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVq-hOwHsXrH3g2945_oF_E7J0WnmKfyjpoPwa1jCacE-kWNJRiG3UMnYpEwgQO4yS/exec";

export async function fetchProducts() {
  try {
    const res = await fetch(`${SCRIPT_URL}?action=getProducts`);
    if (!res.ok) throw new Error("Gagal mengambil data");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function submitOrder(orderData) {
  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "addOrder", data: orderData }),
      headers: { "Content-Type": "application/json" }
    });
    const result = await res.json();
    return result.status === "success";
  } catch (err) {
    console.error(err);
    return false;
  }
}