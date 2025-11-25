const API_KEY = `1d11d7dc8de713b488d778101692c023`;

export const getWeatherData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}