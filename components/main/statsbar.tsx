import { useEffect, useState } from 'react';
import style from '@/styles/sidebar.module.css';

interface Param {
  id: number;
}

interface Item {
  id: number;
  name: string;
  emoji: string;
}

const StatsBar: React.FC<Param> = ({ id }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/NekoRPG/Items.json');
        if (!response.ok) {
          throw new Error('Failed to fetch items.');
        }

        const data: Item[] = await response.json();
        setItems(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching items.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div className="w-96 h-full p-4 fixed">Loading...</div>;
  }

  if (error) {
    return <div className="w-96 h-full p-4 fixed">Error: {error}</div>;
  }

  return (
    <aside className="w-96 h-full p-4 fixed">
      <h2>Items</h2>
      <ul className={style.itemsList}>
        {items.map((item) => (
          <li key={item.id} className={style.item}>
            {item.emoji} {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default StatsBar;
