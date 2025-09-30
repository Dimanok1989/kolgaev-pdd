'use client';

import Loader from "@/components/Layouts/Loader";
import TicketQuestions from "@/components/TicketQuestions";
import useAxios from "@/hooks/useAxios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TicketMain() {

    const params = useParams();
    const { axios } = useAxios();

    const [title, setTitle] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const { category, number } = params;
        axios.get(`pdd/${category}/ticket/${number}`)
            .then(({ data }) => {
                setError(null);
                setTitle(data?.title);
                setQuestions(data?.questions || []);
                setResult(data?.result || {});
            })
            .catch(() => {
                setError("Ошибка загрузки билета");
            })
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    return <div>

        {isLoading && <Loader />}
        {error && <div className="text-center my-1 text-red-500 text-lg">{error}</div>}

        <TicketQuestions
            title={title}
            questions={questions}
            result={result}
        />

    </div>

}