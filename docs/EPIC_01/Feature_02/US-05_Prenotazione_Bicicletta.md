# US-05: Prenotazione Bicicletta

| Campo | Specifica |
| :--- | :--- |
| **ID** | US-05 |
| **Titolo** | Prenotazione Bicicletta |
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
> **voglio** prenotare una bicicletta disponibile (di flotta o di un privato condivisore) entro 24 ore dal primo giorno in cui il veicolo è disponibile
> **affinché** io possa riservare con certezza una bicicletta per il periodo di cui ho bisogno, con addebito automatico sul mio metodo di pagamento registrato.

---

### 2. Checklist di Conformità INVEST

* [x] **I - Independent:** La storia è rilasciabile autonomamente e riutilizza lo stesso meccanismo di prenotazione di US-04, applicato alle biciclette.
* [x] **N - Negotiable:** I dettagli implementativi restano aperti a raffinamenti, in coerenza con quanto stabilito per US-04.
* [x] **V - Valuable:** Estende il valore centrale della piattaforma anche alla mobilità leggera, ampliando l'offerta oltre alle sole automobili.
* [x] **E - Estimable:** Stima preliminare a 3 punti, inferiore a US-04 poiché riutilizza gran parte della logica di prenotazione già implementata per le auto; da confermare in Planning Poker.
* [x] **S - Small:** Perimetro ridotto rispetto a US-04, essendo un adattamento dello stesso flusso a una diversa tipologia di veicolo.
* [x] **T - Testable:** I criteri di accettazione sotto (finestra delle 24 ore, disponibilità effettiva) sono verificabili in modo oggettivo.

---

### 3. Criteri di Accettazione BDD (Behavior-Driven Development — Gherkin)

#### Scenario 1: Prenotazione bicicletta completata con successo (Happy Path)
```gherkin
Scenario: Prenotazione di una bicicletta disponibile entro la finestra consentita
  Given l'utente autenticato ha selezionato una bicicletta con stato "disponibile"
  And la richiesta di prenotazione avviene entro 24 ore dal primo giorno disponibile del veicolo
  And l'utente ha un metodo di pagamento valido registrato sull'account
  When l'utente indica il periodo di utilizzo desiderato e conferma la prenotazione
  Then il sistema verifica la disponibilità effettiva della bicicletta per il periodo richiesto
  And addebita automaticamente l'importo tramite il metodo di pagamento registrato
  And registra la prenotazione rendendo la bicicletta non disponibile per il periodo prenotato
  And invia conferma della prenotazione all'utente
```

#### Scenario 2: Richiesta fuori dalla finestra delle 24 ore (Edge / Error Path)
```gherkin
Scenario: La richiesta di prenotazione eccede la finestra temporale consentita
  Given l'utente autenticato ha selezionato una bicicletta con stato "disponibile"
  And il primo giorno disponibile del veicolo è già trascorso da più di 24 ore
  When l'utente tenta di confermare la prenotazione per quel veicolo
  Then il sistema rifiuta la richiesta mostrando un messaggio esplicativo sulla finestra delle 24 ore
  And non addebita alcun importo all'utente
```

---

### 4. Note Tecniche e Dipendenze
* **Endpoint API di Riferimento:** `POST /api/v1/bookings` con `vehicle_type=bike` (da definire in OpenAPI Spec, stesso endpoint di US-04).
* **Componenti UI / Wireframe:** Schermata Dettaglio Veicolo e Modulo di Prenotazione, condivisi con US-04 salvo adattamenti specifici per biciclette.
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
