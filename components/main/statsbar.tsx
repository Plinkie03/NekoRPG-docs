import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, useMemo } from "react";
import style from "@/styles/sidebar.module.css";
import Image from "next/image";
import { pascalCaseToSpaced } from "../functions/pascalToSpaced";

interface Param {
  id: number;
  category: string;
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
  gearType?: string;
  weaponType?: string;
  info?: string;
}

const capitalizeFirstChar = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const StatsBar: React.FC<Param> = ({ id, category }) => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${category}-${id}`;

  // Use useMemo to return cached data or fetch it if not available
  const cachedItem = useMemo(() => {
    if (typeof window !== "undefined") {
      const cachedData = sessionStorage.getItem(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    }
    return null;
  }, [cacheKey]);

  useEffect(() => {
    if (id <= 0) return;

    const capitalizedType = capitalizeFirstChar(category);
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.lynnux.xyz/nekoRPG/docs?type=${capitalizedType}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items.");
        }

        const data: Item[] = await response.json();
        const foundItem = data.find((item) => item.id === id);

        if (!foundItem) {
          throw new Error(`Item with ID ${id} not found.`);
        }

        setItem(foundItem);
        setError(null); // Clear any previous error

        // Cache the fetched item
        if (typeof window !== "undefined") {
          sessionStorage.setItem(cacheKey, JSON.stringify(foundItem));
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the item.");
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    if (!cachedItem) {
      fetchItem();
    } else {
      setItem(cachedItem);
    }
  }, [id, category, cachedItem, cacheKey]);

  if (id <= 0) {
    return <div className="w-96 h-full p-4 fixed"></div>;
  }

  if (loading || item === null) {
    return (
      <aside className="w-96 h-full p-4 fixed">
        <div className={style.item}>
          <div className={style.itemDetails}>
            <div className={`${style.itemImage}`}>
              <Skeleton height="6rem" width="6rem" className={`${style.itemImage}`} />
            </div>
            <div className={style.itemText}>
              <div className={style.textMain}>
                <h2>{loading ? "Loading..." : "Item not found"}</h2>
              </div>
            </div>
          </div>
        </div>
      </aside>
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
    <aside className="w-96 h-full p-4 fixed">
      <div className={style.item}>
        <div className={style.itemDetails}>
          <div className={`${style.itemImage}`}>
            <Image
              src={`https://cdn.discordapp.com/emojis/${processedItem.emoji}.webp`}
              alt={`${item.name}`}
              width={75}
              height={75}
              draggable={false}
              className={style.image}
            />
          </div>
          <div className={style.itemText}>
            <div className={style.textMain}>
              <h2>{item.name}</h2>
              {(item.description || item.info) && (
                <p className={style.description}>{item.description || item.info}</p>
              )}
            </div>
            <div className={`${style.badgeListWrapper}`}>
              <div className={style.badgeList}>
                {(item.weaponType || item.gearType || item.type) && (
                  <span className={style.badge}>
                    <div className={`flex gap-2 ${style.badgeSpace}`}>
                      <div>
                        {item.weaponType || item.gearType || item.type}
                      </div>
                      <div className={style.svg}>
                        <Image src={`/` +`${item.gearType ? item.gearType : item.type}`+'.svg'} alt="" width={13} height={13} />
                      </div>
                    </div>
                  </span>
                )}
                {(!!item.price && item.price > 0) && (
                  <span className={style.badge}>
                    <div className={`flex gap-2 ${style.badgeSpace}`}>
                      <div>{item.price}$</div> <div className={style.svg}><Image src={"/price.svg"} alt={""} width={10} height={10}></Image></div>
                    </div>
                  </span>
                )}
                {item.cooldown && (
                  <span className={style.badge}>
                    <div className={`flex gap-2 ${style.badgeSpace}`}>
                      <div>{item.cooldown}</div> <div className={style.svg}><Image src={"/clock.svg"} alt={""} width={10} height={10}></Image></div>
                    </div>
                  </span>
                )}
                {item.chance && (
                  <span className={style.badge}>
                    <div className={`flex gap-2 ${style.badgeSpace}`}>
                    <div>{item.chance}%</div> <div className={style.svg}><Image src={"/Chance.svg"} alt={""} width={11} height={11}></Image></div>
                    </div>
                  </span>
                )}
              </div>
            </div>
            {item.stats && (
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
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StatsBar;
