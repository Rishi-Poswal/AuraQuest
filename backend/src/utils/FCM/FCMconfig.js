import admin from "firebase-admin"
import dotenv from "dotenv"
dotenv.config();

const serviceAccount = {
  type: "service_account",
  project_id: "auraquest-baaa5",
  private_key_id: process.env.FCM_PRIVATE_KEY_ID,
  private_key: process.env.FCM_PRIVATE_KEY,
  client_email: process.env.FCM_CLIENT_EMAIL,
  client_id: process.env.FCM_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j3tub%40auraquest-baaa5.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export default admin;