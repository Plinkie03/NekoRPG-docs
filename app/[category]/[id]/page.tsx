"use client";

import { useState, useEffect, useMemo } from "react";
import ItemList from "@/components/main/ItemList";
import NotFound from "@/components/main/not-found";
import StatsBar from "@/components/main/statsbar";
import style from "@/styles/main.module.css";
import { Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import { pascalCaseToSpaced } from "@/components/functions/pascalToSpaced";

interface Params {
  category: string;
  id: string;
}

interface Item {
  id: number;
  name: string;
  emoji: string;
  type?: string;
  price?: number;
  cooldown?: number;
  chance?: number;
  stats?: string;
  description?: string;
}

const capitalizeFirstChar = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const Page = ({ params: paramsPromise }: { params: Promise<Params> }) => {
  const [params, setParams] = useState<Params | null>(null);
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap `params` asynchronously
  useEffect(() => {
    paramsPromise.then(setParams).catch(() => {
      setError("Failed to load route parameters.");
      setParams(null);
    });
  }, [paramsPromise]);

  const cacheKey = useMemo(() => {
    if (!params) return null;
    return `${params.category}-${params.id}`;
  }, [params]);

  useEffect(() => {
    if (!params || !cacheKey) return;

    const itemId = parseInt(params.id, 10);
    if (isNaN(itemId) || itemId <= 0) {
      setError("Invalid item ID.");
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.lynnux.xyz/nekoRPG/docs?type=${params.category}`
        );
        if (!response.ok) throw new Error("Failed to fetch items.");

        const data: Item[] = await response.json();
        const foundItem = data.find((item) => item.id === itemId);

        if (!foundItem) {
          setError(`Item with ID ${params.id} not found.`);
          setItem(null);
        } else {
          setItem(foundItem);
          setError(null);

          if (typeof window !== "undefined") {
            sessionStorage.setItem(cacheKey, JSON.stringify(foundItem));
          }
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the item.");
      } finally {
        setLoading(false);
      }
    };

    const cachedItem = sessionStorage.getItem(cacheKey);
    if (cachedItem) {
      setItem(JSON.parse(cachedItem));
      setLoading(false);
    } else {
      fetchItem();
    }
  }, [params, cacheKey]);

  if (!params) {
    return <div>Loading route parameters...</div>;
  }

  if (loading) {
    return (
      <div className="w-96 h-full p-4 fixed">
        <div className={style.item}>
          <div className={style.itemDetails}>
            <div className={style.itemImage}>
              <Skeleton height="6rem" width="6rem" />
            </div>
            <div className={style.itemText}>
              <div className={style.textMain}>
                <h2>Loading...</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="w-96 h-full p-4 fixed">
        <NotFound />
      </div>
    );
  }

  const processedItem = {
    ...item,
    emoji: (() => {
      const emojiMatch = item?.emoji?.match(/:(\d+)>$/);
      return emojiMatch ? emojiMatch[1] : "1331619855102640148";
    })(),
  };

  return (
    <div>
      {["Items", "Effects", "Monsters", "Quests", "Passives", "Nodes", "Zones"].includes(params.category) ? (
        <div className={style.itemContent}>
          <div className={style.itemHeader}>
            <div className={style.itemImageContainer}>
              <Image
                src={`https://cdn.discordapp.com/emojis/${processedItem.emoji}.webp`}
                alt={`${item.name}`}
                width={80}
                height={80}
                draggable={false}
                className={style.itemImage}
              />
            </div>
            <div className={style.itemHeaderMain}>
              <div className={style.itemHeaderName}>
                {item.name} <span className={style.itemHeaderID}>({item.id})</span>
              </div>
              <div className={style.itemHeaderDescription}>
                {item.description}
              </div>
            </div>
          </div>
          <div className={style.content}>
          <div className={style.contentLeft}>
          </div>
          {item.stats ? (
            <div className={style.contentRight}>
              <div className={style.lynnWasHere}>
                <p className={style.nglIRanOutOfClassNames}>{item.type} Stats</p>
                <ul className={style.statsList}>
                  {Object.entries(item.stats).map(([statName, statValue]) => (
                    <li key={statName} className={style.statItem}>
                      <span className={style.statName}>
                        {pascalCaseToSpaced(capitalizeFirstChar(statName))}
                      </span>
                      <span className={style.statValue}>{statValue}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ):(<div className={style.contentRight}></div>)}
        </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Page;
