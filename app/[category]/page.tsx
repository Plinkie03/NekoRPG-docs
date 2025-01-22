"use client"
import ItemList from '@/components/main/ItemList';
import NotFound from '@/components/main/not-found';
import Policy from '@/components/main/Policy';
import StatsBar from '@/components/main/statsbar';
import React from 'react';
import { FC, useState, useEffect } from 'react';

interface Params {
  category: string;
  id?: string;
  type?: string;
}

const Page: FC<{ params: Promise<Params> }> = ({ params }) => {
  const category = React.use(params).category;
  const categoryPass = category[0].toUpperCase() + category.substr(1).toLowerCase();

  const [statsBarId, setStatsBarId] = useState<number>(0);

  const handleItemHover = (id: number) => {
    setStatsBarId(id);
  };

  return (
    <div>
      {category === 'privacy-policy' ? (
        <Policy />
      ) : category === 'items' || category === 'effects' || category === 'monsters' || category === 'quests' || category === 'passives' || category === 'nodes' || category === 'zones' ? (
        <div className='flex'>
          <div className={'page-main'}>
            <h1>{categoryPass}</h1>
            <p>Nya~</p>
            <ItemList category={categoryPass} onItemHover={handleItemHover} />
          </div>
          <div className='right-0'>
          <StatsBar id={statsBarId} category={category} />
          </div>
        </div>
      ) : (
        <NotFound/>
      )}
    </div>
  );
};

export default Page;
