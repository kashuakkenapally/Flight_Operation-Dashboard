# ✈️ Flight Operations Dashboard

A full-stack, production-grade **real-time flight operations monitoring platform** built with **Spring Boot** (backend) and **React** (frontend). Designed to simulate the kind of flight operations tooling used at major carriers like United Airlines.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3.2, Spring MVC, Spring Data JPA |
| Database | H2 (dev/demo) → MySQL / AWS RDS (prod) |
| Frontend | React 18, Material UI, Recharts, Axios |
| Testing | JUnit 5, Mockito, AssertJ |
| DevOps | Docker, Docker Compose, Maven |
| Cloud-ready | AWS EC2 / ECS, containerized via Docker |

---

## 🏗️ Architecture

```
┌─────────────────────┐        REST API        ┌──────────────────────┐
│   React Frontend    │ ◄───────────────────► │  Spring Boot Backend  │
│  (MUI + Recharts)   │   /api/v1/flights/*   │  (REST + JPA + Sched) │
└─────────────────────┘                        └──────────┬───────────┘
                                                          │ JPA
                                               ┌──────────▼───────────┐
                                               │  H2 (dev) / MySQL    │
                                               │       (prod)         │
                                               └──────────────────────┘
```

---

## ✨ Features

- **Live flight board** — view all flights with origin, destination, gate, status
- **Operational summary** — KPI cards: total flights, in-flight, delayed, cancelled, avg delay
- **Status distribution chart** — pie chart breakdown by flight status
- **Status update workflow** — edit flight status inline with reason capture
- **Search & filter** — filter by flight number, origin, or destination
- **Auto-refresh** — frontend polls every 30 seconds for live data
- **Scheduled job** — Spring `@Scheduled` task auto-progresses flights to LANDED
- **Full test coverage** — JUnit 5 + Mockito unit tests for service layer
- **Containerized** — Docker + Docker Compose for one-command local startup

---

## 🛠️ Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- Docker & Docker Compose (optional)

---

### Option 1 — Docker Compose (Recommended)

```bash
git clone https://github.com/YOUR_USERNAME/flight-ops-dashboard.git
cd flight-ops-dashboard
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/v1/flights
- H2 Console: http://localhost:8080/h2-console

---

### Option 2 — Run Locally

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/flights` | Get all flights |
| GET | `/api/v1/flights/{flightNumber}` | Get flight by number |
| POST | `/api/v1/flights` | Create a new flight |
| PATCH | `/api/v1/flights/{flightNumber}/status` | Update flight status |
| GET | `/api/v1/flights/summary` | Operational KPI summary |
| GET | `/api/v1/flights/window` | Flights in a time window |

---

## 🧪 Running Tests

```bash
cd backend
mvn test
```

Tests cover:
- Service layer with Mockito mocks
- Flight creation, status updates, summary aggregation
- Edge cases: not-found, empty results, scheduling logic

---

## 📁 Project Structure

```
flight-ops-dashboard/
├── backend/
│   ├── src/main/java/com/flightops/
│   │   ├── FlightOpsApplication.java
│   │   ├── controller/FlightController.java
│   │   ├── service/FlightService.java
│   │   ├── repository/FlightRepository.java
│   │   ├── model/Flight.java
│   │   ├── model/FlightDTO.java
│   │   └── config/
│   │       ├── DataSeeder.java
│   │       └── GlobalExceptionHandler.java
│   ├── src/test/java/com/flightops/service/
│   │   └── FlightServiceTest.java
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── pages/Dashboard.jsx
│   │   ├── components/
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── FlightTable.jsx
│   │   │   └── StatusChart.jsx
│   │   ├── hooks/useFlights.js
│   │   └── services/flightApi.js
│   ├── public/index.html
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml
```

---

## 🔧 Configuration

**Switch to MySQL (production):**

In `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/flightops
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
```

---

## 📈 Future Enhancements

- [ ] WebSocket support for true real-time push updates
- [ ] Kafka integration for event-driven status updates
- [ ] Authentication with Spring Security + JWT
- [ ] AWS deployment with ECS + RDS
- [ ] Prometheus metrics + Grafana dashboard

---

## 👩‍💻 Author

**Kashmeera**  
Software Engineer | Java · Spring Boot · React · AWS  
[LinkedIn](https://www.linkedin.com/in/kashmeeraa/) | [GitHub](https://github.com/YOUR_USERNAME)
