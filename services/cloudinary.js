import axios from "axios";
export const domain = "https://api.cloudinary.com/v1_1/mount-carmel-school";

const http = axios.create({
    baseURL: domain,
    headers: { 'Content-Type': 'application/json' },
  });
  
class CloudinaryService {

    post(data){
        return http.post("/image/upload",data)
    }
}

export default new CloudinaryService();
