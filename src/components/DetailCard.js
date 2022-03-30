import moment from "moment"
import {useState} from "react"
const DetailCard = ({weather_icon, data}) => {
  const [celsius, setCelsius] = useState(true)

  const {clouds, main, weather} = data.list[0]
  const convertTemp = temp => {
    let farhenheight = Math.round((temp * 9) / 5 + 32) + "F"
    let celsiusTemp = <span>{Math.round(temp)}&deg;C</span>
    return celsius ? celsiusTemp : farhenheight
  }

  return (
    <div className="container p-4 flex items-center shadow-lg rounded-lg bg-white h-1/3 mb-auto">
      <div className="my-auto">
        <button
          onClick={() => setCelsius(!celsius)}
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded mb-2"
        >
          Show {celsius ? "Fahrenheit" : "Celsius"}
        </button>
        <p className="font-bold text-5xl text-pink-800 mb-2 cursor-pointer">
          {convertTemp(main.temp)}
        </p>
        <p className="text-4xl text-grey-800 tracking-widest">
          {weather[0]?.main}
          <img src={weather_icon} alt="weathericon" className="w-1/4 inline" />
        </p>
        <p className="text-grey-400 text-xs uppercase tracking-widest">
          {weather[0]?.description}
        </p>
        <p className="tracking-wider">{moment().format("dddd MMM YYYY")}</p>
      </div>
      <div className="my-2 border-1-2 border-gray-100 p-2">
        <p className="text-gray-400 text-lg">
          RealFeel: {convertTemp(main.feels_like)}
        </p>
        <p className="text-gray-400 text-lg">Humidity: {main?.humidity}%</p>
        <p className="text-gray-400 text-lg">Cloud Cover: {clouds.all}%</p>
        <p className="text-gray-400 text-lg">
          Min Temp: {convertTemp(main.temp_min)}
        </p>
        <p className="text-gray-400 text-lg">
          Max Temp: {convertTemp(main.temp_max)}
        </p>
      </div>
    </div>
  )
}

export default DetailCard
