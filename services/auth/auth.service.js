import http from "../http-common";
import jwt from 'jwt-decode';
import Router from 'next/router';
import {AES, enc}from 'crypto-js';

import {encryptText,decryptText} from "../../utils/encryption-decryption"

class AuthService {
    login(data) {
        return http.post('/auth/login', data);
    }

    initiateResetPassword(data) {
        return http.post('/auth/reset-password/initial', data);
    }

    resetPassword(data) {
        return http.post('/auth/reset-password', data);
    }

    getEncToken() {
        if (typeof window !== "undefined")      
                return localStorage.getItem('mcs-auth-token');
        return;   
    }

    getDecToken() {
        if (typeof window !== "undefined")      
                return decryptText(localStorage.getItem('mcs-auth-token'));
        return;   
    }

    setToken(token) {
        localStorage.setItem('mcs-auth-token', encryptText(token));
    }

    isLoggedIn() {
        const token = this.getDecToken();
        if (!!token) {
          try {
            return jwt(token);
          } catch (error) {
            return false;
          }
        } else {
          return false;
        }
    }

     getExp() {
            const token = this.isLoggedIn();
            if (!token) return null;

            const date = new Date(0);
            date.setUTCSeconds(token.exp);

            return date;
    }

    tokenExpired() {
      const exp = this.getExp();
      if (!exp) return null;
      const expired = !(exp.valueOf() > new Date().valueOf());
      if (expired) this.removeToken();
      return expired;
    }

    logout() {
        this.removeToken();
        Router.push('/auth/login')
    }
    removeToken() {
        localStorage.removeItem('mcs-auth-token')
    }

    
}

export default new AuthService();
