// header, Info (not process) and search / update button will be there
import React from "react";
import { useTheme } from "../CONTEXT/Theme";
import getLocation from "../FUNCTIONS/locationCalculator";
import { useInfo } from "../CONTEXT/ProcessInfo";
import { useWeather } from "../CONTEXT/Weather";
import getTimeZone from "./../FUNCTIONS/timeZoneCalculator";
import getForecast from "../FUNCTIONS/getWeatherInfo";
import FormattedDate from "../FUNCTIONS/getDate";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { Info, setInfo } = useInfo();
  const { setWeather } = useWeather();

  // THEME OPS
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // WEATHER OPS
  // The process order --> 1) Location info 2) TimeZone info (with both successful data) 3) Weather Info for 10 days
  // Under the lack of location or timezone info, weather could not be calculated. beacuse as payload both info are needed.
  const handleWeather = async () => {
    let MESSAGE = "";
    setWeather({
      forecast: [],
    });

    setInfo((prev) => ({
      ...prev,
      isActive: true,
      message: "Location and Timezone Information Obtaining...",
      processStatus: true,
    }));

    // location information collecting
    const loc = await getLocation();
    if (!loc.status) {
      MESSAGE = `Locationing Failed. System message : ${loc.mes}.`;
      setInfo((prev) => ({
        ...prev,
        processStatus: false,
      }));
    } else {
      MESSAGE += `Locationing Process Completed with ${loc.accuracy > 100 ? 100 : loc.accuracy || 0}% accuracy. \n Current Location: ${loc.region} (${loc.city}) - ${loc.country}  \n`;
      // timezone information collecting
      const time = getTimeZone();
      if (time.tz === "Unknown") {
        MESSAGE = `TimeZone Failed. System message : ${time.mes}.`;
        setInfo((prev) => ({
          ...prev,
          processStatus: false,
        }));
      } else {
        MESSAGE += `Timezone : ${time.tz} \n`;
        const city = {
          city: loc.city,
          region: loc.region,
          lat: loc.latitude,
          lon: loc.longitude,
          t: time.tz,
        };
        const response = await getForecast(city);
        setWeather(response);

        const formattedDate = FormattedDate();

        setInfo((prev) => ({
          ...prev,
          latestUpdate: formattedDate,
        }));
      }
    }

    // End of the process

    setInfo((prev) => ({
      ...prev,
      isActive: true,
      message: MESSAGE,
      processStatus: false,
    }));
  };

  return (
    <div>
      <div className="container my-5">
        {" "}
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <img
            src="/favicon.png"
            className="mt-4 mb-3"
            width={100}
            height={100}
            alt="Cloud Peek logo"
          />
          <h1 className="text-body-emphasis">Cloud Peek</h1>{" "}
          <p className="col-lg-8 mx-auto fs-3 fw-light">
            Provides weather forecasts for the next 10 days based on your
            location. Click the “Update List” button to get started or refresh
            the list.
          </p>{" "}
          <div className="d-inline-flex gap-2 mb-5">
            {" "}
            <button
              className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
              type="button"
              onClick={handleWeather}
            >
              Update List
            </button>{" "}
            <button
              className="btn btn-outline-primary btn-lg px-4 rounded-pill"
              type="button"
              onClick={handleTheme}
            >
              {theme === "dark" ? "Light Theme" : "Dark Theme"}
            </button>{" "}
          </div>{" "}
          {Info.latestUpdate === null ? (
            ""
          ) : (
            <p className="col-lg-8 mx-auto fs-4 fw-light">
              latest Update :{" "}
              <span className="text-primary text-decoration-underline fst-italic">
                {Info.latestUpdate}
              </span>
            </p>
          )}
        </div>{" "}
      </div>
    </div>
  );
}
