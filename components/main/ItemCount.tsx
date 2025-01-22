import style from "../../styles/sidebar.module.css";
import { Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ItemCountProps {
  type: string; // Allow any string for flexibility
}

const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const ItemCount: React.FC<ItemCountProps> = ({ type }) => {
  const [itemCount, setItemCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const capitalizedType = capitalizeFirstChar(type);

    // Function to fetch data from API or cache
    const fetchItemCount = async () => {
      // Check for cached data in sessionStorage
      const cacheKey = `itemCount-${capitalizedType}`;
      const cachedValue = sessionStorage.getItem(cacheKey);

      if (cachedValue) {
        // Use cached data
        setItemCount(Number(cachedValue));
        return; // Skip the fetch call
      }

      try {
        // Fetch data from API if not in cache
        const response = await fetch(`https://api.lynnux.xyz/NekoRPG/docs?type=${capitalizedType}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${capitalizedType}.json with status ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const count = data.length;
          setItemCount(count);

          // Cache the result in sessionStorage
          sessionStorage.setItem(cacheKey, String(count));
        } else {
          throw new Error(`${capitalizedType}.json does not contain a valid array`);
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
        console.error("Fetch error:", err);
      }
    };

    fetchItemCount();
  }, [type]); // Dependencies array ensures this runs only when `type` changes

  return (
    <div>
      {error ? (
        <Badge className={style.buttonBadge} colorScheme="red">Error</Badge>
      ) : itemCount !== null ? (
        <Badge className={style.buttonBadge} colorScheme="green">{itemCount}</Badge>
      ) : (
        <Badge className={style.buttonBadge} colorScheme="gray">0</Badge>
      )}
    </div>
  );
};

export default ItemCount;
