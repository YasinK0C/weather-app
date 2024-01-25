import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CityContext } from "../context/cityContext";
function Weather() {
	const { selectedCity } = useContext(CityContext);
	const [coord, setCoord] = useState({});
	const [weeklyWeather, setWeeklyWeather] = useState([]);
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesdey', 'Thursday', 'Friday', 'Saturday'];
	
	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric `
			)
			.then((response) => {
				setCoord(response.data.city.coord);
			})
			.catch((response) => {
				console.log(response.message);
			});
	}, [selectedCity]);
	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&lang=tr&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API_KEY}       `
			)
			.then((response) => {
				setWeeklyWeather(response.data.daily);
				
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [coord]);
	return (
		<div className=" mt-4 weatherList row 	 ">
			{weeklyWeather &&
				weeklyWeather.map((day, index) => {
					const date = new Date(day.dt * 1000);
	const dayName = dayNames[date.getDay()];
					const imgUrl =
						"http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
					return (
						<div className="row weatherCard col-xs-4 col-md-3 col-lg pt-2 px-1 text-center justify-content-center" key={index}>
							<p className="my-0" >{dayName}
									</p>
							<img className="my-0  weatherIcon" src={imgUrl} alt="" />
								
									<p className="" >
									{Math.round(day.temp.max)} / {Math.round(day.temp.min)}

									</p>
							
						</div>
					);
				})}
		</div>
	);
}

export default Weather;
