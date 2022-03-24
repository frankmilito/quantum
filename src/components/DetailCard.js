import moment from 'moment'

const DetailCard = ({weather_icon, data}) => {
    const {clouds, main, weather}
  return (
    <div className='container p-4 flex items-center shadow-lg rounded-lg bg-white h-1/3 mb-auto'>
        <div className="my-auto">
            <p className="font-bold text-5xl text-pink-800 mb-2">
                {Math.rounded(main.temp)}&deg;C
            </p>
            <p className="text-4xl text-grey-800 tracking-widest">
                {weather[0].main}
                <img src={weather_icon} alt="weathericon" className="w-1/4 inline" />
            </p>
            <p className="text-grey-400 text-xs uppercase tracking-widest">
                {weather[0].description}
            </p>
            <p className="tracking-wider">{moment().format("dddd MMM YYYY")}</p>

        </div>
        <div className="my-2 border-1-2 border-gray-100 p-2">
            <p className="text-gray-400 text-lg">RealFeel: {Math.round(main.feel_like)}&deg;C</p>
            <p className="text-gray-400 text-lg">Humidiy: {main.humidity}%</p>
            <p className="text-gray-400 text-lg">Cloud Cover: {clouds.all}%</p>
            <p className="text-gray-400 text-lg">Min Temp: {Math.round(main.temp_min)}&deg;C</p>
            <p className="text-gray-400 text-lg">Max Temp: {Math.round(main.temp_max)}&deg;C</p>
        </div>
    </div>
  )
}

export default DetailCard