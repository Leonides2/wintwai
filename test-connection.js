const { MongoClient, ServerApiVersion } = require('mongodb');
const dns = require('dns');

console.log("🔍 Probando conectividad a MongoDB Atlas...");

// Cadena de conexión corregida
const uri = "mongodb+srv://martinguaduz:Lpfbs0eyZfTPhYji@cluster0.pa1c5xm.mongodb.net/miApp?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

async function testDNS() {
  return new Promise((resolve) => {
    dns.lookup('cluster0.pa1c5xm.mongodb.net', (err, address) => {
      if (err) {
        console.log("❌ Error de resolución DNS:", err.code);
        resolve(false);
      } else {
        console.log("✅ Resolución DNS exitosa para cluster0.pa1c5xm.mongodb.net:", address);
        resolve(true);
      }
    });
  });
}

async function run() {
  try {
    // Probar resolución DNS primero
    await testDNS();
    
    console.log("\nIntentando conectar a MongoDB Atlas...");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ ¡Conexión exitosa a MongoDB Atlas!");
  } catch (error) {
    console.error("\n❌ Error al conectar a MongoDB Atlas:", error);
    
    console.log("\n🔍 Soluciones recomendadas:");
    console.log("1. Verifica tu conexión a Internet (intenta navegar a una página web)");
    console.log("2. Verifica tus credenciales de MongoDB Atlas");
    console.log("3. Asegúrate de haber agregado tu dirección IP a la lista blanca en MongoDB Atlas");
    console.log("4. Verifica que el cluster esté activo en tu cuenta de MongoDB Atlas");
    console.log("5. Prueba con estos DNS alternativos en tu sistema:");
    console.log("   - Google DNS: 8.8.8.8 y 8.8.4.4");
    console.log("   - Cloudflare: 1.1.1.1 y 1.0.0.1");
    console.log("6. Desactiva temporalmente el firewall para probar");
    console.log("7. Intenta acceder a tu MongoDB Atlas desde el navegador para verificar tu cuenta");
  } finally {
    if (client) {
      await client.close();
    }  }
}

// Ejecutar solo una vez
run();
