// header, Info (not process) and search / update button will be there
import React from "react";
import { useTheme } from "../CONTEXT/Theme";
import getLocation from "../FUNCTIONS/locationCalculator";
import { useInfo } from "../CONTEXT/ProcessInfo";
import { useWeather } from "../CONTEXT/Weather";
import getTimeZone from "./../FUNCTIONS/timeZoneCalculator";
import getForecast from "../FUNCTIONS/getWeatherInfo";

/* EKLENTILER
1) En güncel data ve çekilme tarihi neyse onu localStorafe içinde tut ve ekranda belirt
4) Tüm dosyaların içine docstringleri ve açıklamaları ekle YADA gelen her mesaj birbirini ezsin.
hangisi daha iyi oluyorsa öyle yap.
6) Her işleme başladığında weather bilgisini boşalt ki sayfada eski veriler gözükmesin
*/

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { Info, setInfo } = useInfo();
  const { setWeather } = useWeather();

  // THEME OPS
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // WEATHER OPS
  const handleWeather = async () => {
    let MESSAGE = "";
    setWeather({
      forecast: [],
    });

    setInfo({
      isActive: true,
      message: "Location and Timezone Information Obtaining...",
      processStatus: true,
    });

    // location information collecting
    const loc = await getLocation();
    if (!loc.status) {
      MESSAGE = `Locationing Failed. System message : ${loc.mes}.`;
      setInfo({
        processStatus: false,
      });
    } else {
      MESSAGE += `Locationing Process Completed with ${loc.accuracy > 100 ? 100 : loc.accuracy || 0}% accuracy. \n Current Location: ${loc.region} (${loc.city}) - ${loc.country}  \n`;
      // timezone information collecting
      const time = getTimeZone();
      if (time.tz === "Unknown") {
        MESSAGE = `TimeZone Failed. System message : ${time.mes}.`;
        setInfo({
          processStatus: false,
        });
      } else {
        MESSAGE += `Timezone : ${time.tz} \n`;
        const city = {
          city: loc.city,
          region: loc.region,
          lat: loc.latitude,
          lon: loc.longitude,
          t: time.tz,
        };
        console.log(city);
        const response = await getForecast(city);
        console.log(response);
        setWeather(response);
      }
    }

    // End of the process
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();

    setInfo({
      isActive: true,
      message: MESSAGE,
      processStatus: false,
      latestUpdate: `${year}-${month}-${day} ${hour}:${minute}`,
    });
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
