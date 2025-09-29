'use client';

import { useCallback, useEffect, useState } from "react";
import Question from "./Question";
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import CountdownTimer, { formatTime } from "./Layouts/CountdownTimer";
import Breadcrumbs from "./Dashboard/Breadcrumbs";
import Link from "next/link";
// import slug from "@/system/slug";

const TicketQuestions = ({ title, questions, result }) => {

    // const router = useRouter();
    const { category, number } = useParams();
    const { axios } = useAxios();

    const [show, setShow] = useState(null);
    const [answers, setAnswers] = useState(result?.process || {});
    const [process, setProcess] = useState(result || {});
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [appendQuestions, setAppendQuestions] = useState([]);
    const [expiredAt, setExpiredAt] = useState(null);
    const [ticket, setTicket] = useState(0);

    useEffect(() => {
        setProcess(result);
        if (Boolean(result?.process?.appendQuestions)) {
            setAppendQuestions(result?.process?.appendQuestions);
        }
    }, [result]);

    useEffect(() => {
        if (result?.process) {
            setAnswers(result?.process || {});
        }
    }, [result?.process])

    useEffect(() => {
        if (result?.expiredAt) {
            setExpiredAt(result?.expiredAt);
        }
    }, [result?.expiredAt])

    useEffect(() => {
        number && setTicket(Number(number.replace('bilet-', '')));
    }, [number]);

    const open = useCallback(data => {
        setShow(data);
        // router.push(`?${slug(data.title)}`);
    }, [show, number]);

    const setAnswer = useCallback((id, answer) => {
        setLoading(true);
        axios.post(`pdd/result/set`, { category, number, id, answer })
            .then(({ data }) => {
                if (data?.isSuccess === true || data?.isFailed === true) {
                    setLoading(false);
                    setShow(null);
                    setIsCompleted(true);
                    setProcess(data);
                }
                setExpiredAt(data?.expiredAt || expiredAt);
                if (Boolean(data?.process?.appendQuestions)) {
                    setAppendQuestions(data?.process?.appendQuestions);
                }
            })
            .catch(() => null)
            .then(() => {
                setLoading(false);
                setAnswers(p => ({ ...p, [id]: answer }));
                setShow(null);
                // router.back();
            });
    }, [answers, show, category, number]);

    const resultColor = process?.isSuccess
        ? (process?.questionFailedCount > 0 ? 'text-yellow-500' : 'text-green-500')
        : 'text-red-500';

    const resultMessage = process?.isSuccess
        ? (process?.questionFailedCount > 0 ? 'Тест пройден с ошибками' : 'Тест пройден')
        : 'Тест не пройден';

    return <div className="max-w-5xl mx-auto">

        <div className="mb-7 flex items-center justify-between">
            <h1 className="text-3xl font-extrabold">{title}</h1>
            <div className="font-bold">
                {(expiredAt && (!process?.isSuccess && !process?.isFailed)) && <CountdownTimer
                    targetDate={expiredAt}
                    endTimeMessage="00:00"
                    endTimeHandle={() => {
                        axios.post(`pdd/result/${result?.id}/end-time`)
                            .then(({ data }) => {
                                setLoading(false);
                                setShow(null);
                                setIsCompleted(true);
                                setProcess(data);
                            })
                            .catch(() => null);
                    }}
                />}
            </div>
        </div>

        {isCompleted === true && <>

            <div className="mx-auto py-7">
                <h3 className={`text-center font-black text-5xl mb-2 ${resultColor}`}>{resultMessage}</h3>
                {process.comment && <p className={`text-center ${resultColor}`}>{process.comment}</p>}
                {(process?.isSuccess || process?.isFailed) && Boolean(process?.time) && <p className={`text-center ${resultColor}`}>
                    {formatTime(process?.time)}
                </p>}
            </div>

            <div className="flex flex-wrap gap-1 justify-center mb-5">
                {questions.map((item, key) => <QuestionCard
                    key={key}
                    item={item}
                    open={open}
                    position={key + 1}
                    answers={answers}
                    short={true}
                />)}
                {appendQuestions.length > 0 && appendQuestions.map((item, key) => <QuestionCard
                    key={key + 20}
                    item={item}
                    open={open}
                    position={key + 21}
                    answers={answers}
                    short={true}
                />)}
            </div>

            {(ticket && ticket < 40) && <div className="text-center mt-10">
                <Link
                    href={`/bilety/${category}/bilet-${ticket + 1}`}
                    children={`Следующий билет ${ticket + 1}`}
                    className="text-blue-700 hover:text-blue-900 cursor-pointer"
                />
            </div>}

        </>}

        {isCompleted === false && <>

            {appendQuestions.length === 0 && <div className="grid grid-flow-col grid-rows-5 justify-center gap-1">
                {questions.map((item, key) => <QuestionCard
                    key={key}
                    item={item}
                    open={open}
                    position={key + 1}
                    answers={answers}
                />)}
            </div>}

            {appendQuestions.length > 0 && <>

                <div className="flex flex-wrap gap-1 justify-items-stretch mb-5">
                    {questions.map((item, key) => <QuestionCard
                        key={key}
                        item={item}
                        open={open}
                        position={key + 1}
                        answers={answers}
                        short={true}
                    />)}
                </div>

                <h3 className="mb-5 font-bold">Дополнительные вопросы</h3>

                <div className={`grid grid-flow-col ${appendQuestions.length === 5 ? `grid-rows-2` : `grid-rows-3`} grid-cols-4 justify-center gap-1 mb-1`}>
                    {appendQuestions.map((item, key) => <QuestionCard
                        key={key}
                        item={item}
                        open={open}
                        position={key + 1}
                        answers={answers}
                    />)}
                </div>

            </>}

        </>}

        {show !== null && <Question
            data={show}
            loading={loading}
            answers={answers}
            setAnswer={setAnswer}
            setShow={setShow}
            isCompleted={isCompleted}
        />}

    </div>
}

const QuestionCard = ({ position, item, open, answers, short }) => {

    const isAnswer = answers[item.id];
    const isCorrect = isAnswer
        ? item.answers.find(i => i.answer_text === answers[item.id])?.is_correct
        : null;

    const color = isAnswer ? (isCorrect
        ? `bg-green-100 hover:bg-green-200`
        : `bg-red-100 hover:bg-red-200`
    ) : ``;

    const shortColor = isAnswer ? (isCorrect
        ? `bg-green-100 hover:bg-green-200 border-green-50 text-green-600`
        : `bg-red-100 hover:bg-red-200 border-red-50 text-red-600`
    ) : `bg-gray-100 hover:bg-gray-200 border-gray-50 text-gray-600`;

    if (short) {
        return <div
            title={`Вопрос ${position}`}
            onClick={() => open(item)}
            className={`w-10 h-10 border ${shortColor} cursor-pointer rounded flex justify-center items-center`}
        >{position}</div>
    }

    return <div
        title={item.title}
        onClick={() => open(item)}
        className={`min-w-[250px] rounded flex flex-col justify-${item.image ? `start` : `center`} items-center relative ${isAnswer ? `${color}` : `bg-gray-100 hover:bg-gray-200`} cursor-pointer`}
    >
        <small className="p-[2px] ps-1 absolute rounded opacity-50 left-0 top-0">{position}</small>
        {item.image && <Image image={item.image} />}
        <div className={`px-2 my-2 text-sm text-center ${item.image ? `line-clamp-2` : `line-clamp-4`} overflow-hidden`} title={item.question}>{item.question}</div>
    </div>

}

const Image = ({ image }) => {
    return <div className="px-5 py-2">
        <img src={image} className="w-full rounded max-h-24" />
    </div>
}

export default TicketQuestions;