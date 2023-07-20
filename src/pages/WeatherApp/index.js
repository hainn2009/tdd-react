// import { getTodos } from "../../api/todo";
// import { useLoaderData } from "react-router-dom";
// import TodoList from "./TodoList";
import { useState } from "react";
import "./index.css";

export function loader() {
    // return getTodos();
    // return [
    //   { id: 1, name: "Tập thể dục" },
    //   { id: 2, name: "Học lập trình" },
    // ];
}

const WeatherApp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState("hanoi");
    const [weatherIcon, setWeatherIcon] = useState("c03d");
    const [currentTemperature, setCurrentTemperature] = useState();
    const [currentDesc, setcurrentDesc] = useState();
    const [currentWind, setcurrentWind] = useState();
    const [currentPressure, setcurrentPressure] = useState();
    const [currentHumidity, setcurrentHumidity] = useState();
    const [forecast, setForeCast] = useState();

    return (
        <div style={{ backgroundColor: "black" }}>
            <h1 class="f med">Weather App</h1>
            <div class="weather-pillars pillars">
                <div class="f med" id="queryLocation">
                    Enter a location
                </div>

                <div class="f smst">
                    Location <br />
                    <div class="search">
                        <div id="searchForm">
                            <span class="fas fa-search-location"></span>
                            <input type="text" className="f" value={location} onChange={(e) => setLocation(e.target.value)} />
                            <button
                                className="f smst"
                                onClick={async () => {
                                    setIsLoading(true);
                                    const response = await fetch(`http://localhost:5000/weather/${location}`);
                                    const data = (await response.json()).data;
                                    setWeatherIcon(data.icon);
                                    setCurrentTemperature(data.temperature);
                                    setcurrentDesc(data.description);
                                    setcurrentWind(data.wind);
                                    setcurrentPressure(data.pressure);
                                    setcurrentHumidity(data.humidity);
                                    setForeCast(data.forecast);
                                    // setIsLoading(false);
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <h1 id="indicator">
                    {/* <i class="fas fa-redo fa-5x fa-spin lgst"></i> */}
                    Loading...
                </h1>
            ) : (
                // <span style={{ color: "white" }}>test</span>
                <div class="weather-pillars pillars">
                    <div class="box">
                        <img src={`./img/wicons/${weatherIcon}.png`} alt="" id="currentWeatherIcon" class="weather-icon" />
                        <div class="f lgst pl-20">{currentTemperature}&deg;C</div>
                    </div>
                    <div class="f sm">{currentDesc}</div>
                    <div class="box">
                        <div class="f smst c stack weath-sec">
                            <div>Humidity</div>
                            <div>
                                <img src="./img/wicons/humidity-svg.svg" alt="" class="filter-blue we-svg" />{" "}
                            </div>
                            <div>{currentHumidity}</div>
                        </div>

                        <div class="f smst c stack weath-sec">
                            <div>Wind</div>
                            <div>
                                {" "}
                                <img src="./img/wicons/wind-svg.svg" alt="" class="filter-blue we-svg" />{" "}
                            </div>
                            <div>{currentWind}</div>
                        </div>

                        <div class="f smst c stack weath-sec">
                            <div>Pressure</div>
                            <div>
                                <img src="./img/wicons/gauge-pressure-svg.svg" alt="" class="filter-blue we-svg" />{" "}
                            </div>
                            <div>{currentPressure}</div>
                        </div>
                    </div>
                </div>
            )}

            <div id="forecastSummary" class="forecast">
                {forecast &&
                    forecast.map((f) => {
                        const elm = (
                            <div class="stack c">
                                <div class="f sm">{f.day}</div>
                                <div class="f sm">
                                    {f.month} {f.date}
                                </div>
                                <div>
                                    <img src={`./img/wicons/${f.icon}.png`} class="weather-icon-sm" alt="forecast" />
                                </div>
                                <div class="f sm">
                                    {f.lo} <sup>&deg;</sup>
                                </div>
                                <div class="f sm">
                                    {f.hi} <sup>&deg;</sup>
                                </div>
                            </div>
                        );

                        return elm;
                    })}
            </div>
        </div>
    );
};

export default WeatherApp;
