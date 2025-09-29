const Tickets = async ({ params }) => {

    const { type } = await params;
    const data = await fetch(`http://api.kolgaev.localhost/v1/pdd/${type}/tickets`);
    const { tickets } = await data.json();
    const rows = [tickets]; //Array.from({ length: 4 }, (_, i) => tickets.slice(i * 20, (i + 1) * 20));

    return <div className="p-5 max-w-5xl mx-auto">

        <h2 className="mb-3 text-2xl font-extrabold">Билеты ПДД</h2>

        <div className="flex flex-col justify-center items-center gap-1">
            {rows.map((items, i) => <div className="flex flex-wrap gap-1 justify-items-stretch" key={`row-tickets-${i}`}>
                {items.map((item) => <a href={`${type}/${item.number}`} key={item.number} title={item.title} className="w-10 h-10 border border-gray-100 hover:bg-gray-100 cursor-pointer rounded text-gray-500 flex justify-center items-center">
                    {item.number}
                </a>)}
            </div>
            )}
        </div>

    </div>
}

export default Tickets;