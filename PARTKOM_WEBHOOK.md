# PartKom webhook

Restricted server-to-server endpoint for PartKom:

```text
POST https://detaleks43.ru/api/supplier/partkom
```

Authorization:

```text
Authorization: Bearer <PARTKOM_WEBHOOK_TOKEN>
Content-Type: application/json
```

Alternative token header if Bearer auth is inconvenient:

```text
X-PartKom-Token: <PARTKOM_WEBHOOK_TOKEN>
```

Example payload for an existing DETALEKS lead:

```json
{
  "leadId": "lead_id_from_detaleks",
  "offers": [
    {
      "article": "OC90",
      "brand": "Knecht",
      "name": "Oil filter",
      "purchasePrice": 540,
      "deliveryTerm": "1-2 days",
      "quantity": "4",
      "warehouse": "Main"
    }
  ]
}
```

Example payload without an existing lead:

```json
{
  "name": "Client name",
  "phone": "+7 999 000-00-00",
  "vin": "VIN_OR_ARTICLE",
  "requestText": "Part request text",
  "offers": [
    {
      "article": "OC90",
      "brand": "Knecht",
      "name": "Oil filter",
      "purchasePrice": 540,
      "deliveryTerm": "1-2 days",
      "quantity": "4",
      "warehouse": "Main"
    }
  ]
}
```

Response:

```json
{
  "ok": true,
  "leadId": "saved_lead_id",
  "savedOffers": 1
}
```

Notes:

- The endpoint accepts only JSON up to 1 MB.
- Purchase prices and calculated DETALEKS prices are saved only server-side.
- Client-facing pages do not show supplier names, purchase prices, stock, or internal calculations.
- Do not send admin credentials, Vercel credentials, GitHub access, database access, or SMTP credentials to PartKom.
