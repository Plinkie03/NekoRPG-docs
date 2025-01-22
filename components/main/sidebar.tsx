"use client"
import style from "../../styles/sidebar.module.css"
import React from "react";
import Link from "next/link";
import { InputGroup } from "../ui/input-group";
import { Badge, Box, Button, Input, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ItemCount from "./ItemCount";

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(`/${path.toLowerCase()}`);
  };

  return (
    <aside className="w-72 h-full p-4 fixed sidebar">
      <Link href={'/'}>
        <h2 className="text-xl font-bold mb-4">NekoRPG</h2>
      </Link>
      <div className={style.searchBox}>
        <div className={style.search}>
          <Input
            type="text"
            placeholder="Search"
            className={style.searchBar}
          />
        </div>
        <button title="searchButton" className={style.searchButton}>
          <Image src={"./search.svg"}  alt="Test" width={25} height={25}/>
        </button>
      </div>
      <div className={style.buttonList}>
        <Box p={4} borderRadius="md" w="full" maxW="250px" className={style.Button}>
          <VStack align="stretch">
            <Button variant="ghost" justifyContent="space-between" color="white" onClick={() => handleNavigation('items')} className={style.buttonElement}>
              <p>Items</p>
              <ItemCount type="Items" />
            </Button>

            <Button variant="ghost" justifyContent="space-between" color="white" onClick={() => handleNavigation('effects')} className={style.buttonElement}>
              <p>Effects</p>
              <ItemCount type="Effects" />
            </Button>

            <Button variant="ghost" justifyContent="space-between" color="white" onClick={() => handleNavigation('monsters')} className={style.buttonElement}>
              <p>Monsters</p>
              <ItemCount type="Monsters" />
            </Button>

            <Button variant="ghost" justifyContent="space-between" color="white" onClick={() => handleNavigation('quests')} className={style.buttonElement}>
              <p>Quests</p>
              <ItemCount type="Quests" />
            </Button>

            <Button variant="ghost" justifyContent="space-between" color="white" onClick={() => handleNavigation('passives')} className={style.buttonElement}>
              <p>Passives</p>
              <ItemCount type="Passives" />
            </Button>

            <Button variant="ghost" justifyContent="space-between" color="white" onClick={() => handleNavigation('nodes')} className={style.buttonElement}>
              <p>Nodes</p>
              <ItemCount type="Nodes" />
            </Button>

            <Button variant="ghost" justifyContent="space-between" color="white" onClick={() => handleNavigation('zones')} className={style.buttonElement}>
              <p>Zones</p>
              <ItemCount type="Zones" />
            </Button>

            <Button variant="ghost" justifyContent="start" onClick={() => handleNavigation('invite')} className={`color-theme ${style.buttonElement}`}>
              Invite bot
            </Button>
            <Button variant="ghost" justifyContent="start" onClick={() => handleNavigation('support')} className={`color-theme ${style.buttonElement}`}>
              Support Server
            </Button>
          </VStack>
        </Box>
      </div>
    </aside>
  );
};

export default Sidebar;