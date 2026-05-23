const COMPANY_MAPPINGS: Record<string, string> = {
  google: "Google",
  "google india": "Google",

  amazon: "Amazon",
  "amazon india": "Amazon",

  microsoft: "Microsoft",
  msft: "Microsoft",

  meta: "Meta",
  facebook: "Meta",

  netflix: "Netflix",
};

export function normalizeCompanyName(
  company: string
): string {
  const normalized = company
    .trim()
    .toLowerCase();

  return (
    COMPANY_MAPPINGS[normalized] ||
    normalized.charAt(0).toUpperCase() +
      normalized.slice(1)
  );
}