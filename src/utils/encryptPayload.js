import CryptoJS from 'crypto-js';

 const encryptPayload = (json) => {
  const key = CryptoJS.enc.Utf8.parse('123456$#@$^@1ERF');
  const iv = CryptoJS.enc.Utf8.parse('123456$#@$^@1ERF');

  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(JSON.stringify(json)),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );

  return encrypted.toString();
};

export default encryptPayload