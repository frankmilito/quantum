import moment from "moment"

const SummaryCard = ({day}) => {
  let day_icon = `${process.env.REACT_APP_ICON + day.weather[0]["icon"]}@2x.png`
  return (
    <ul className="container p-4 flex items-center bg-grey-200 rounded-lg my auto mr-1">
      <div className="my-auto">
        <p className="font-bold text-3xl text-pink-600 mb-2">
          {Math.round(day.main.temp)}&deg;C
        </p>
        <p className="text-2xl text-grey-800 tracking-widest">
          {day.weather[0].main}
          <img src={day_icon} alt="icon" className="w-1/4 inline" />
        </p>
        <p className="text-grey-400 text-xs tracking-widest">
          {day.weather[0].description}
        </p>
        <p className="tracking-wider">
          {moment(day.dt_txt).format("dddd hh:mm")}
        </p>
      </div>
    </ul>
  )
}

export default SummaryCard
