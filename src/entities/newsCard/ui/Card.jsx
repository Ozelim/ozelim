import dayjs from "dayjs"
import { AiFillCalendar } from "react-icons/ai"
import { getImageUrl } from "shared/lib"

export const Card = ({news}) => {
  return (
    <div className="bg-white shadow rounded-primary max-w-2xl w-full mx-auto">
      <div className="p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getImageUrl(news, news?.avatar) ? (
              <img
                className="w-14 h-14 bg-slate-300 rounded-full object-cover"
                src={getImageUrl(news, news?.avatar)}
                loading="lazy"
                alt="travel"
              />
            ) : (
              <div className="w-14 h-14 bg-slate-300 rounded-full object-cover" />
            )}
            <span className="ml-4 text-lg">{news?.name}</span>
          </div>
          <div className="flex">
            <AiFillCalendar fill="teal" size={20} />
            <span className="ml-1 text-slate-600 whitespace-nowrap">
              {dayjs(news?.created).format('YY/MM/DD, HH:mm')}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <h1 className="font-head font-bold my-4 text-4xl">{news?.title}</h1>
        </div>
        {getImageUrl(news, news?.image) ? (
          <img
            className="w-full  object-cover aspect-video"
            src={getImageUrl(news, news?.image)}
            loading="lazy"
            alt="travel"
          />
        ) : (
          <div className="w-full max-h-[400px] bg-slate-300" />
        )}
        <p className="flex-grow font-body my-4 text">{news?.description}</p>

        <div className="flex justify-between">
          <a
            href={news?.link}
            target="_blank"
            className="text-zinc-400 text-sm underline"
          >
            {news?.link}
          </a>
          <p className="text-zinc-400 text-sm uppercase">OZ-ELIM.kz</p>
        </div>

      </div>
    </div>
  )
}
