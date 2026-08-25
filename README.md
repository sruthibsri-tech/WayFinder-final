# WayFinder 🧭

**A Bloomberg Terminal for your supply chain.** Built for the **Bright Data AI Agents & Web Data Hackathon**.

WayFinder predicts supply-chain disruptions, freight cost increases and shipping delays *before*
they impact a shipment. Enter a product, origin, destination, weight and ship date — a fleet of AI
agents scans live web intelligence (via Bright Data) and returns a single actionable risk score,
cost/delay forecasts, route optimization and recommended actions.

![flow](https://img.shields.io/badge/agents-12-2dd4bf) ![data](https://img.shields.io/badge/intelligence-Bright%20Data-38bdf8)

---

## What it does

Input a shipment → WayFinder runs a multi-agent pipeline:

| Agent | Role |
| ----- | ---- |
| Product & Material | Category, HS codes, raw-material decomposition (e.g. Plastic 80% / Steel 15% / Packaging 5%) |
| Commodity Intelligence | Oil, resin, steel, metals cost exposure |
| Freight Intelligence | Ocean/air container rates, capacity, route disruptions |
| Port Intelligence | Congestion, vessel queues, throughput |
| Weather Intelligence | Typhoons, storms, seasonal disruption |
| Geopolitical Intelligence | Tariffs, sanctions, Red Sea / conflict risk |
| Supplier Intelligence | Manufacturing PMI, factory health |
| Regulatory Intelligence | Customs & classification changes |
| Cost / Route / Alert Engine | 30/60/90-day forecasts, mode comparison, alerts |
| Executive Summary | Plain-language briefing |

Output: **Global Risk Score**, **Expected Cost Increase**, **Expected Delay**, commodity exposure,
cost-forecast charts, route table, dependency graph, live news feed and recommended actions.

## How Bright Data powers it

Every intelligence agent queries the live web through the official **Bright Data MCP server**
(`@brightdata/mcp`), spawned once and reused. The token auto-provisions the zones it needs, exposing:

- **`search_engine`** — Google SERP for freight rates, port congestion, commodity news, tariffs, weather
- **`scrape_as_markdown`** — page extraction for deeper source content

`src/lib/brightdata.ts` is the integration layer. If the MCP server is unavailable it degrades
gracefully to a realistic built-in dataset so the demo never breaks (shown as **DEMO DATA** vs
**LIVE DATA** in the header).

## Architecture

```
src/
  app/
    page.tsx              # landing + form + live agent console + dashboard (client)
    api/analyze/route.ts  # SSE streaming pipeline endpoint
  lib/
    types.ts              # domain model
    brightdata.ts         # Bright Data MCP client + graceful fallback
    gemini.ts              # Gemini structured-output wrapper
    agents.ts             # product, 7 intelligence agents, synthesis, summary
    orchestrator.ts       # runs the pipeline, weighted risk score, streams events
  components/
    Header / AnalyzeForm / AgentConsole / Dashboard (Recharts viz)
```

The pipeline **streams** progress over Server-Sent Events, so the UI shows each agent light up live.

## Tech

Next.js 16 · React 19 · TypeScript · TailwindCSS v4 · Recharts · Framer Motion · Gemini · Bright Data MCP.

## Run it

```bash
cp .env.example .env.local   # add GEMINI_API_KEY and BRIGHTDATA_API_TOKEN
npm install
npm run dev                  # http://localhost:3000
```

Click a preset (e.g. *10,000 Plastic Chairs · Shanghai → LA*) and hit **Run Risk Analysis**.

> Runs end-to-end with **no keys** using the built-in fallback dataset. Add keys for live web
> intelligence and real LLM reasoning.

### Environment

| Var | Purpose |
| --- | ------- |
| `GEMINI_API_KEY` | LLM reasoning for the agents |
| `GEMINI_MODEL` | optional, defaults to `gemini-2.5-flash` |
| `BRIGHTDATA_API_TOKEN` | live web search/scrape via Bright Data MCP |
| `BRIGHTDATA_PRO_MODE` | optional, enables Bright Data browser/agent tools |

---

Built with Next.js + Gemini + **Bright Data**.
