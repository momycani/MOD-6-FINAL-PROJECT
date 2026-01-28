export const DEFAULT_PRICE_GROUP = "MEDIUM";

export const PRICE_GROUPS = {
  LOW: { rent: "3.95", purchase: "18.95" },
  MEDIUM: { rent: "4.95", purchase: "19.95" },
  HIGH: { rent: "5.95", purchase: "20.95" },
  PREMIUM: { rent: "6.95", purchase: "21.95" },
};

export const movieMeta = {
  // If I decide to change pricing for specifi movies do it here
  // tt0107688: { priceGroup: "MEDIUM" },
};


export function getPriceGroupForImdbID(imdbID) {
  const meta = movieMeta[imdbID];
  if (meta?.priceGroup) return meta.priceGroup;

  const groups = ["LOW", "MEDIUM", "HIGH", "PREMIUM"];
  const sum = imdbID.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return groups[sum % groups.length];
}

export function getPricesForImdbID(imdbID) {
  const group = getPriceGroupForImdbID(imdbID);
  return PRICE_GROUPS[group] || PRICE_GROUPS[DEFAULT_PRICE_GROUP];
}
