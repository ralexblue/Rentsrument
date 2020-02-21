module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL:process.env.DATABASE_URL||'postgresql://dunder_mufflin@localhost/Renstrument',
    TEST_DATABASE_URL:process.env.DATABASE_URL||'postgresql://dunder_mufflin@localhost/Renstrument-test',
    JWT_SECRET:process.env.JWT_SECRET || "secret",
    SSL: !!process.env.SSL,
  }