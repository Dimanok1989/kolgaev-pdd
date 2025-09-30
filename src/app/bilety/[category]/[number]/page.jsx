import Breadcrumbs from "@/components/Dashboard/Breadcrumbs";
import TicketMain from "@/components/tickets/TicketMain";

export const metadata = {};

export default async function Ticket({ params }) {

    const { number } = await params;
    metadata.title = `Билет ${String(number).replace('bilet-', '')} - ПДД Онлайн`;
    metadata.description = `Решите экзаменационный билет ${String(number).replace('bilet-', '')} как в ГИБДД`;

    return <div>

        <Breadcrumbs
            links={[
                { to: "/", title: "Пдд онлайн" },
                { to: "/bilety", title: "Билеты" },
            ]}
        />

        <TicketMain />

    </div>
}