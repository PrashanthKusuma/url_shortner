import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Redirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with the actual path to your urls.json file
        const response = await axios.get(
          "https://5f57e55439.execute-api.ap-south-1.amazonaws.com/dev/urls"
        );
        const data = response.data;
        console.log(data);
        const obj = data.find((e) => `/${e.short_url}` === location.pathname);

        if (obj !== undefined) {
          window.location.href = obj.original_url;
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching data or redirecting:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.pathname, navigate]);

  return (
    <div>
      <h1>Redirect</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Current path: {location.pathname}</p>
          {/* Additional content if needed */}
        </>
      )}
    </div>
  );
};

export default Redirect;
