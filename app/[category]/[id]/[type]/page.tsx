"use client"
import { FC, useEffect, useState } from 'react';

interface Params {
  category: string;
  id: string;
  type: string;
}

const Page: FC<{ params: Promise<Params> }> = ({ params }) => {
  const [fetchedParams, setFetchedParams] = useState<Params | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await params;
        setFetchedParams(resolvedParams);
      } catch (error) {
        console.error("Error fetching params:", error);
      }
    };

    fetchData();
  }, [params]);

  if (!fetchedParams) return <div>Loading...</div>;

  const { category, id, type } = fetchedParams;

  return (
    <div>
      <h1>{`Category: ${category}, ID: ${id}${type ? `, Type: ${type}` : ''}`}</h1>
      <p>{type ? `This is the page for category ${category}, ID ${id}, and type ${type}.` : `This is the default page for category ${category}, ID ${id}.`}</p>
    </div>
  );
};

export default Page;