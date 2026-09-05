# Reflex_delivery_Sprint
Reflex is a delivery coordination system for small Kenyan retailers — replacing WhatsApp/phone-based dispatch with a structured flow for logging requests, assigning riders, and tracking delivery status in real time.

## Defining the problem

Identified that retailers use WhatsApp/phone calls with no visibility and no proof of delivery.
This mainly  affects the retailer staff, Dispatcher, Rider.

## Defining the Solution

The Reflex contains structured logging, rider assignment, and status updates.
For this, we chose web prototype for speed and accessibility.

Retailer logs a delivery request (customer name, phone, address, item).

Dispatcher assigns the request to a rider.

Rider updates status (Assigned → Picked Up → Delivered).

Retailer can track progress in real time.

# Reflex Architecture Design

The  architecture is a delivery coordination system designed for small Kenyan retailers. It replaces ad‑hoc WhatsApp/phone coordination with a structured workflow:

- Retailer logs a delivery request

- Dispatcher assigns it to a rider

- Rider updates status until delivery is complete
  
- https://github.com/Rosalie-p/Reflex_delivery_Sprint/blob/main/Docs/Architecture_Diagram.pdf

## Architectural Layers

### Frontend (Client Layer)

- Retailer, Dispatcher, Rider dashboards (HTML, CSS, JavaScript)

- Simple forms + fetch API calls to backend routes

- Provides real‑time visibility of delivery status

- https://github.com/Rosalie-p/Reflex_delivery_Sprint/blob/main/Frontend/Frontend/Retailer%20Dashboard.txt

- https://github.com/Rosalie-p/Reflex_delivery_Sprint/blob/main/Frontend/Frontend/Dispatcher.txt

- https://github.com/Rosalie-p/Reflex_delivery_Sprint/blob/main/Frontend/Frontend/Rider%20Dashboard.txt

### Backend (Application Layer)

- Node.js + Express server

- REST API routes:

   - /api/retailers/request → log new request

   - /api/dispatchers/assign → assign rider

   - /api/riders/update → update status
 
  - Business logic for request handling and validation

- https://github.com/Rosalie-p/Reflex_delivery_Sprint/blob/main/Backend/Backend.txt

### Database (Data Layer)

- PostgreSQL relational schema

- Tables: Retailers, Riders, Requests, StatusUpdates

- Foreign keys enforce relationships

- StatusUpdates table tracks delivery progress over time

- https://github.com/ManuArgut/reflex_delivery_sprint/blob/main/Backend/db.sql

### Workflow Diagram

- Retailer Dashboard → submits request → Backend → Database (Requests table)

- Dispatcher Dashboard → assigns rider → Backend → Database update

- Rider Dashboard → updates status → Backend → Database (StatusUpdates table)

- Retailer Dashboard → fetches updated status → shows live delivery progress

- https://github.com/Rosalie-p/Reflex_delivery_Sprint/blob/main/Docs/ER%20Diagram.pdf

### Trade‑Offs

1. Manual Rider Assignment
   - Weakness: Dispatcher assigns riders manually, no auto‑routing.
   - Accepted because: Keeps workflow simple and easy to demo in sprint.
   - Future Fix: Implement algorithmic assignment (nearest rider, load balancing).

2. No Authentication/Security Layer
   - Weakness: No login or role‑based access control.
   - Accepted because: Faster to implement for prototype; focus on core workflow.
   - Future Fix: Add JWT authentication and RBAC for secure multi‑role handling.

3. Single Database Instance
   - Weakness: One PostgreSQL instance, no replication or sharding.
   - Accepted because: Easier setup for pilot scale.
   - Future Fix: Add replication, backups, and scaling strategy for production.
  
   - https://github.com/Rosalie-p/Reflex_delivery_Sprint/blob/main/Docs/Trade-off%20log.txt

### Roadmap

Short Term (next 3 months)
- Add authentication (JWT login, role‑based access).
- Implement audit logging for request and status changes.

Medium Term (6–12 months)
- Automated rider assignment algorithm.
- Analytics dashboards for retailers and dispatchers.

Long Term (1–2 years)
- Native mobile app with GPS tracking.
- Push notifications for delivery updates.
- Regional expansion and mobile money integration.

- https://github.com/Rosalie-p/Reflex_delivery_Sprint/blob/main/Docs/Roadmap.txt
