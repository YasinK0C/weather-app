import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SelectCity from "./components/selectCity";
import { CityContextProvider } from "./context/cityContext";
import Weather from "./components/weather";
function App() {
	const [cities, setCities] = useState([]);
	useEffect(() => {
		axios
			.get(
				"https://api.openaq.org/v2/cities?limit=100&page=1&offset=0&sort=asc&country=tr&order_by=city"
			)
			.then((response) => {
				setCities(response.data.results);
			});
	}, []);
	return (
		<CityContextProvider>
			<>
			<header className="pt-5 ps-5  ">
				<h1 className="display   " >How is the weather today..?</h1>
			</header>
			
			<section className="App container  ">
				
				<SelectCity cities={cities} />
				<Weather></Weather>
			</section>
			</>
			
		</CityContextProvider>
	);
}

export default App;
