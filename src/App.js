import {useState} from "react"
import DetailCard from "./components/DetailCard"
import Header from "./components/Header"
import SummaryCard from "./components/SummaryCard"
function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API
  const [nodata, setNodata] = useState("No data yet")
  const [searchTerm, setSearchTerm] = useState("")
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState("Unknown Location")
  const [weatherIcon, setWeatherIcon] = useState(
    `${process.env.REACT_APP_ICON}10n@2x.png`
  )
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    getWeather(searchTerm)
  }
  const handleChange = e => {
    setSearchTerm(e.target.value)
  }
  const getWeather = async location => {
    setLoading(true)
    setWeatherData([])

    let searchParams =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}$lon=${location[1]} `

    try {
      let res = await fetch(
        `${
          process.env.REACT_APP_URL + searchParams
        }&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      )
      let data = await res.json()
      console.log(data.cod)
      if (data.cod != 200) {
        setNodata("Location Not found")
        return
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(
        `${process.env.REACT_APP_ICON + data.list[0].weather[0]["icon"]}@4x.png`
      )
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const myIP = location => {
    const {latitude, longitude} = location.coords
    getWeather(latitude, longitude)
  }
  return (
    <div className="bg-grey-800 flex items-center w-screen h-screen py-10">
      <div className="flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3 className="my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 rounded--md bg-white bg-opacity-30">
              Forcast
            </h3>
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
              <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-2xl">Weather Forcast App</h1>
            <hr className="h-1 bg-white w-1 rounded-full my-5" />
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex justify-center w-full"
            >
              <input
                type="text"
                placeholder="Enter location"
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
                onChange={handleChange}
                required
              />
              <button type="submit" className="z-10">
                <i
                  className="fa fa-search text-white -ml-10 border-l my-auto z-10 cursor-pointer p-3"
                  aria-hidden="true"
                  type="submit"
                ></i>
              </button>
              <i
                className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white"
                aria-hidden="true"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(myIP)
                }}
              ></i>
            </form>
          </div>
        </div>
        <div className="w-2/4 p-5">
          {/* <Header /> */}
          {loading ? (
            "Loading..."
          ) : (
            <div className="flex flex-col my-10">
              {weatherData.length === 0 ? (
                <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                  <h1 className="text-grey-300 text-4xl font-bold uppercase">
                    {nodata}
                  </h1>
                </div>
              ) : (
                <>
                  <h1 className="text-5xl text-grey-800 mt-auto mb-4">Today</h1>
                  <DetailCard weather_icon={weatherIcon} data={weatherData} />
                  <h1 className="text-3xl text-grey-600 mb-4 mt-10">
                    More on {city}
                  </h1>
                  <ul className="grid grid-cols-2 gap-2">
                    {weatherData.list.map((days, index) => {
                      if (index > 0) {
                        return <SummaryCard key={index} day={days} />
                      }
                    })}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
