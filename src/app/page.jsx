import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'ПДД онлайн',
}

export default function Home() {

  metadata.title = "ПДД онлайн";
  metadata.description = "Официальные билеты ПДД для подготовки к экзамену в ГИБДД";
  metadata.keywords = "ПДД, ГИБДД, билеты, экзамен, правила дорожного движения";

  return <div className="mx-auto bg-linear-to-b from-gray-50 to-blue-50 min-h-screen flex flex-col gap-20">

    <div className="text-black p-10 flex justify-between items-center gap-5 mx-auto max-w-3xl w-full">

      <div>
        <h1 className="text-7xl bg-linear-to-r from-red-500 to-fuchsia-600 bg-clip-text font-extrabold text-transparent py-4">ПДД <br />ОНЛАЙН</h1>
        <span className="font-black opacity-50">Как в ГИБДД</span>
      </div>

      <div className="py-4">
        <Image
          src="/images/17592572642.png"
          alt="Next.js logo"
          width={200}
          height={200}
        />
      </div>

    </div>

    <div className="mx-auto bg-amber-100 rounded-2xl p-5 pt-15 max-w-4xl w-full">

      <h2 className="text-center text-4xl font-extrabold bg-linear-to-r from-yellow-300 to-red-600 bg-clip-text text-transparent">Тренировка</h2>
      <div className="font-black text-sm text-center opacity-50 my-7 mx-15">Знание — это ваши водительские права к успеху. Проверьте и закрепите их здесь. Решайте билеты ПДД, чтобы на экзамене в ГАИ чувствовать себя так же спокойно, как за рулем в ясный день.</div>

      <Link
        href={`/bilety`}
        className="px-6 py-4 mx-auto block bg-linear-to-tl from-amber-400 hover:from-red-600 to-red-600 hover:to-amber-400 max-w-[250px] text-center cursor-pointer rounded-xl text-white font-black"
        children="Начать тренировку"
      />
    </div>

  </div>
}

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
