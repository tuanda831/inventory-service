exports.TRUNCATE_ALL_TABLES = `
DO $$
DECLARE
    tables CURSOR FOR
      SELECT    TABLENAME
      FROM      PG_TABLES
      WHERE     SCHEMANAME = 'public'
      AND       TABLENAME NOT LIKE 'knex_%'
      ORDER BY  TABLENAME;
BEGIN
    FOR tblRec IN tables LOOP
      EXECUTE 'TRUNCATE TABLE ' || tblRec.tablename || ' CASCADE;';
    END LOOP;
END$$;
`;