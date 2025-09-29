'use client';

import Loader from "@/components/Layouts/Loader";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Tickets = () => {

    const { axios } = useAxios();

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        axios.get(`pdd/tickets`)
            .then(response => {
                setData(response.data);
                setError(null);
            })
            .catch(e => {
                setError("Ошибка загрузки билетов");
            })
            .then(() => {
                setIsLoading(false);
            });

    }, []);

    return <div>

        <h1 className="mb-3 text-3xl font-extrabold">Билеты ПДД</h1>

        <p className="mb-8">Готовьтесь к экзамену в ГИБДД без стресса. Решайте билеты по ПДД в том же формате, что и на реальном тестировании. Это поможет вам привыкнуть к временным ограничениям и научиться избегать случайных ошибок.</p>

        {isLoading && <Loader />}
        {error && <div className="text-center my-1 text-red-500 text-lg">{error}</div>}

        <div className="flex flex-col gap-6">

            {(data?.categories || []).map(category => <div key={category.category}>

                <h2 className="mb-3 text-2xl font-extrabold">{category.title}</h2>

                <div className="flex flex-wrap gap-1 justify-items-stretch">
                    {(category.tickets || []).map((item) => <LinkItem
                        category={category}
                        item={item}
                        key={item.number}
                        result={data?.result?.results[category.category] && data?.result?.results[category.category][item.number]}
                    />)}
                </div>

            </div>)}

        </div>
    </div>
}

const LinkItem = ({ category, item, result }) => {

    const resultColor = result?.isSuccess
        ? (result?.questionFailedCount > 0
            ? 'text-yellow-600 border-yellow-100 bg-yellow-100 hover:bg-yellow-200'
            : 'text-green-600 border-green-100 bg-green-100 hover:bg-green-200'
        )
        : (result?.isFailed
            ? 'text-red-600 border-red-100 bg-red-100 hover:bg-red-200'
            : 'text-gray-500 border-gray-100 hover:bg-gray-100'
        );

    return <Link
        href={`bilety/${category.category}/${item.slug}`}
        title={item.title}
        className={`w-10 h-10 border ${resultColor} cursor-pointer rounded flex justify-center items-center`}
        children={item.number}
    />
}

export default Tickets;