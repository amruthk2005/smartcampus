# smartcampus

## Docker development

The project supports Docker Compose for local development. A `mongo` service is included so the backend can connect to a MongoDB instance. Run:

```bash
# rebuild the images and start the stack
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

Compose also creates a named volume `mongo-data` to persist the database between restarts.

Each service has a `.dockerignore` that excludes `node_modules` and other build artifacts to prevent host directories from overwriting container installs.

