import { useWeather } from "../CONTEXT/Weather";

export default function Cards() {
  const { weather } = useWeather();
  const forecast = weather?.forecast ?? [];

  if (!forecast.length) {
    return null;
  }

  return (
    <div className="container mb-5 w-50">
      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-4">
        {forecast.map((day) => (
          <div className="col" key={day.date}>
            <div className="card h-100 shadow-sm">
              <img
                src={day.imageUrl}
                alt={day.description}
                className="card-img-top"
                height="225"
                style={{ objectFit: "cover" }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="card-title mb-1">{day.dayName}</h5>
                    <small className="text-body-secondary">{day.date}</small>
                  </div>
                  <span className="fs-4" aria-hidden="true">
                    {day.icon}
                  </span>
                </div>

                <p className="card-text mb-2">{day.description}</p>
                <p className="card-text mb-1">Max: {day.maxTemp ?? "-"} C</p>
                <p className="card-text mb-1">Min: {day.minTemp ?? "-"} C</p>
                <p className="card-text mb-0">
                  Rain: {day.precipitationProbability ?? 0}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
