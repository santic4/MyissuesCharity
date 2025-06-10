export async function processPayment(method, amount) {
  const txId = `${method.toUpperCase()}_${Date.now()}`;
  return txId;
}