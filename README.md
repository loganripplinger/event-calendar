# 📅 Event Calendar

A simple, client-side event calendar that displays a full year on a single page. No login required—events are stored in the URL for easy sharing and bookmarking.

## 🌟 Features

- 📆 **Full-Year View** – See all your events for the year at a glance.
- 🔗 **URL-Based Storage** – No need for accounts or local storage; simply bookmark the URL.
- 📝 **Declarative Event Definition** – Define and edit events using a simple text format; the URL updates automatically.
- 🚀 **Lightweight & Fast** – A client-side SPA built with React, Vite, and TypeScript.
- 📤 **Easy Sharing** – Share your calendar by copying the current URL.

---

## 🛠 How It Works

### 🚀 How to Use

[loganripplinger.github.io/event-calendar](http://loganripplinger.github.io/event-calendar)

### 📌 Adding an Event

At the bottom of the page, enter your event using the following format:

```
Event Name: Start-Month Start-Day to End-Month End-Date
```

- The colon (`:`) **separates the event name from the date**, so avoid using it in the event title.
- Both **start date and end date must be provided** (even for single-day events, use the same date twice).

#### ⚠️ Warning: No Overlapping Events

This calendar is designed to display only one event per day.

- If any two events overlap at any point, they will not display correctly.
- Only one event will be visible per day, so ensure your events do not have conflicting dates.

#### ✅ Example Inputs:

```
New Year's Celebration: Jan 1 to Jan 1
Vacation: July 10 to July 20
```

### ✏️ Editing Events

- Simply modify the event text in the input field.
- The calendar and URL will update automatically.

### ❌ Deleting Events

- Remove the event from the input field, and it will be removed from the calendar.

---

## 📆 Date Formats

Recommended formats:

- `Jan 5`
- `January 5`
- `1 5`

---

## 📱 Compatibility

- **Mobile-Friendly?** Mostly! While not designed specifically for mobile, it works fine on most phones.
- **Browser Support?** Works best on modern browsers like Chrome, Firefox, and Edge.

---

## 🚀 Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript

---

## 📤 Sharing Your Calendar

Since all event data is stored in the URL, sharing your calendar is as simple as copying and sending the link!
