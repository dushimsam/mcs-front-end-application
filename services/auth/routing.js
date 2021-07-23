
import http from "../http-common";
import jwt from 'jwt-decode';
import  { useRouter } from 'next/router';

class RouteService {

getPrevRoute() {
    if (typeof window !== "undefined")
          if(localStorage.getItem('mcs-prev_link'))
              return localStorage.getItem('mcs-prev_link');
           else
              return null;
}
}

export default new RouteService();
