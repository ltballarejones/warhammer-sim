import { useEffect, useState } from "react";
import {fetchFactions } from "../services/battleService";
let factionCache: string[] | null = null;

export function useFactions() {
  const [factions, setFactions] = useState<string[]>(factionCache ?? []);
  const [loading, setLoading] = useState(!factionCache);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (factionCache) return; // already cached

    async function load() {
      try {
        setLoading(true);
        const data = await fetchFactions();
        factionCache = data;
        setFactions(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { factions, loading, error };
}
