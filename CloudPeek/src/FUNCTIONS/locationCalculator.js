const getLocation = async () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        try {
          const params = new URLSearchParams({
            lat: String(latitude),
            lon: String(longitude),
            format: "jsonv2",
            "accept-language": "tr",
          });

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
            {
              headers: {
                Accept: "application/json",
              },
            },
          );

          if (!response.ok) {
            resolve({
              latitude,
              longitude,
              accuracy,
              city: "Unknown",
              region: "Unknown",
              status: true,
              mes: "Location obtained, but city/region could not be resolved",
            });
            return;
          }

          const data = await response.json();
          const address = data.address || {};

          resolve({
            latitude,
            longitude,
            accuracy,
            city:
              address.city ||
              address.town ||
              address.village ||
              address.municipality ||
              "Unknown",
            region:
              address.state || address.province || address.region || "Unknown",
            country: address.country || "Unknown",
            status: true,
            mes: "Location Successfully Obtained",
          });
        } catch (error) {
          resolve({
            latitude,
            longitude,
            accuracy,
            city: "Unknown",
            region: "Unknown",
            country: "Unknown",
            status: true,
            mes: `Location obtained, but reverse geocoding failed: ${error.message}`,
          });
        }
      },
      (err) => {
        let message = "";

        if (err.code === err.PERMISSION_DENIED) {
          message = "Location Permission Denied";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = "Location Information UNAVAILABLE";
        } else if (err.code === err.TIMEOUT) {
          message = "Location Process Timeout";
        }

        resolve({ status: false, mes: message });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
};

export default getLocation;
