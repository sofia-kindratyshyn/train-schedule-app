// test-connection.js
import pkg from 'pg';
const { Client } = pkg;

async function testSupabaseConnection() {
  const client = new Client({
    host: 'xsxlaysgwuwpsofsltpy.supabase.co',
    port: 6543,
    user: 'postgres',
    password: 'qUDZM3Y3',
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    ('✅ Connected to Supabase successfully!');

    const result = await client.query('SELECT NOW()');
    console.log('📅 Database time:', result.rows[0].now);

    await client.end();
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error details:', error);
    return false;
  }
}

testSupabaseConnection();
