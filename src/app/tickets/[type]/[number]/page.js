'use client';

import TicketQuestions from "@/components/TicketQuestions";
import useAxios from "@/hooks/useAxios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Ticket = () => {

    const params = useParams();
    const { axios } = useAxios();

    const [title, setTitle] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const { type, number } = params;
        axios.get(`pdd/${type}/ticket/${number}`)
            .then(({ data }) => {
                setTitle(data?.title);
                setQuestions(data?.questions || []);
            });
    }, []);

    // const { type, number } = await params;
    // const data = await fetch(`http://api.kolgaev.localhost/v1/pdd/${type}/ticket/${number}`);
    // const { title, questions } = await data.json();

    return <TicketQuestions
        title={title}
        questions={questions}
    />
}

export default Ticket;