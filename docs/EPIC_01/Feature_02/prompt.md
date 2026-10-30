```
Sei un Senior Full Stack Developer. Il tuo compito è creare un prototipo web
funzionante (MVP) per la feature "FEAT-02: Ricerca e Prenotazione Veicoli" del
progetto Ecar (EPIC-001), una piattaforma di Car/Bike Sharing.
```

```
Il prototipo deve essere self-contained e facilmente eseguibile in locale.
```

```
### 1. Tech Stack Richiesto
- Framework: Next.js (App Router) con TypeScript.
- Styling: Tailwind CSS.
```

- `Mappa: Leaflet (tramite `react-leaflet`) per evitare di dover configurare chiavi API a pagamento per il prototipo.` 

- `State Management: React Hooks (useState, useEffect).` 

- `Backend: Next.js Route Handlers (API Routes) con dati mock in memoria o su un file JSON.` 

```
### 2. Modelli di Dati (Mock)
Crea una struttura dati iniziale (mock) con queste interfacce:
- `Vehicle`: { id: string, type: 'car' | 'bike', owner_type: 'fleet' |
'private', status: 'available' | 'booked', location: { lat: number, lng:
number }, available_from: string (ISO date) }
```

```
- Genera almeno 10 veicoli sparsi in un'area ristretta (es. centro di Milano o
Roma), misti per tipologia e proprietà. Alcuni disponibili, altri già prenotati.
```

```
### 3. Requisiti Funzionali da Implementare (User Stories)
```

```
#### US-03: Mappa e Visualizzazione
- Crea una pagina con una mappa interattiva a tutto schermo o larga parte dello
schermo.
```

- `Chiama l'endpoint mock `GET /api/v1/vehicles?status=available`.` 

- `Mostra i marker SOLO per i veicoli "disponibili".` 

- `REQUISITO UI: I marker devono distinguersi visivamente per tipologia (Auto vs Bici) e per proprietà (Flotta vs Privato) tramite colori o icone diverse.` 

- `Gestisci lo stato vuoto: se non ci sono veicoli, mostra un toast o un overlay "Nessun veicolo disponibile in questa zona".` 

```
#### US-04 & US-05: Prenotazione Auto e Bici
```

```
- Cliccando su un marker, apri un modale o una sidebar (Dettaglio Veicolo).
- Mostra i dettagli del veicolo e un datepicker/timepicker per selezionare la
data di prenotazione.
```

```
- REQUISITO DI BUSINESS (Fondamentale): L'utente può prenotare SOLO se la data
richiesta rientra entro le 24 ore dal campo `available_from` del veicolo. Se
eccede, disabilita il bottone e mostra un messaggio di errore chiaro.
```

```
- Simula l'autenticazione (assumi che un utente fittizio sia già loggato).
```

- `Al click su "Prenota", chiama l'endpoint mock `POST /api/v1/bookings`` 

```
{ vehicle_id, start_date, vehicle_type }.
```

- `L'API mock deve:` 

`1. Verificare che il veicolo sia ancora "available".` 

`2. Verificare la regola delle 24 ore.` 

`3. Simulare un addebito (basta un log o un delay).` 

`4. Cambiare lo stato del veicolo in "booked" e restituire successo.` 

- `Lato frontend, mostra un messaggio di successo e fai sparire il veicolo dalla mappa (aggiornando i dati).` 

```
### 4. Piano di Esecuzione per Claude Code
```

```
Esegui i seguenti passaggi in ordine. Chiedimi conferma solo se hai dubbi
bloccanti:
```

```
1. Inizializza il progetto Next.js (se non siamo già in una cartella
inizializzata) e installa le dipendenze necessarie (`leaflet`, `react-leaflet`,
`lucide-react` per le icone).
```

```
2. Crea i tipi TypeScript e il file con i dati Mock.
```

```
3. Crea le due API routes (`GET /api/v1/vehicles` e `POST /api/v1/bookings`)
implementando la logica di business e i controlli richiesti.
```

```
4. Crea il componente mappa client-side. *Attenzione: Leaflet richiede
caricamento dinamico su Next.js senza SSR.*
```

`5. Crea il componente UI per il dettaglio veicolo e il form di prenotazione (Happy path ed Edge path).` 

`6. Unisci il tutto nella pagina principale (`app/page.tsx`).` 

```
Assicurati che il codice sia pulito, formattato, e che il prototipo possa essere
testato avviando `npm run dev`. Usa un design pulito, moderno e responsivo
tramite Tailwind CSS. Procedi.
```

