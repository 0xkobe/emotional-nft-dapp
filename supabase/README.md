# Supabase

## Dump schema

```bash
pg_dump \
  -h db.XXXX.supabase.co \
  -U postgres \
  --clean \
  --schema-only \
  -t nft \
  > supabase_schema.sql
```

## Import

```bash
psql \
  -h db.XXXX.supabase.co \
  -U postgres \
  < supabase_schema.sql
```
