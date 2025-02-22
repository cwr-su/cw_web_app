import { UAParser } from 'ua-parser-js';

export async function getUserDetails(req) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("cf-connecting-ip") || "Unknown";

    const userAgent = req.headers.get("user-agent");
    const parser = new UAParser(userAgent);
    const browserInfo = `${parser.getBrowser().name} ${parser.getBrowser().version}`;
    const os = `${parser.getOS().name} ${parser.getOS().version}`;

    const geoResponse = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
    const geoData = await geoResponse.json();

    let location = "Local | Unfindable";
    if (geoData.geoplugin_status !== 404) {
        location = `${geoData.geoplugin_continentName}: ${geoData.geoplugin_countryName}, ${geoData.geoplugin_region}, ${geoData.geoplugin_city}`;
    }

    const date = new Date().toLocaleDateString("ru-RU");
    const time = new Date().toLocaleTimeString("ru-RU");

    return JSON.stringify({
        ip,
        browser: browserInfo,
        location,
        date,
        time,
        os,
    });
}
