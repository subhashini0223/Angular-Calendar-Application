
# 📅 Angular Calendar Application

An advanced **calendar application built with Angular 17+ (standalone architecture)**.  
It supports event management with drag-and-drop, categories, reminders, dark/light theme, and more — similar to a mini Google Calendar.

🚀 **Live Demo**: [Angular Calendar App](https://subhashini0223.github.io/Angular-Calendar-Application/)

---

## ✨ Features

- ✅ **Monthly Calendar View** with weekday headers  
- ✅ **Today Highlighting** (dynamic color based on dark/light mode)  
- ✅ **Add / Edit / Delete Events** (modal form)  
- ✅ **Confirmation dialog** before deleting events  
- ✅ **Drag & Drop** events between days (CDK DragDrop)    
- ✅ **Event Categories** with color coding (saved in LocalStorage)  
- ✅ **Dark / Light Mode**
- ✅ **Search Bar** to filter events quickly  
- ✅ **Month & Year navigation** (with selectors)  
- ✅ **GitHub Pages Deployment** ready  

---

## 📂 Project Structure

```

calendar-app/
│── src/
│   ├── app/
│   │   ├── components/
│   │     ├── calendar/         # Main calendar component
│   │     ├── event-form/       # Event modal form
│   │     └── shared/           # Reusable parts
│   │   
│   ├── models/
|   |__ utils/
│   │
|   |___ services/
│   └── styles.scss               # Global styles
│── angular.json
│── package.json
│── README.md

````

---

## ⚡ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/subhashini0223/Angular-Calendar-Application.git
cd Angular-Calendar-Application
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
ng serve -o
```

This opens the app at `http://localhost:4200`.

---

## 🚀 Deployment (GitHub Pages)

1. Build the app:

   ```bash
   ng build --configuration production --base-href "https://subhashini0223.github.io/Angular-Calendar-Application/"
   ```

2. Deploy:

   ```bash
   npx angular-cli-ghpages --dir=dist/calendar-app/browser
   ```

3. Live demo will be available at:

   ```
   https://subhashini0223.github.io/Angular-Calendar-Application/](https://subhashini0223.github.io/Angular-Calendar-Application/
   ```

---

## Screenshots
Calendar Application -> Light Mode
<img width="1918" height="872" alt="image" src="https://github.com/user-attachments/assets/f3fce78e-95e2-4794-bb3e-c734ebb08aa0" />

Calendar Application -> Dark Mode
<img width="1918" height="867" alt="image" src="https://github.com/user-attachments/assets/57f6afe5-5a2f-4afa-bc40-267849626538" />

Calendar Application - Event Creation
<img width="1918" height="868" alt="image" src="https://github.com/user-attachments/assets/c36e930f-7a24-4126-a223-69c5fbbc1fb3" />

Calendar Application - Event Updation
<img width="1918" height="873" alt="image" src="https://github.com/user-attachments/assets/f8c816ba-dbeb-4b15-9804-01136a8c74c3" />

Calendar Application - Confirmation Dailogs for Delete
<img width="1918" height="967" alt="image" src="https://github.com/user-attachments/assets/3fcc2dcb-69c2-4a6d-83cc-50d4a4ee1fd7" />


## Demo

[Live Demo Link](https://subhashini0223.github.io/Angular-Calendar-Application/)  


## 📌 Roadmap (Future Enhancements)

* 📅 Integration with external holiday/occasions API (auto-display public holidays)
* 🔔 Push notifications for reminders
* 🌐 Multi-language / i18n support
* 📊 Analytics dashboard (events per category, trends)

---

## 👩‍💻 Author

**Subhashini Thiyagarajan**
Frontend Developer | Angular Enthusiast

* 🌐 [Live Demo](https://subhashini0223.github.io/Angular-Calendar-Application/)
* 💻 [GitHub Profile](https://github.com/subhashini0223)

 


