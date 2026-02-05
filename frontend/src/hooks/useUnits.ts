import { useEffect, useState } from "react";
import { fetchUnits, UnitRequest } from "../services/battleService";
const unitsCache: Record<string, UnitRequest[]> = {};

export function useUnits(faction: string) {
  const [units, setUnits] = useState<UnitRequest[]>(unitsCache[faction] ?? []);
  const [loading, setLoading] = useState(!unitsCache[faction]);

  useEffect(() => {
    if (!faction) return;
    console.log("Fetching units for faction:", faction);
    // If this faction is already cached, do NOT fetch again
    if (unitsCache[faction]) {
      setUnits(unitsCache[faction]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetchUnits(faction).then(data => {
      unitsCache[faction] = data; // cache by faction
      setUnits(data);
      setLoading(false);
    });
  }, [faction]);

  return { units, loading };
}