import React, { useContext } from "react";
import { CityContext } from "../context/cityContext";
function SelectCity({ cities }) {
	const city = useContext(CityContext);
	function renderDropDown() {
		return cities.map((city) => {
			if (city.city === "Ankara") {
				return (
					<option  selected key={city.count} value={city.city}>
						{city.city}
					</option>
				);
			} else {
				return (
					<option  key={city.count} value={city.city}>
						{city.city}
					</option>
				);
			}
		});
	}
	return (
		<select
			onChange={() => {
				city.setSelectedCity(document.getElementById("cities").value);
			}}
			name="Cities"
			id="cities"
			className="form-select form-select-lg mb-3  "
		>
			{renderDropDown()}
		</select>
	);
}

export default SelectCity;
