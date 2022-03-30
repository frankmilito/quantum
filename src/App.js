import {useState, useEffect} from "react"
import CustomSelect from "./components/CustomSelect"
import DetailCard from "./components/DetailCard"
import Header from "./components/Header"
import SummaryCard from "./components/SummaryCard"
function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API
  const [nodata, setNodata] = useState("No data yet")
  const [searchTerm, setSearchTerm] = useState("")
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState("Unknown Location")
  const [states, setStates] = useState([])
  const [countryData, setCountryData] = useState([])
  const [cities, setCities] = useState([])
  const [weatherIcon, setWeatherIcon] = useState(
    `${process.env.REACT_APP_ICON}10n@2x.png`
  )
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    getWeather(searchTerm)
  }
  const handleChange = e => {
    setSearchTerm(e.target.value)
  }
  useEffect(() => {
    getCountries()
  }, [])

  const getWeather = async location => {
    setLoading(true)
    setWeatherData([])

    let searchParams =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location.latitude}&lon=${location.longitude} `

    try {
      let res = await fetch(
        `${
          process.env.REACT_APP_URL + searchParams
        }&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely&`
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
    let {latitude, longitude} = location.coords
    latitude = latitude.toFixed(2)
    longitude = longitude.toFixed(2)
    getWeather({latitude, longitude})
  }

  const getCountries = async () => {
    let res = await fetch(
      "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
    )
    const data = await res.json()
    setCountryData(data)
    const countries = [...new Set(data.map(item => item.country))]
    countries.sort()
    setCountries(countries)
  }

  const handleCountryChange = e => {
    getWeather(e.target.value)
    let states = countryData.filter(
      country => country.country === e.target.value
    )
    states = [...new Set(states.map(item => item.subcountry))]
    states.sort()
    setStates(states)
  }

  const handleStateChange = e => {
    getWeather(e.target.value)
    let cities = countryData.filter(city => city.subcountry === e.target.value)
    cities = cities.map(city => city.name)
    cities.sort()
    setCities(cities)
  }

  const handleCityChange = e => {
    getWeather(e.target.value)
  }

  return (
    <div className="bg-grey-800 flex  items-center w-screen h-screen py-10">
      <div className="md:flex w-3/4  min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3 className="my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 rounded--md bg-white bg-white">
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
              className=" justify-center w-full"
            >
              <div class="w-full  px-3 mb-6 md:mb-2">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-1"
                  for="grid-state"
                >
                  Country
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    onChange={handleCountryChange}
                  >
                    <>
                      <option>Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="w-full  px-3 mb-6 md:mb-1">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="grid-state"
                >
                  States
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    onChange={handleStateChange}
                    disabled={!states.length}
                  >
                    <>
                      <option>Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <CustomSelect
                title="City"
                onChange={handleCityChange}
                disabled={!cities.length}
                data={cities}
              />
              <div class="flex justify-center">
                <div class="mb-3 w-full  px-3 mb-6 md:mb-0">
                  <div class="input-group relative flex flex-wrap items-stretch w-full mb-4 mt-5">
                    <input
                      type="search"
                      className="bg-gray-200 border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none w-5/6"
                      placeholder="Search for location"
                      aria-label="Search"
                      aria-describedby="button-addon3"
                      onChange={handleChange}
                    />
                    <i
                      className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white"
                      aria-hidden="true"
                      onClick={() => {
                        navigator.geolocation.getCurrentPosition(myIP)
                      }}
                    ></i>
                  </div>
                </div>
              </div>
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
