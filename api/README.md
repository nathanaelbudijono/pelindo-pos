# Pelindo backend

## Change connection string appsettings.json

- "Data Source={your pc name};Initial Catalog={database name};Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"

## Migrate database

- dotnet ef migrations add InitialMigration
- dotnet ef database update
