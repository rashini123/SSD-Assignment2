import crypto from "crypto";

const algorithm = "aes-256-ctr";

// AES Encryption and Decryption

const encryptMessage = (message, key) => {
  try {
    const iv = crypto.randomBytes(16);
    const secretKey = process.env.MESSAGE_ENCRYPTION_KEY + key;
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(message), cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } catch (error) {
    console.log("Error! Encryption.", error);
  }
};

const decryptMessage = (encMessage, key) => {
  try {
    
    let textParts = encMessage.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    const secretKey = process.env.MESSAGE_ENCRYPTION_KEY + key;

    let decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secretKey),
      iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch (error) {
    console.log("Error! Decryption.", error);
  }
};

export { encryptMessage, decryptMessage };
