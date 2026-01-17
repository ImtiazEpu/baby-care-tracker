

**👶 Baby Care & Vaccine Tracker (Bangladesh EPI Edition)**
===========================================================

> A free web app that calculates baby's exact age and **automatically tracks Bangladesh Government EPI vaccines**.

* * * * *

**🎯 Core Goals**
-----------------

-   ✅ Show **exact baby age**

-   ✅ Show **which vaccines are due, done, or upcoming**

-   ✅ Based on **Bangladesh EPI schedule**

-   ✅ Parents can **mark vaccines as completed**

-   ✅ Works **offline**

-   ✅ No login, no premium, no ads

* * * * *

**🇧🇩 Bangladesh EPI Vaccine Schedule (Base Data)**
----------------------------------------------------

We will hardcode this in the app (can update later):

| **Age** | **Vaccines** |
| --- |--------------|
|At Birth|BCG + OPV 0|
|6 weeks (42 days)|Pentavalent 1 + OPV 1 + PCV 1|
|10 weeks (70 days)|Pentavalent 2 + OPV 2 + PCV 2|
|14 weeks (98 days)|Pentavalent 3 + OPV 3 + PCV 3|
|9 months|MR (Measles-Rubella)|
|15 months|MR 2|


> Some sources say 45/75/105 days in practice --- keep config flexible.

* * * * *

**🧱 Final Feature List**
-------------------------

* * * * *

**1️⃣ Baby Profile Management**
-------------------------------

-   Add baby:

    -   Name

    -   Date of birth

    -   Gender (optional)

    -   Photo (optional)

-   Support:

    -   Multiple babies

    -   Switch between babies

-   Stored in:

    -   LocalStorage / IndexedDB

* * * * *

**2️⃣ Smart Age Engine**
------------------------

Shows:

-   🎂 Exact age:

    -   Years, Months, Days

-   📆 Also shows:

    -   Total days

    -   Total weeks

    -   Total months

✅ Auto updates daily.

* * * * *

**3️⃣ Vaccine Recommendation Engine ⭐ (Main Feature)**
------------------------------------------------------

When baby DOB is added:

-   App calculates:

    -   Baby's **current age in days**

-   Compares with:

    -   Bangladesh EPI schedule

-   Automatically classifies each vaccine as:

    -   ✅ Completed (if user marked)

    -   ⏳ Due now

    -   🔵 Upcoming

    -   ⚠️ Overdue

* * * * *

**4️⃣ Vaccine Dashboard (Main Screen)**
---------------------------------------

For each baby:

| **Vaccine** | **Due Date** | **Status** | **Action**|
| --- | --- | --- | - |
|BCG + OPV 0|Jan 1, 2025|✅ Done|Undo|
|Pentavalent |Feb 12, 2025|⏳ Due|Mark Done|
|Pentavalent 2|Mar 12, 2025|🔵 Coming|---|

Features:

-   ✅ Mark as Done

-   ❌ Undo

-   💾 Saved locally

* * * * *

**5️⃣ Smart Status Messages**
-----------------------------

Examples:

-   ⚠️ Pentavalent 1 is overdue by 5 days

-   ⏳ MR vaccine is due today

-   🕒 PCV 3 will come in 12 days

* * * * *

**6️⃣ Progress Tracker**
------------------------

-   Progress bar:

    > 4 / 6 vaccines completed

-   Badge:

    > Vaccinated up to 14 weeks

* * * * *

**7️⃣ Milestone Tracker**
-------------------------

Auto milestones:

-   7 days

-   45 days

-   3 months

-   6 months

-   9 months

-   1 year

Plus custom:

-   First smile

-   First step

-   First word

* * * * *

**8️⃣ Growth Tracker**
----------------------

-   Track:

    -   Weight

    -   Height

    -   Head size

-   Date-wise entries

-   Simple chart

* * * * *

**9️⃣ Shareable Read-Only Page**
--------------------------------

Generate:

```
babycare.app/?name=Ayaan&dob=2025-01-01
```

Shows:

-   Age

-   Vaccine status (read-only)

* * * * *

**🔒 10️⃣ Privacy First**
-------------------------

-   No login

-   No server

-   No data collection

-   Everything stays in browser

* * * * *

**⚠️ Medical Disclaimer (Important)**
-------------------------------------

Show in app:

> "This app follows Bangladesh EPI schedule. Always consult a doctor."

* * * * *

**🧠 Internal Data Structure**
------------------------------

### **Vaccine Config**

```
const BD_EPI = [
  { key: "bcg", day: 0, label: "BCG + OPV 0" },
  { key: "penta1", day: 42, label: "Pentavalent 1 + OPV 1 + PCV 1" },
  { key: "penta2", day: 70, label: "Pentavalent 2 + OPV 2 + PCV 2" },
  { key: "penta3", day: 98, label: "Pentavalent 3 + OPV 3 + PCV 3" },
  { key: "mr1", day: 270, label: "MR (Measles-Rubella)" },
  { key: "mr2", day: 450, label: "MR 2" },
];
```

* * * * *

**🗂️ Baby Data**
-----------------

```
{
  id: "1",
  name: "Ayaan",
  dob: "2025-01-01",
  vaccines: {
    bcg: true,
    penta1: false
  }
}
```

* * * * *

**🖥️ Pages**
-------------

-   Home: Baby list

-   Add Baby

-   Baby Dashboard:

    -   Age

    -   Vaccines

    -   Milestones

    -   Growth

-   Edit Baby

* * * * *

**🧰 Tech Stack**
-----------------

-   React + Vite

-   Tailwind

-   dayjs / date-fns

-   recharts

-   Storage: localStorage or IndexedDB

* * * * *

**🏗️ Development Phases**
--------------------------

### **Phase 1 (Core MVP)**

-   ✅ Baby profile

-   ✅ Age engine

-   ✅ BD EPI vaccine engine

-   ✅ Mark as done

-   ✅ Dashboard UI

### **Phase 2**

-   Growth tracker

-   Milestones

-   Share page

* * * * *

**🌍 Future (Optional)**
------------------------

-   Export PDF

-   Installable PWA

* * * * *