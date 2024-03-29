import axios from "axios";

// servicio donde se haran todas las llamadas al backend
const service = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL
})
// todas las llamadas de este service, iran acompañadas de el Token
service.interceptors.request.use((config) => {
    // interceptar la llamada justo al momento de salir para añadirle el Token
  
    // extraer el Token de LocalStorage
    const storedToken = localStorage.getItem("authToken")
    const tokenAndType = `Bearer ${storedToken}`
  
    if (storedToken) {
      config.headers.authorization = tokenAndType
    }
  
    return config
  
  })
export default service;