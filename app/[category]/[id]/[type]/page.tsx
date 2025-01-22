import { FC } from 'react';

interface Params {
  category: string;
  id: string;
  type?: string;
}

const Page: FC<{ params: Params }> = async ({ params }) => {
  const { category, id, type } = await params;

  return (
    <div>
      <h1>{`Category: ${category}, ID: ${id}${type ? `, Type: ${type}` : ''}`}</h1>
      <p>{type ? `This is the page for category ${category}, ID ${id}, and type ${type}.` : `This is the default page for category ${category}, ID ${id}.`}</p>
    </div>
  );
};

export default Page;
