## Next.js Ecommerce Watch Store Project for UpLeveled Full Stack Course

This is a full-stack **Ecommerce Watch Store** project built with **Next.js** for the **UpLeveled Full Stack Course**.

## Screenshots

### Homepage

![Homepage Screenshot](public/images/screenshot-homepage.png)

### Product Page

![Product Page Screenshot](public/images/screenshot-product-page.png)

## Database Setup

If you don't have PostgreSQL installed yet, follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.
Then, connect to the built-in `postgres` database as administrator in order to create the database:

### Windows

If it asks for a password, use `postgres`.

```bash
psql -U postgres
```

### macOS

```bash
psql -U postgres
```

### Linux

```bash
sudo -U postgres psql
```

Once you have connected, run the following to create the database:

```bash
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
\connect <database name>
CREATE SCHEMA <schema name> AUTHORIZATION <user name>;
```

Quit psql using the following command:

```bash
\q
```

On Linux, it is [best practice to create an operating system user for each database](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_using_database_servers/using-postgresql_configuring-and-using-database-servers#con_postgresql-users_using-postgresql), to ensure that the operating system user can only access the single database and no other system resources. A different password is needed on Linux because [passwords of operating system users cannot contain the user name](https://github.com/upleveled/system-setup/issues/74).

First, generate a random password and copy it:

```bash
openssl rand -hex 16
```

Then create the user, using the database user name from the previous section above. When you are prompted to create a password for the user, paste in the generated password.

```bash
sudo adduser <user name>
```

Once you're ready to use the new user, reconnect using the following command.

### Windows and macOS:

```bash
psql -U <user name> <database name>
```

### Linux:

```bash
sudo -u <user name> psql -U <user name> <database name>
```

## Technologies

- Next.js
- PostgresSQL
- SCSS/CSS Modules
- Jest
- Playwright
- Fly.io

## tests

### Jest

```bash
pnpm jest
```

## Playwright

```bash
pnpm playwright test
```

## Deployment

Deployed the project on Fly.io
