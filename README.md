# Currency Converter (React + TS + Vite)

Single-page app that converts currencies using CurrencyAPI.

## How to run

1) Create a `.env` file at the project root with your API key:

```
VITE_CURRENCY_API_KEY=your_currencyapi_key_here
```

2) Install deps and start dev server:

```
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev / yarn dev
```

Open the printed URL in your browser.

## Architecture (MVC-ish)

- Models: `src/models` — types for currencies and conversion.
- Controllers: `src/controllers` — orchestrate API calls and business rules.
- Services: `src/services` — HTTP layer for CurrencyAPI.
- Views: `src/views` — page and presentational components.
- Store: `src/store/ConverterContext.tsx` — Context API state/actions.
- Utils: `src/utils` — validation and formatting helpers.

## Notes

- Validation: amount must be positive, up to 2 decimals; date is optional and cannot be in the future.
- Conversion: result is computed client-side from provider rate and formatted to two decimals for display.
- Errors: clear error messages are shown for validation and request failures; user can re-submit anytime.
