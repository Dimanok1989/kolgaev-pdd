'use client';

import { useCallback, useState } from "react";

const Question = ({ data, answers, setAnswer, setShow, loading, isCompleted }) => {

    const [selected, setSelected] = useState(null);
    const answer = answers[data?.id];

    const select = useCallback((key, answer) => {
        if (key === selected) {
            setAnswer(data.id, answer);
        }
        setSelected(key);
    }, [setAnswer, selected]);

    const colors = {
        empty: 'bg-gray-200 border-gray-100',
        select: 'bg-amber-200 border-amber-100 text-amber-900',
        correct: 'bg-green-200 border-green-100 text-green-900',
        incorrect: 'bg-red-200 border-red-100 text-red-900',
    };

    return <>

        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
            onClick={() => (Boolean(answer) || isCompleted === true) && setShow(null)}
        />

        <div
            className="fixed left-4 right-4 top-4 mx-auto z-50 flex justify-center"
            onClick={() => (Boolean(answer) || isCompleted === true) && setShow(null)}
        >

            <div className="mx-auto p-5 bg-white rounded-2xl shadow cursor-default">

                {data.image && <div className="mb-10">
                    <img src={data.image} className="mx-auto rounded-md h-80" />
                </div>}

                {!data.image && <div className="bg-gray-400 max-w-[600px] mx-auto h-[250px] mb-10 rounded" />}

                <p className="text-xl mx-auto mb-6 max-w-3xl">{data.question}</p>

                <div className="max-w-3xl mx-auto flex flex-col gap-2 bg-white">

                    {(Boolean(answer) || isCompleted === true) && <>
                        {(data.answers || []).map((item, i) => <div
                            key={`answer-${i}`}
                            className={`relative border cursor-default rounded px-3 py-2 ${answer === item.answer_text ? (item.is_correct ? colors.correct : colors.incorrect) : (item.is_correct ? colors.correct : colors.empty)}`}
                        >
                            <span>{item.answer_text}</span>
                        </div>)}
                    </>}

                    {(!Boolean(answer) && isCompleted === false) && <>
                        {(data.answers || []).map((item, i) => <div
                            key={`answer-${i}`}
                            className={`relative border border-gray-100 rounded ${loading ? `cursor-progress` : `cursor-pointer`} px-3 py-2 ${i === selected ? `bg-amber-100 ${loading ? `` : `hover:bg-amber-200`} text-amber-900` : `hover:bg-gray-200`}`}
                            onClick={() => select(i, item.answer_text)}
                        >
                            <span>{item.answer_text}</span>
                            {(i === selected && loading) && <div className="absolute inset-0 bg-amber-100/80">

                            </div>}
                            {/* {i === selected && <small className="ms-2 text-yellow-100 text-xs px-2 py-[2px] rounded bg-amber-600">Вы уверены?</small>} */}
                        </div>)}
                    </>}
                </div>

            </div>

        </div>

    </>
}

export default Question;