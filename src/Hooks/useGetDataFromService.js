import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useGetDataFromService(service) {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      setController(abourtController);
      setLoading(true);

      const data = await service();
      setData(data);

      setLoading(false);
    } catch (err) {
      if (error.name === "AbortError") {
        console.log("Request Cancelled");
      }
      setError("Somethinq is wrong: ", err);
      navigate("/");
    }
  }, []);

  return { data, loading, error };
}

export { useGetDataFromService };
