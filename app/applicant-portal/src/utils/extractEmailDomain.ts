// Utility function to extract domain from email
export default function extractEmailDomain(email: string): string | null {
  if (!email || !email.includes("@")) return null;
  const parts = email.split("@");
  return parts.length === 2 ? parts[1].toLowerCase().trim() : null;
}
