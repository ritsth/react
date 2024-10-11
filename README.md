# Branch - Plant-Based Social Media Web App

## Overview

**Branch** is a plant-centric social media platform that helps users take care of their plants by uploading plant profiles, sharing updates, and receiving smart reminders for watering and maintenance. The application integrates a Bluetooth module and humidity sensor with Arduino to track real-time plant conditions and automate notifications for watering. 

---

## Features

- **User Profiles**: Create a personalized profile to showcase your plants.
- **Photo Uploads**: Share pictures of your plants with the community.
- **Smart Reminders**: Automated notifications for plant watering based on real-time sensor data.
- **Social Interactions**: Like, comment, and interact with other users’ plant profiles.
- **Data Storage**: Securely store user data and plant information using AWS and Django REST API.

---

## Tech Stack

- **Frontend**: React JS
- **Backend**: Django REST Framework
- **Database**: AWS S3 for storage
- **Sensor Integration**: Arduino, Bluetooth module, Humidity sensor
- **API**: Django REST API

---

## Project Architecture

branch-app/
│
├── backend/                # Django backend code
│   ├── api/                # Django REST API endpoints
│   └── ...
│
├── frontend/               # React JS frontend code
│   ├── src/
│   ├── components/         # React components for UI
│   └── ...
│
└── docs/                   # Project documentation and assets


---

## Setup & Installation

### Prerequisites

- Python 3.x
- Node.js
- Arduino IDE (for sensor integration)
- Django
- React JS

### Backend Setup

1. Clone the backend repository:
   git clone https://github.com/ritsth/branchxpp.git
   cd branchxpp
2. Install Python dependencies:
   pip install -r requirements.txt
3. Run the Django server:
   python manage.py migrate
   python manage.py runserver

## Arduino Setup
Connect the humidity sensor to your Arduino and upload the provided script in the arduino/ folder.
Set up Bluetooth to send sensor data to the web application for smart reminders.
Contributions
We welcome contributions from the community! Feel free to submit issues or pull requests to improve the project.

## License
This project is licensed under the MIT License.

## Links
Web App: Branch App (currently down)
Backend Code: GitHub Repository
LinkedIn: Ritika Shrestha



