import Link from "next/link";

const Breadcrumbs = ({ links }) => {

    const elements = [];

    links.forEach((i, k) => {
        elements.push(i);
        if (k < (links.length - 1)) {
            elements.push({ title: "›" });
        }
    });

    return <div className="flex gap-3 mb-3">
        {elements.map((l, k) => Boolean(l?.to)
            ? <Link
                key={k}
                href={l.to}
                className="text-blue-700 hover:text-blue-900 cursor-pointer"
            >
                {l.title}
            </Link>
            : <span key={k} className="cursor-default">{l.title}</span>
        )}
    </div>
}

export default Breadcrumbs;