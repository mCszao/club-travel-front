import { CardImage } from './styles';

interface CardNewsProps {
    url: string;
    title: string;
    description: string;
}
export const CardNews = ({ url, title, description }: CardNewsProps) => {
    return (
        <div className='grid grid-cols-2 items-center gap-11 border  rounded-lg p-5 w-full shadow-2xl bg-white hover:shadow-blue-400 '>
            <div className='flex flex-col gap-5'>
                <h2 className='text-1xl font-bold tracking-tight text-gray-900 sm:text-2xl'>
                    {title}
                </h2>
                <hr />
                <p>{description || 'lorem ipsum'}</p>
                <button className='rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '>
                    Ler mais
                </button>
            </div>
            <CardImage src={url} alt={title} />
        </div>
    );
};
