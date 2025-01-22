import { Skeleton, SkeletonCircle, SkeletonText, } from "@/components/ui/skeleton"

import { useEffect, useState } from 'react';
import style from '@/styles/sidebar.module.css';
import Image from 'next/image';

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
}

const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const StatsBar: React.FC<Param> = ({ id, category }) => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If id is 0 or not valid, skip fetching
    if (id <= 0) return;

    const capitalizedType = capitalizeFirstChar(category);
    const fetchItem = async () => {
      setLoading(true); // Set loading state only when fetching starts
      try {
        const response = await fetch(`/NekoRPG/${capitalizedType}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch items.');
        }

        const data: Item[] = await response.json();
        const foundItem = data.find((item) => item.id === id);

        if (!foundItem) {
          throw new Error(`Item with ID ${id} not found.`);
        }

        setItem(foundItem);
        setError(null); // Clear any previous error
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching the item.');
        setItem(null); // Ensure no stale data is displayed
      } finally {
        setLoading(false); // Ensure loading is stopped
      }
    };

    fetchItem();
  }, [id, category]);

  if (id <= 0) {
    return <div className="w-96 h-full p-4 fixed"></div>;
  }

  if (loading) {
    return <aside className="w-96 h-full p-4 fixed">
      <div className={style.item}>
        <div className={style.itemDetails}>
          <div className={`${style.itemImage}`}>
          <Skeleton height="6rem" width="6rem" className={`${style.itemImage}`}/>
          </div>
          <div className={style.itemText}>
            <div className={style.textMain}>
              <h2></h2>
            </div>
          </div>
        </div>
      </div>
    </aside>;
  }

  if (error) {
    return <aside className="w-96 h-full p-4 fixed">
    <div className={style.item}>
        <div className={style.itemDetails}>
          <div className={`${style.itemImage}`}>
          <Skeleton height="6rem" width="6rem" className={`${style.itemImage}`}/>
          </div>
          <div className={style.itemText}>
            <div className={style.textMain}>
              <h2>Error:</h2>
            </div>
            <p>{error}</p>
          </div>
        </div>
    </div>
  </aside>;
  }

  if (item === null) {
    return <aside className="w-96 h-full p-4 fixed">
      <div className={style.item}>
        <div className={style.itemDetails}>
          <div className={`${style.itemImage}`}>
            <Skeleton height="6rem" width="6rem" className={`${style.itemImage}`}/>
          </div>
          <div className={style.itemText}>
            <div className={style.textMain}>
              <h2>Error:</h2>
            </div>
            <p>No item found.</p>
          </div>
        </div>
      </div>
    </aside>;
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
        {item && (
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
                <p className={style.description}>{item.description}</p>
              </div>
              <div className={`${style.badgeListWrapper}`}>
              <div className={style.badgeList}>
                {item.type && (
                  <span className={style.badge}>
                    <div className={`flex gap-2 ${style.badgeSpace}`}>
                      <div>Type:</div> <div>{item.type}</div>
                    </div>
                  </span>
                )}
                {item.price && (
                  <span className={style.badge}>
                    <div className={`flex gap-2 ${style.badgeSpace}`}>
                      <div>Price:</div> <div>{item.price}$</div>
                    </div>
                  </span>
                )}
                {item.cooldown && (
                  <span className={style.badge}>
                    <div className={`flex gap-2 ${style.badgeSpace}`}>
                      <div>Cooldown:</div> <div>{item.cooldown}s</div>
                    </div>
                  </span>
                )}
                {item.chance && (
                  <span className={style.badge}>
                    <div className={`flex gap-2 ${style.badgeSpace}`}>
                      <div>Chance:</div> <div>{item.chance}%</div>
                    </div>
                  </span>
                )}
              </div>
            </div>
              {item.stats && (
                <>
                  <ul className={style.statsList}>
                    {Object.entries(item.stats).map(([statName, statValue]) => (
                      <li key={statName} className={style.statItem}>
                        <span className={style.statName}>{capitalizeFirstChar(statName)}</span>
                        <span className={style.statValue}>{statValue}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default StatsBar;
