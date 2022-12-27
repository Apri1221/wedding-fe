export default function Cover({ }) {
    return (
        <div className="w-full bg-no-repeat bg-[url('https://miro.medium.com/max/1400/1*iF3Z7iBTB-Lttj0tonlFzw.png')] h-96 lg:h-[36rem] bg-cover bg-top bg-transparent relative">

            <div className="max-w-3xl mx-auto pt-4 sm:pt-10">
                <ul className="flex flex-row items-start justify-center gap-4 sm:gap-10 text-white text-lg sm:text-2xl uppercase">
                    <li>
                        <a href="#story">Our Story</a>
                    </li>
                    <li>
                        <a href="#avenue">The Avenue</a>
                    </li>
                    <li>
                        <a href="#party">The Party</a>
                    </li>
                    <li>
                        <a href="#rsvp">RSVP</a>
                    </li>
                </ul>
            </div>

            <div className="absolute top-3/4 w-full">
                <p className="text-center text-white text-4xl sm:text-7xl font-serif font-bold">
                    Mickey & Minnie
                </p>
                <p className="text-center text-white  text-xl font-mono">
                    1 Dec 2022
                </p>

            </div>

        </div>
    )
}