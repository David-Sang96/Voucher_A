export function generateInvoiceNumber() {
  const prefix = "INV-";
  const date = new Date();

  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
  // Generate a random  number between 1000 and 9999
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const invoiceNumber = `${prefix}${formattedDate}-${randomNum}`;

  return invoiceNumber;
}

export function currentDateTime() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getUTCTime(date?: string) {
  if (date) {
    return new Date(date).toISOString().split(".")[0].replace("T", " ");
  }
  return new Date().toISOString().split(".")[0].replace("T", " ");
}
