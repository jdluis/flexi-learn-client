import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error(error.response.data.errorMessage);
      }
      setError("Somethinq is wrong: ", error);
      navigate("/");
    }
  }, []);

  return { data, loading, error };
}

export { useGetDataFromService };
