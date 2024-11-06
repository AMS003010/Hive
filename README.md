# Hive
Collaborative event planning platform with Postgresql + Express.js + Next.js. With Prometheus metrics and Grafana dashboard

<br/>
![image](https://github.com/user-attachments/assets/5a9da58a-bdba-4b8b-9ba8-355f19996fcb)


## Prerequisites
 - Node
 - Docker

## Run the application

After cloning this repo

Run the database, API server and metric dashboard
```
cd Hive
docker compose up
```
<br/>

Run the frontend
```
cd frontend
npm install
npm run dev
```

<br/>

View application at `http://localhost:3001`

View metric dashboard at `http://localhost:3000`. Also add prometheus as a data source to grafana and configure your dashboard.
