import './App.css';
import { useState } from 'react';

function App() {
  let [city, setCity] = useState("");
  let [wDetails, setWdetails] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  let getData = (event) => {
    event.preventDefault();

    if (!city) return;

    setLoading(true);
    setError("");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod == "404") {
          setWdetails(null);
          setError("City not found ❌");
        } else {
          setWdetails(finalRes);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong ⚠️");
        setLoading(false);
      });

    setCity('');
  };

  return (
    <div className='w-[100%] h-[100vh] bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-600 flex items-center justify-center'>
      
      <div className='w-[90%] max-w-[400px] text-center'>
        <h1 className='text-[35px] font-bold mb-6 text-white'>🌤️ Weather App</h1>

        {/* Search */}
        <form onSubmit={getData} className='flex gap-2 justify-center mb-4'>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Enter City Name'
            className='w-full h-[45px] px-3 rounded-lg outline-none'
          />
          <button className='bg-orange-500 px-4 rounded-lg text-white font-bold hover:bg-orange-600'>
            Search
          </button>
        </form>

        {/* Card */}
        <div className='p-6 rounded-2xl bg-white/20 backdrop-blur-lg shadow-xl text-white relative min-h-[250px]'>

          {/* Loader */}
          {loading && (
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif'
              width={70}
              className='absolute top-[40%] left-[50%] translate-x-[-50%]'
              alt='loading'
            />
          )}

          {/* Error */}
          {error && !loading && (
            <p className='text-red-200 font-semibold'>{error}</p>
          )}

          {/* Weather Data */}
          {wDetails && !loading && (
            <>
              <h3 className='text-[28px] font-bold'>
                {wDetails.name}{" "}
                <span className='bg-yellow-300 text-black px-2 rounded'>
                  {wDetails.sys.country}
                </span>
              </h3>

              <h2 className='text-[45px] font-bold mt-2'>
                {wDetails.main.temp}°C
              </h2>

              <div className='text-center'>
                <img
                  src={`https://openweathermap.org/img/wn/${wDetails.weather[0].icon}@2x.png`}
                  alt='weather icon'
                  className='mx-auto'
                />
                <p className='capitalize text-lg'>
                  {wDetails.weather[0].description}
                </p>
              </div>

              {/* Extra Info */}
              <div className='flex justify-between mt-4 text-sm'>
                <p>💧 {wDetails.main.humidity}%</p>
                <p>🌬️ {wDetails.wind.speed} km/h</p>
              </div>
            </>
          )}

          {/* Default */}
          {!wDetails && !loading && !error && (
            <p className='text-white/80'>Search a city to see weather 🌍</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;