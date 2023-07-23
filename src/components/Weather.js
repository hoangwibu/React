import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [season, setSeason] = useState('');

  useEffect(() => {
    // Hàm lấy thông tin thời tiết từ API
    const getWeatherData = async () => {
      try {
        // Thay 'YOUR_API_KEY' bằng API key của bạn
        const apiKey = 'e982e58598110a54edcea51da44a4c38';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={LATITUDE}&lon={LONGITUDE}&appid=${apiKey}`);
        const data = await response.json();
        console.log(data);
        // Lấy nhiệt độ hiện tại từ dữ liệu API
        const temp = data.main.temp;

        // Xác định mùa nóng hoặc mùa lạnh dựa trên nhiệt độ
        if (temp >= 25) {
          setSeason('Mùa nóng');
        } else {
          setSeason('Mùa lạnh');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Gọi hàm lấy thông tin thời tiết khi component mount
    getWeatherData();
  }, []);

  return (
    <div>
      <h1>Thời tiết hiện tại:</h1>
      <p>{season}</p>
    </div>
  );
}

export default Weather;
