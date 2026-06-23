import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// https://firebase.google.com/docs/web/setup#available-libraries

// Credenciales de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBqi5IQqJez3rDu48EovjjXi_9VU--xXaY",
  authDomain: "tropicglass-app.firebaseapp.com",
  projectId: "tropicglass-app",
  storageBucket: "tropicglass-app.firebasestorage.app",
  messagingSenderId: "944542320385",
  appId: "1:944542320385:web:958beebd73ebf63685bd00",
  measurementId: "G-MLH06MNN2T"
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
// Exporta la autenticación y la base de datos para usarlas en otros archivos
export { auth, db }
