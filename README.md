## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# NestJS GraphQL Todos

A simple Todo application built with [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), and [GraphQL](https://graphql.org/) using Apollo Server. This project demonstrates a code-first approach to building a GraphQL API with user and todo management.

## Features

- User and Todo entities with relations
- GraphQL API (Apollo) with auto-generated schema
- SQLite database (easy local development)
- Modular structure (users, todos)
- TypeORM for database access

## 🔮 Coming Soon Features

- Authentication & Authorization
  ✅ Add signup / login (JWT or sessions).
  ✅ Restrict todos so that users can only access their own.
  ✅ Add role-based access (e.g., admin can see all todos).

- Todo Enhancements
  ✅ Status → pending, in-progress, done.
  ✅ Priority → low, medium, high.
  ✅ Due date → reminders for deadlines.
  ✅ Categories/Tags → group todos (e.g., Work, Personal).
  ✅ Subtasks → break big todos into smaller ones.

- User Experience Features
  ✅ Search & Filters → query todos by status, priority, or due date.
  ✅ Sorting → by creation date, deadline, or priority.
  ✅ Pagination → useful when todos grow large.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Running the App

```bash
npm run start:dev
# or
yarn start:dev
```

The server will start on [http://localhost:3000/graphql](http://localhost:3000/graphql) by default.

### GraphQL Playground

Visit [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser to explore the API and run queries/mutations.

## Project Structure

```
src/
  app.module.ts         # Main application module
  main.ts               # Entry point
  users/                # User module, entity, resolver, service
  todos/                # Todo module, entity, resolver, service
```

## Example GraphQL Queries

**Create a User:**

```graphql
mutation {
  createUser(
    createUserInput: { username: "alice", email: "alice@example.com" }
  ) {
    id
    username
    email
  }
}
```

**Create a Todo:**

```graphql
mutation {
  createTodo(createTodoInput: { title: "Buy milk", userId: 1 }) {
    id
    title
    completed
    userId
  }
}
```

**Get All Users with their Todos:**

```graphql
query {
  users {
    id
    username
    todos {
      id
      title
      completed
    }
  }
}
```

**Get All a single user by id with their Todos:**

```graphql
query {
  user(id: 1) {
    id
    username
    todos {
      id
      title
      completed
    }
  }
}
```

**Update one todo:**

```graphql
mutation {
  updateTodo(
    userId: 1
    input: { id: 1, completed: true, title: "First task (done)" }
  ) {
    id
    title
    completed
  }
}
```

**Delete a toto**

```graphql
mutation {
  deleteTodo(userId: 1, id: 1)
}
```

## Database

- Uses SQLite (`db.sqlite` in project root) for easy local development.
- Entities are auto-synced (see `synchronize: true` in `app.module.ts`).

## License

MIT
