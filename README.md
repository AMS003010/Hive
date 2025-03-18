# Hive

Collaborative event planning platform built with PostgreSQL, Express.js, and Next.js, featuring Prometheus metrics and a Grafana dashboard for monitoring.

---

## 🚀 Features
- **Collaborative Event Planning**: Manage events, participants, volunteers, and organizers.
- **Real-time Metrics & Monitoring**: Integrated with Prometheus and Grafana.
- **Scalable Architecture**: Built using Docker, PostgreSQL, Express.js, and Next.js.
- **Deployment Ready**: Hosted on Vercel and Koyeb.

---

## 📌 Prerequisites
Ensure you have the following installed before running the application:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/AMS003010/Hive.git
 cd Hive
```

### 2️⃣ Start the Backend (Database, API, and Metrics Dashboard)
```sh
docker compose up
```

### 3️⃣ Initialize the Database
Make a POST request to setup all the tables, functions, and triggers in PostgreSQL:
```sh
curl -X POST http://localhost:8000/api/setup
```
*(Any API client like Postman or Insomnia can be used.)*

### 4️⃣ Start the Frontend
```sh
cd frontend
npm install
npm run dev
```

### 5️⃣ Access the Application
- **Web App**: [http://localhost:3001](http://localhost:3001)
- **Metrics Dashboard**: [http://localhost:3000](http://localhost:3000)  
  *(Add Prometheus as a data source in Grafana and configure your dashboard.)*

---

## 📸 Screenshots

| Home | Login | Signup |
|------|-------|--------|
| ![Home](https://github.com/AMS003010/Hive/blob/main/images/home.png) | ![Login](https://github.com/AMS003010/Hive/blob/main/images/login.png) | ![Signup](https://github.com/AMS003010/Hive/blob/main/images/signup.png) |

| Admin Dashboard | Stats | Filter |
|----------------|-------|--------|
| ![Admin Dashboard](https://github.com/AMS003010/Hive/blob/main/images/admin-dashbaord.png) | ![Stats](https://github.com/AMS003010/Hive/blob/main/images/stats.png) | ![Filter](https://github.com/AMS003010/Hive/blob/main/images/filter.png) |

| Event Page 1 | Event Page 2 | Metrics |
|-------------|-------------|---------|
| ![Event 1](https://github.com/AMS003010/Hive/blob/main/images/event-1.png) | ![Event 2](https://github.com/AMS003010/Hive/blob/main/images/event-2.png) | ![Metrics](https://github.com/AMS003010/Hive/blob/main/images/metrics.png) |

---

## 🌍 Deployment
Project Hive is deployed at:
- **Frontend**: [Hive on Vercel](https://hiveapp.vercel.app/)
- **Backend & Database**: Hosted on [Koyeb](https://www.koyeb.com/)

---

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 💡 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📩 Contact
For any queries or issues, feel free to reach out via GitHub Issues.

Happy Coding! 🚀

