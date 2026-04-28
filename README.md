# 🚑 Smart Aid – Emergency Assistance App

Smart Aid is a mobile-first emergency assistance application designed to provide instant first aid guidance and support during critical situations. It helps users respond quickly to injuries, burns, unconscious cases, and other emergencies through an interactive and user-friendly interface.

---

## 🚀 Features

### 🩺 Quick Scan (Start Checkup)

Simulated health checks including:

* Pulse Scan
* Oxygen (SpO₂) Scan
* Visual Scan for injuries

### 📋 First Aid Guidelines

Step-by-step instructions for:

* Burns
* Injuries
* Unconscious situations

### 🚨 SOS Emergency Support

* Trigger emergency alerts
* Call emergency services (**100**)
* Integrated location-based map

### 📦 First Aid Kit Dispatch (Simulation)

* Request a first aid kit
* Track delivery status:

  * Request Sent
  * Preparing Kit
  * Out for Delivery
  * Arriving Soon

### 🎥 CPR Guidance

* Embedded video support for CPR assistance

### 🗺️ Location-Based Assistance

* Detects user location
* Displays map for emergency coordination

---

## 🧠 How It Works

1. User opens the app → lands on **Quick Scan screen**
2. Selects:

   * **Visual Scan** → shows first aid guidelines
   * **Pulse / Oxygen Scan** → shows simulated results
3. From guidelines → user can:

   * Follow steps
   * Request first aid kit
4. In emergencies:

   * Use **SOS button**
   * Call emergency services
   * View location on map

---

## 📱 App Flow

```
Quick Scan (Home)
   ├── Visual Scan → Guidelines → Send First Aid Kit
   ├── Pulse Scan → Result
   ├── Oxygen Scan → Result
   ├── SOS → Map + Emergency Call
   ├── Burn/Injury → Steps → First Aid Kit
   └── Unconscious → CPR + Steps
```

---

## 🛠️ Tech Stack

* **Frontend:** React + Tailwind CSS (generated via AI tools)
* **Design:** Figma
* **AI Tool:** Lovable AI (UI to code generation)
* **Map Integration:** OpenStreetMap (iframe + geolocation API)

---

## ⚙️ Key Functionalities

* Simulated real-time scanning (pulse, oxygen, injury)
* Navigation between multiple screens
* Emergency call integration (`tel:100`)
* Location detection using browser geolocation
* Interactive UI with feedback and transitions

---

## 📸 Screenshots
<img width="291" height="349" alt="image" src="https://github.com/user-attachments/assets/3f49146e-7662-4fab-aaa1-ab082c86211c" />
<img width="291" height="348" alt="image" src="https://github.com/user-attachments/assets/19afa377-66df-4720-977e-6bffd0dac101" />
<img width="291" height="349" alt="image" src="https://github.com/user-attachments/assets/68efc370-9e9e-4df3-b0d8-82bd7f8e2f28" />
<img width="291" height="349" alt="image" src="https://github.com/user-attachments/assets/031910e1-b4a8-4dbe-a957-77f0d9abd7f0" />
<img width="291" height="349" alt="image" src="https://github.com/user-attachments/assets/6e20c21a-4205-41a8-946f-77696e150b3a" />
<img width="291" height="349" alt="image" src="https://github.com/user-attachments/assets/663bc1df-a170-46bf-a9e1-93b40c667841" />
<img width="291" height="349" alt="image" src="https://github.com/user-attachments/assets/bacfc67b-2123-4fcf-9fe3-0d4f540bd0ce" />
<img width="291" height="349" alt="image" src="https://github.com/user-attachments/assets/1a75d5f1-9a3b-429d-b92a-1fd48bd9ae72" />
<img width="290" height="349" alt="image" src="https://github.com/user-attachments/assets/73f3375b-4a53-46e0-8307-c4bc72cebadd" />

Architecture diagram
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/eb4379f5-d291-4e14-8583-e6e422063b2e" />

---

## 💡 Future Improvements

* Real-time API integration for maps and hospitals
* Live ambulance tracking
* AI-based injury detection
* Chat support with medical professionals

---

## 👩‍💻 Author

* Ahana Sabud
* Debolina Sen

---

## 📌 Note

This project uses simulated data and flows for demonstration purposes. It is designed as a prototype for emergency response assistance.

