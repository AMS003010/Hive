const express = require('express');
const cors = require('cors');
const pool = require('./db');
const setupRoutes = require('./routes/setUpRoutes');
const eventRoutes = require('./routes/eventRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const organiserRoutes = require('./routes/organiserRoutes');
const participantRoutes = require('./routes/participantRoutes');
const userRoutes = require('./routes/userRoutes');
const clubRoutes = require('./routes/clubRoutes');
const searchRoutes = require('./routes/searchRoutes');
const client = require('prom-client'); // Prometheus client

const app = express();
const port = 8000;

// Prometheus metrics setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Define custom metrics
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'status_code']
});

// Middleware to track request metrics
app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.path, status_code: res.statusCode });
    });
    next();
});

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/setup', setupRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/organiser', organiserRoutes);
app.use('/api/participant', participantRoutes);
app.use('/api/signup', userRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/search', searchRoutes);

// Expose metrics at /metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});