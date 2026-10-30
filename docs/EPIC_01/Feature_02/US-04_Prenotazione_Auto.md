# US-04: Prenotazione Auto

| Campo | Specifica |
| :--- | :--- |
| **ID** | US-04 |
| **Titolo** | Prenotazione Auto |
| **Parent Feature** | FEAT-02 Ricerca e Prenotazione Veicoli |
| **Parent Epic** | EPIC-001 Piattaforma di Car/Bike Sharing tra Privati con Flotta Aziendale |
| **Autore (PO / Analyst)** | Da assegnare |
| **Assegnatario (Dev)** | Da assegnare |
| **Sprint / Iterazione** | Da pianificare |
| **Stima (Story Points)** | 5 |
| **Stato** | In Refinement |

---

### 1. Dichiarazione della Storia (Formulato Connextra)

> **Come** utente autenticato
> **voglio** prenotare un'automobile disponibile (di flotta o di un privato condivisore) entro 24 ore dal primo giorno in cui il veicolo è disponibile
> **affinché** io possa riservare con certezza un'auto per il periodo di cui ho bisogno, con addebito automatico sul mio metodo di pagamento registrato.

---

### 2. Checklist di Conformità INVEST

* [x] **I - Independent:** La storia è rilasciabile autonomamente, pur presupponendo la visualizzazione dei veicoli (US-03) come punto di ingresso naturale.
* [x] **N - Negotiable:** I dettagli implementativi del meccanismo di addebito e della verifica di disponibilità restano aperti a raffinamenti con il team.
* [x] **V - Valuable:** Rappresenta il valore centrale della piattaforma: senza la possibilità di prenotare, la sola visualizzazione dei veicoli non produce alcun beneficio concreto.
* [ ] **E - Estimable:** Stima preliminare a 5 punti; da confermare in Planning Poker con il team.
* [ ] **S - Small:** Il perimetro (vincolo temporale, verifica disponibilità, addebito) è più ampio di una singola interazione UI; valutare se scomporre ulteriormente in sede di refinement.
* [x] **T - Testable:** I criteri di accettazione sotto (finestra delle 24 ore, disponibilità effettiva) sono verificabili in modo oggettivo.

---

### 3. Criteri di Accettazione BDD (Behavior-Driven Development — Gherkin)

#### Scenario 1: Prenotazione auto completata con successo (Happy Path)
```gherkin
Scenario: Prenotazione di un'automobile disponibile entro la finestra consentita
  Given l'utente autenticato ha selezionato un'automobile con stato "disponibile"
  And la richiesta di prenotazione avviene entro 24 ore dal primo giorno disponibile del veicolo
  And l'utente ha un metodo di pagamento valido registrato sull'account
  When l'utente indica il periodo di utilizzo desiderato e conferma la prenotazione
  Then il sistema verifica la disponibilità effettiva del veicolo per il periodo richiesto
  And addebita automaticamente l'importo tramite il metodo di pagamento registrato
  And registra la prenotazione rendendo il veicolo non disponibile per il periodo prenotato
  And invia conferma della prenotazione all'utente
```

#### Scenario 2: Veicolo prenotato da un altro utente nel frattempo (Edge / Error Path)
```gherkin
Scenario: L'automobile selezionata non è più disponibile al momento della conferma
  Given l'utente sta completando la richiesta di prenotazione di un'automobile
  And nel frattempo un altro utente ha confermato una prenotazione sullo stesso veicolo per un periodo sovrapposto
  When l'utente conferma la propria richiesta di prenotazione
  Then il sistema rifiuta la prenotazione notificando che il veicolo non è più disponibile
  And non addebita alcun importo all'utente
```

---

### 4. Note Tecniche e Dipendenze
* **Endpoint API di Riferimento:** `POST /api/v1/bookings` con `vehicle_type=car` (da definire in OpenAPI Spec).
* **Componenti UI / Wireframe:** Schermata Dettaglio Veicolo e Modulo di Prenotazione (wireframe da produrre).
* **Vincoli Dati / Entità Coinvolte:** Tabelle `bookings`, `vehicles` con controllo di concorrenza per evitare doppie prenotazioni sullo stesso veicolo/periodo; integrazione con il sistema di gestione pagamenti per l'addebito automatico.

---

### 5. Definizione dei Cancelli di Qualità

#### Definition of Ready (DoR) per questa Storia
- [x] Il ruolo utente e il beneficio di business sono univoci e chiari.
- [ ] Almeno 2 scenari BDD Gherkin (Happy Path + eccezione) sono definiti e approvati.
- [ ] Le dipendenze API e i wireframe UI sono disponibili e consultabili.
- [ ] La storia è stata stimata dal team in Planning Poker.

#### Definition of Done (DoD) per questa Storia
- [x] Codice scritto, formattato e passato dal linter senza warning.
- [ ] Unit test scritti e superati con coverage ≥ 80% sulla logica di business.
- [ ] Pull Request revisionata e approvata da almeno un pari (*Peer Review*).
- [ ] Test di integrazione superati in pipeline CI automatica.
- [ ] Criteri BDD verificati con successo in ambiente di staging.
