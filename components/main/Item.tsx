import Image from "next/image";
import style from "@/styles/main.module.css";
import Link from "next/link";
import { Skeleton, SkeletonText } from "../ui/skeleton";

interface Props {
  fake?: boolean;
  emoji?: string;
  name?: string;
  id?: number;
  onHover?: () => void;
  origin: string;
  isNew?: boolean;
}

const Item: React.FC<Props> = ({ fake, emoji, name, id, onHover, origin, isNew }) => {
  return (
    <>
    {fake ?
      <div className={style.main} onMouseEnter={onHover}>
        <Link href={`${origin}/${id}`}>
          <div className={style.container}>
            <Skeleton height="100%" width="100%" variant={"shine"} colorPalette={"pink"} marginBottom="8px" />
          </div>
          <div className={style.name}><SkeletonText mt="4" noOfLines={2} /></div>
        </Link>
      </div>
    :
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
            { isNew ? (<span className={style.badge}>NEW</span>) : (<></>)}
          </div>
          <p className={style.name}>{name}</p>
        </Link>
      </div>
    }
    </>
  );
};

export default Item;
