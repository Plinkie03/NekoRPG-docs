"use client"
import { useEffect, useState } from "react";
import Item from "./Item";
import style from "@/styles/itemlist.module.css";

interface ItemData {
  id: number;
  name: string;
  emoji: string;
}

interface Props {
  category: string;
  onItemHover: (id: number) => void;  // Accept the hover handler as a prop
}

const CACHE_LIFETIME = 60 * 60 * 1000; // 1h

const ItemList: React.FC<Props> = ({ category, onItemHover }) => {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const cacheKey = `items-${category}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);

          // Check if the cache is still valid
          if (Date.now() - timestamp < CACHE_LIFETIME) {
            console.log("Loading items from cache");
            setItems(data);
            setLoading(false);
            return;
          } else {
            console.log("Cache expired, fetching new data");
            localStorage.removeItem(cacheKey);
          }
        }

        // If no cache found/removed fetch new from the API
        console.log("Fetching items from API");
        const response = await fetch(`https://api.lynnux.xyz/nekoRPG/docs?type=${category}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch items for category: ${category}`);
        }
        const data = await response.json();

        const processedData = data.map((item: any) => {
          // Extract emoji ID
          const emojiMatch = item.emoji?.match(/:(\d+)>$/); // Match the ID part
          const emojiId = emojiMatch ? emojiMatch[1] : "1331619855102640148";

          return {
            id: item.id || NaN,
            name: item.name || "Unknown",
            emoji: emojiId,
          };
        });

        // add a timestamp to cache
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: processedData, timestamp: Date.now() })
        );

        setItems(processedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [category]);

  const handleItemHover = (name: string, id: number) => {
    console.log(`name: ${name}, id: ${id}`);
    onItemHover(id);  // Call the handler passed from the parent
  };

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={style.itemList}>
      {items.map((item) => (
        <Item key={item.id} emoji={item.emoji} name={item.name} id={item.id} onHover={() => handleItemHover(item.name, item.id)} />
      ))}
      {items.length === 0 && <p>No items found for this category.</p>}
    </div>
  );
};

export default ItemList;
