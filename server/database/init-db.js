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
    console.log('🎉 Setup complete! Running `npm run db:setup` on any system');
    console.log('   will automatically initialize and configure this database.');
    console.log('========================================================');
  } catch (error) {
    console.error('\n❌ Database setup failed!');
    if (error.code === 'ECONNREFUSED') {
      console.error('👉 Error: Could not connect to MySQL server.');
      console.error('👉 Tip: Ensure MySQL is running (e.g. Start MySQL in XAMPP Control Panel).');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('👉 Error: MySQL username or password incorrect.');
      console.error('👉 Tip: Verify DB_USER and DB_PASSWORD inside server/.env');
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
