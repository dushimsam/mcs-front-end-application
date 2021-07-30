import {AES, enc} from 'crypto-js';

const GLOBAL_KEY = "****Mcs&234@_Auto1800@@@_#Parts****"
const GLOBAL_KEY_SIMPLE = "****Mcs&2346666666666_____353232WEB_LINKS_URLSSSSSSSSS####*****";
export const encryptText = (text) =>{
    const encryptedText = AES.encrypt(text,GLOBAL_KEY).toString();  
    return encryptedText;
}

export const decryptText = (encryptedText) =>{
    let decryptedText  = null;
    if(encryptedText){
        const decrypted = AES.decrypt(encryptedText, GLOBAL_KEY);
         decryptedText = decrypted.toString(enc.Utf8);
    }
    return decryptedText;
}


export const encryptObj = (obj) =>{
    const encrypted = AES.encrypt(JSON.stringify(obj),GLOBAL_KEY).toString();
    return encrypted;
}


export const decryptObj = (encryptedObj) =>{
    let decryptedObj = null
    if(encryptedObj)
    {
        const decrypted = AES.decrypt(encryptedObj,GLOBAL_KEY);
        decryptedObj = JSON.parse(decrypted.toString(enc.Utf8));
    }

    return decryptedObj;
}



export const decryptTextSimple = (encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(GLOBAL_KEY_SIMPLE).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};


export const encryptTextSimple = (text) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) => textToChars(GLOBAL_KEY_SIMPLE).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};