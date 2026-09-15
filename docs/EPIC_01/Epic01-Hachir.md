# EPIC-001: Piattaforma Integrata di Carsharing e Vehiclesharing

| Campo | Specifica |
| :--- | :--- |
| **ID** | EPIC-001 |
| **Titolo** | Piattaforma Core per la Gestione Utenti, Noleggio Multimodale (Auto e Bici) e Telemetria |
| **Iniziativa / Theme** | Mobilità Condivisa Urbana e Sostenibile |
| **Owner / PM** | Product Manager - Smart Mobility Team |
| **Stato** | In Refinement |
| **Target Release / Milestone** | MVP 1.0 (Release 2026.Q4) |
| **Priorità Strategica** | Must Have |

---

### 1. Obiettivo Strategico e Business Outcome
* **Problema di Business:** Assenza di un'infrastruttura digitale centralizzata per la gestione integrata della flotta multimodale (auto e biciclette), che causa frammentazione dell'esperienza utente, difficoltà nel tracciamento dei veicoli e assenza di un sistema di supporto e prenotazione automatizzato.
* **Valore Atteso:** Fornire ai clienti un'esperienza di mobilità condivisa end-to-end fluida (dalla registrazione alla gestione delle corse e abbonamenti), incrementando il tasso di utilizzo della flotta e riducendo i tempi operativi di gestione prenotazioni ed emergenze.
* **Metriche di Successo (KPI / OKR):**
  * Metrica 1: Tempo medio di completamento registrazione e primo noleggio < 3 minuti.
  * Metrica 2: Tasso di successo nella prenotazione e sblocco veicolo > 99%.
  * Metrica 3: Tempo medio di risposta alle segnalazioni di emergenza < 2 minuti.
  * Metrica 4: Accuratezza della localizzazione GPS dei veicoli sulla mappa entro i 5 metri.

---

### 2. Perimetro Funzionale (Scoping)
* **In Scope (Cosa include questa Epic):**
  * **Autenticazione e Profilo Utente:** Registrazione anagrafica (Nome, Cognome, Età, Data di nascita) ed esperienza di login sicura.
  * **Ricerca e Prenotazione:** Mappa interattiva per la ricerca dei veicoli disponibili e logica di prenotazione differenziata per auto e biciclette.
  * **Gestione Ciclo di Vita Prenotazione:** Modifica degli orari/dettagli della prenotazione e cancellazione prima dell'inizio corsa.
  * **Piani di Abbonamento:** Acquisto e gestione del rinnovo/disdetta dei piani di abbonamento.
  * **Gestione Flotta e Telemetria:** Registrazione e censimento di nuovi veicoli a sistema e tracciamento GPS in tempo reale della flotta.
  * **Customer Care ed Emergenze:** Modulo di ticketing per assistenza generale e canale prioritario per la segnalazione di emergenze durante la corsa.

* **Out of Scope (Esclusioni esplicite e differite):**
  * Verifica automatizzata della patente tramite OCR/AI (pianificata per la Release 1.1).
  * Integrazione con colonnine di ricarica elettrica terze parti.
  * Calcolo di tariffe dinamiche (Surge Pricing).
  * Gestione di verbali e sanzioni amministrative del codice della strada.

---

### 3. Decomposizione in Features
Elenco delle funzionalità collegate che realizzano l'Epic e mappatura delle User Story:

| Feature ID | Titolo Feature | User Story Collegate | Priorità | Stato |
| :--- | :--- | :--- | :--- | :--- |
| `FEAT-01` | Gestione Identità e Autenticazione Utenti | **US01** (Registrazione Utente)<br>**US02** (Accesso Utente) | Must Have | Ready for Dev |
| `FEAT-02` | Mappa Interattiva e Engine di Prenotazione Multimodale | **US03** (Visualizzazione mappa)<br>**US04** (Prenotazione auto)<br>**US05** (Prenotazione bicicletta) | Must Have | In Refinement |
| `FEAT-03` | Lifecycle Management Prenotazioni | **US06** (Modifica prenotazioni)<br>**US07** (Cancellazione prenotazione) | Must Have | Backlog |
| `FEAT-04` | Gestione Piani e Abbonamenti | **US08** (Acquisto abbonamento)<br>**US09** (Disdetta abbonamento) | Should Have | Backlog |
| `FEAT-05` | Onboarding Veicoli e Telemetria GPS | **US10** (Registrazione veicolo)<br>**US11** (Tracciamento GPS) | Must Have | In Refinement |
| `FEAT-06` | Helpdesk e Gestione Emergenze in Corsa | **US12** (Apertura Ticket)<br>**US13** (Segnalazione Emergenza) | Must Have | Backlog |

---

### 4. Rischi e Dipendenze Architetturali
* **Dipendenze Esterne:**
  * Provider Mappe (es. Google Maps / Mapbox) per il rendering geografico e la geolocalizzazione dei veicoli.
  * Gateway di Pagamento (es. Stripe / Adyen) per l'elaborazione degli abbonamenti e delle prenotazioni.
  * Fornitore Hardware e Centraline IoT / GPS per l'invio costante dei flussi telematici dai veicoli.
* **Rischi Tecnici / Compliance:**
  * **Privacy e GDPR:** Il tracciamento GPS continuativo richiede un'adeguata gestione del consenso e politiche di conservazione/anonimizzazione dei dati di localizzazione.
  * **Connettività Veicoli:** Perdita di segnale GPS/4G in zone d'ombra (es. parcheggi sotterranei) durante le fasi di prenotazione, avvio corsa o segnalazione emergenza.
  * **Gestione della Concorrenza:** Gestione di prenotazioni simultanee sullo stesso veicolo da parte di utenti diversi (Overbooking).

---

### 5. Criteri di Completamento (Epic Definition of Done)
- [ ] Tutte le User Story da US01 a US13 sono state sviluppate, collaudate e accettate dal Product Owner.
- [ ] Tutti i servizi REST / GraphQL esposti rispettano le specifiche OpenAPI 3.0.
- [ ] Flusso di tracciamento GPS validato con frequenza di aggiornamento <= 5 secondi per veicoli in movimento.
- [ ] Processi di emergenza e apertura ticket integrati con la dashboard degli operatori di supporto.
- [ ] Test di carico completati con successo simulando la gestione simultanea di prenotazioni e streaming GPS di flotta.
- [ ] Documentazione architetturale, manuali API e informative GDPR ufficialmente approvati.