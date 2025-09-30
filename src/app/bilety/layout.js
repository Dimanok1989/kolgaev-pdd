import App from "@/components/Dashboard/App";

export const metadata = {};

export default function RootLayout({ children }) {

  metadata.title = "Билеты - ПДД онлайн";
  metadata.description = "Официальные билеты ПДД для подготовки к экзамену в ГИБДД";
  metadata.keywords = "ПДД, ГИБДД, билеты, экзамен, правила дорожного движения";

  return <App>
    {children}
  </App>;
}
