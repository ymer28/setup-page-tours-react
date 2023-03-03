import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';
// const urle = 'https://course-api.netlify.app/api/react-tours-project';
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }
  const fetchTours = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url);
      const tours = await response.json();
      console.log("tours", tours);
       setIsLoading(false);
      setTours(tours);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  useEffect(() => {
    fetchTours();
  }, []);
  if (isLoading) {
    return (
      <main>
        <Loading/>
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h4>No tours</h4>
          <button type='button' className='btn' onClick={() => fetchTours()}>
            Refresh
        </button>
      </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App
