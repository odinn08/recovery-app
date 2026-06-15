# Apple Health Sync with iPhone Shortcuts

This guide explains how to set up an iPhone Shortcut to automatically sync your Apple Health data with the FightReady API.

## 1. Prerequisites

- iPhone with the **Shortcuts** app installed.
- Your FightReady API Key: `fr_dev_key_12345` (found in `.env`).
- Your app must be deployed and accessible via a public URL (e.g., Vercel).

## 2. iPhone Shortcut Setup

### Step A: Fetch Health Data
1. Open the **Shortcuts** app and create a new shortcut named **"Sync FightReady"**.
2. Add the **"Find Health Samples"** action for:
   - **Resting Heart Rate** (Unit: bpm)
   - **Heart Rate Variability** (Unit: ms)
   - **Body Mass** (Unit: kg)
   - **Sleep Analysis** (Total Sleep, Deep Sleep, REM)
3. Set the filter to **"Start Date is in the last 24 hours"**.

### Step B: Construct JSON
Add a **"Dictionary"** action with the following keys:
- `date`: Current Date (Formatted as ISO 8601)
- `sleep_hours`: (Total Sleep Hours)
- `deep_sleep_minutes`: (Deep Sleep Minutes)
- `rem_sleep_minutes`: (REM Sleep Minutes)
- `hrv`: (HRV Value)
- `resting_hr`: (Resting Heart Rate Value)
- `weight`: (Body Mass Value)
- `energy_score`: (Ask each time or use a slider)
- `soreness_score`: (Ask each time or use a slider)

### Step C: API Request
1. Add the **"Get Contents of URL"** action.
2. Set URL to: `https://your-app.vercel.app/api/health/import`
3. Set Method to **POST**.
4. Add Headers:
   - `Authorization`: `Bearer fr_dev_key_12345`
   - `Content-Type`: `application/json`
5. Set Request Body to **File** or **Dictionary** (the one created in Step B).

## 3. Automation Setup

To make this seamless, set up a personal automation:
1. Go to the **Automation** tab in Shortcuts.
2. Tap **"+"** &gt; **"Create Personal Automation"**.
3. Select **"Time of Day"** (e.g., 07:00).
4. Select **"Run Immediately"** (disable "Ask Before Running").
5. Add the **"Run Shortcut"** action and select **"Sync FightReady"**.

## 4. API Request Example (JSON)

```json
{
  "date": "2026-06-14T07:00:00Z",
  "sleep_hours": 7.5,
  "deep_sleep_minutes": 90,
  "rem_sleep_minutes": 120,
  "hrv": 72,
  "resting_hr": 54,
  "weight": 78.5,
  "energy_score": 8,
  "soreness_score": 3
}
```

## 5. Required Headers

- `Authorization`: `Bearer [YOUR_API_KEY]`
- `Content-Type`: `application/json`
