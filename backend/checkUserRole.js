require('dotenv').config()
const { MongoClient } = require('mongodb')

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('plantsDB')
    const user = await db.collection('users').findOne({ email: 'fardinsojon@gmail.com' })
    console.log('User in DB:', user)
    const plantsCount = await db.collection('plants').countDocuments({ 'seller.email': 'fardinsojon@gmail.com' })
    console.log('Plants count under fardinsojon@gmail.com:', plantsCount)
  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
  }
}
run()
