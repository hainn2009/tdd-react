// import { getTodos } from "../../api/todo";
// import { useLoaderData } from "react-router-dom";
// import TodoList from "./TodoList";
import { useState } from "react";
import "./index.css";

const WeatherApp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState("hanoi");
    const [weatherIcon, setWeatherIcon] = useState("c03d");
    const [currentTemperature, setCurrentTemperature] = useState();
    const [currentDesc, setcurrentDesc] = useState();
    const [currentWind, setcurrentWind] = useState();
    const [currentPressure, setcurrentPressure] = useState();
    const [currentHumidity, setcurrentHumidity] = useState();
    const [forecast, setForeCast] = useState<{ day: string; date: string; month: string; lo: string; hi: string; icon: string }[]>([]);

    return (
        <div className="text-light bg-dark">
            <h1 className="f med">Weather App</h1>
            <div className="weather-pillars pillars d-flex flex-column flex-wrap">
                <h1>Enter a location</h1>
                <div className="f smst">
                    Location <br />
                    <div className="search">
                        <div id="searchForm">
                            <span className="fas fa-search-location"></span>
                            <input type="text" className="f" value={location} onChange={(e) => setLocation(e.target.value)} />
                            <span
                                style={{ cursor: "pointer" }}
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
                                    setIsLoading(false);
                                }}
                            >
                                Search
                            </span>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <h1>
                        <i className="fas fa-redo fa-5x fa-spin"></i>
                        Loading...
                    </h1>
                ) : (
                    <div>
                        <div className="box">
                            <img src={`./img/wicons/${weatherIcon}.png`} alt="" id="currentWeatherIcon" />
                            <div className="f lgst">{currentTemperature}&deg;C</div>
                        </div>
                        <div className="f sm">{currentDesc}</div>
                        <div className="box">
                            <div className="f smst c stack weath-sec">
                                <div>Humidity</div>
                                <div>
                                    <img src="./img/wicons/humidity-svg.svg" alt="" className="filter-blue we-svg" />{" "}
                                </div>
                                <div>{currentHumidity}</div>
                            </div>

                            <div className="f smst c stack weath-sec">
                                <div>Wind</div>
                                <div>
                                    {" "}
                                    <img src="./img/wicons/wind-svg.svg" alt="" className="filter-blue we-svg" />{" "}
                                </div>
                                <div>{currentWind}</div>
                            </div>

                            <div className="f smst c stack weath-sec">
                                <div>Pressure</div>
                                <div>
                                    <img src="./img/wicons/gauge-pressure-svg.svg" alt="" className="filter-blue we-svg" />{" "}
                                </div>
                                <div>{currentPressure}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div id="forecastSummary" className="forecast">
                {forecast &&
                    forecast.map((f) => {
                        const elm = (
                            <div className="stack c">
                                <div className="f sm">{f.day}</div>
                                <div className="f sm">
                                    {f.month} {f.date}
                                </div>
                                <div>
                                    <img src={`./img/wicons/${f.icon}.png`} className="weather-icon-sm" alt="forecast" />
                                </div>
                                <div className="f sm">
                                    {f.lo} <sup>&deg;</sup>
                                </div>
                                <div className="f sm">
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
