# Hive
Collaborative event planning platform with Postgresql + Express.js + Next.js. With Prometheus metrics and Grafana dashboard

<br/>

![image](https://github.com/AMS003010/Hive/blob/main/images/home.png)
![image](https://github.com/AMS003010/Hive/blob/main/images/admin-dashbaord.png)
![image](https://github.com/AMS003010/Hive/blob/main/images/stats.png)
![image](https://github.com/AMS003010/Hive/blob/main/images/filter.png)
![image](https://github.com/AMS003010/Hive/blob/main/images/event-1.png)
![image](https://github.com/AMS003010/Hive/blob/main/images/event-2.png)
![image](https://github.com/AMS003010/Hive/blob/main/images/metrics.png)


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

Make a POST request to "http://localhost:8000/api/setup" to setup all the tables, functions and triggers in the Postgresql Database 
(cURL not necessary, any kind client for sending a request will work)
```
curl -X POST http://localhost:8000/api/setup
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
