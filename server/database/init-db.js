const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT) || 3306,
  multipleStatements: true
};

async function setupDatabase() {
  console.log('========================================================');
  console.log('🚀 Gym Database Auto-Setup Starting...');
  console.log(`Connecting to MySQL host: ${dbConfig.host}:${dbConfig.port} (User: ${dbConfig.user})`);
  console.log('========================================================');

  let connection;
  try {
    // 1. Initial connection without database specified
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL server successfully.');

    // 2. Read schema.sql file
    const sqlPath = path.join(__dirname, 'schema.sql');
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`schema.sql file not found at: ${sqlPath}`);
    }
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // 3. Execute all SQL queries
    console.log('⏳ Creating database and tables from schema.sql...');
    await connection.query(sqlContent);

    console.log('✅ Database `gym_db` and all tables created successfully!');
    console.log('   - users');
    console.log('   - plans');
    console.log('   - memberships');
    console.log('   - payments');
    console.log('   - fitness_profiles');
    console.log('   - contact_inquiries');
    console.log('========================================================');
    console.log('🎉 Setup complete! Vera entha system-layum `npm run db:setup`');
    console.log('   run pannale automatic ah database create aagidum.');
    console.log('========================================================');
  } catch (error) {
    console.error('\n❌ Database setup failed!');
    if (error.code === 'ECONNREFUSED') {
      console.error('👉 Error: MySQL server connect aaga mudiyala!');
      console.error('👉 Tip: XAMPP Control Panel open panni MySQL-ah "Start" pannunga.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('👉 Error: MySQL username/password thappa irukku!');
      console.error('👉 Tip: server/.env file-la DB_USER and DB_PASSWORD correct ah check pannunga.');
    } else {
      console.error(`👉 Error Details: ${error.message}`);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
