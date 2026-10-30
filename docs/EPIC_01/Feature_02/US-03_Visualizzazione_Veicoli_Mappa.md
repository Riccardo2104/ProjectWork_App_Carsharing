# US-03: Visualizzazione Veicoli Disponibili nella Mappa

| Campo | Specifica |
| :--- | :--- |
| **ID** | US-03 |
| **Titolo** | Visualizzazione Veicoli Disponibili nella Mappa |
| **Parent Feature** | FEAT-02 Ricerca e Prenotazione Veicoli |
| **Parent Epic** | EPIC-001 Piattaforma di Car/Bike Sharing tra Privati con Flotta Aziendale |
| **Autore (PO / Analyst)** | Da assegnare |
| **Assegnatario (Dev)** | Da assegnare |
| **Sprint / Iterazione** | Da pianificare |
| **Stima (Story Points)** | 3 |
| **Stato** | In Refinement |

---

### 1. Dichiarazione della Storia (Formulato Connextra)

> **Come** utente autenticato
> **voglio** visualizzare su una mappa i veicoli disponibili nell'area geografica in cui mi trovo, distinti per tipologia (auto/bicicletta) e proprietà (flotta aziendale/privato)
> **affinché** io possa individuare rapidamente un veicolo idoneo da prenotare senza dover cercare manualmente tra tutti i veicoli del sistema.

---

### 2. Checklist di Conformità INVEST

* [x] **I - Independent:** La storia è autosufficiente: la sola visualizzazione in mappa non dipende dal completamento di US-04 o US-05, sebbene sia un prerequisito naturale per prenotare.
* [x] **N - Negotiable:** La modalità di visualizzazione (raggruppamento marker, zoom, filtri) resta aperta a raffinamenti tecnici in fase di implementazione.
* [x] **V - Valuable:** Produce valore diretto per l'utente, che altrimenti non avrebbe alcun modo di scoprire i veicoli disponibili.
* [ ] **E - Estimable:** Stima preliminare a 3 punti; da confermare in Planning Poker con il team.
* [x] **S - Small:** Perimetro limitato alla sola visualizzazione (non include la prenotazione), completabile in un singolo sprint.
* [x] **T - Testable:** I criteri di accettazione sotto (stato "disponibile", distinzione visiva) sono verificabili in modo oggettivo.

---

### 3. Criteri di Accettazione BDD (Behavior-Driven Development — Gherkin)

#### Scenario 1: Visualizzazione dei veicoli disponibili in mappa (Happy Path)
```gherkin
Scenario: L'utente visualizza i veicoli disponibili nella propria area
  Given l'utente è autenticato
  And esistono veicoli con stato "disponibile" nell'area geografica visualizzata, sia di flotta sia privati
  When l'utente accede alla sezione "Mappa"
  Then il sistema mostra un marker per ciascun veicolo con stato "disponibile" nell'area
  And ogni marker distingue visivamente la tipologia (auto o bicicletta)
  And ogni marker distingue visivamente la proprietà (flotta aziendale o privato)
```

#### Scenario 2: Nessun veicolo disponibile nell'area visualizzata (Edge / Error Path)
```gherkin
Scenario: L'area visualizzata non contiene veicoli disponibili
  Given l'utente è autenticato
  And nessun veicolo con stato "disponibile" si trova nell'area geografica attualmente visualizzata
  When l'utente accede alla sezione "Mappa"
  Then il sistema mostra il messaggio "Nessun veicolo disponibile in questa zona"
  And non vengono mostrati marker di veicoli non disponibili o prenotati
```

---

### 4. Note Tecniche e Dipendenze
* **Endpoint API di Riferimento:** `GET /api/v1/vehicles?status=available&bbox={area}` (da definire in OpenAPI Spec).
* **Componenti UI / Wireframe:** Schermata Mappa con marker differenziati per tipo veicolo e proprietà (wireframe da produrre).
* **Vincoli Dati / Entità Coinvolte:** Tabella `vehicles` (campo `status`, `type`, `owner_type`); posizione alimentata dal tracciamento GPS di US-11 (aggiornamento periodico, indicativamente ogni 30 secondi, in forma aggregata).

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
