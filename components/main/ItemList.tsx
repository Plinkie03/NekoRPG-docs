"use client"
import { useEffect, useState } from "react";
import Item from "./Item";
import style from "@/styles/itemlist.module.css";
import { Skeleton, SkeletonText } from "../ui/skeleton";
import ItemCount from './ItemCount';

interface ItemData {
  id: number;
  name: string;
  emoji: string;
  new?: boolean;
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

  const { itemCount, error: itemCountError } = useItemCount(category);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const cacheKey = `local-${category}`;
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
            new: item.new,
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

  if (loading) {
    return (
      <div className={style.itemList}>
        {itemCount ? (
          [...Array(itemCount)].map((_, index) => (
            <div key={index} className="mb-4">
              <Item fake={true} origin={category}/>
            </div>
          ))
        ) : (
          [...Array(10)].map((_, index) => (
            <div key={index} className="mb-4">
              <Item fake={true} origin={category}/>
            </div>
          ))
        )}
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={style.itemList}>
      {items.map((item) => (
        <Item key={item.id} emoji={item.emoji} name={item.name} id={item.id} onHover={() => handleItemHover(item.name, item.id)} origin={category} isNew={item.new}/>
      ))}
      {items.length === 0 && <p>No items found for this category.</p>}
    </div>
  );
};

const useItemCount = (category: string) => {
  const [itemCount, setItemCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    // Fetch the item count
    const fetchItemCount = async () => {
      const cacheKey = `itemCount-${category}`;
      const cachedValue = sessionStorage.getItem(cacheKey);

      if (cachedValue) {
        setItemCount(Number(cachedValue));
        return;
      }

      try {
        const response = await fetch(`https://api.lynnux.xyz/NekoRPG/docs?type=${category}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${category}.json with status ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const count = data.length;
          setItemCount(count);
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
  }, [category]);

  return { itemCount, error };
};

export default ItemList;

