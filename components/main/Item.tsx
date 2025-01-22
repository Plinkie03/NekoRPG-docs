import Image from "next/image";
import style from "@/styles/main.module.css";
import Link from "next/link";

interface Props {
  emoji: string;
  name: string;
  id: number;
  onHover?: () => void;
}

const Item: React.FC<Props> = ({ emoji, name, id, onHover }) => {
  return (
    <div className={style.main} onMouseEnter={onHover}>
      <Link href={`${origin}/${id}`}>
        <div className={style.container}>
          <Image
            src={`https://cdn.discordapp.com/emojis/${emoji}.webp`}
            alt={`${name}`}
            width={40}
            height={40}
            draggable={false}
            className={style.image}
          />
        {/*<span className={style.badge}>2x</span> */}
        </div>
        <p className={style.name}>{name}</p>
      </Link>
    </div>
  );
};

export default Item;
