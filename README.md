# React CRUD Dashboard

## Installation

1. Open terminal in project folder.
2. Run:

```bash
npm install
npm install axios react-router-dom bootstrap react-toastify json-server
```

## Run Application

```bash
npm run dev
```

## Run JSON Server

```bash
npx json-server --watch db.json --port 3001
```

## App Routes

- `/` - Home
- `/dashboard` - Dashboard
- `/employees` - Employees list
- `/add` - Add Employee
- `/edit/:id` - Edit Employee
- `/view/:id` - View Employee
- invalid routes show `404`
