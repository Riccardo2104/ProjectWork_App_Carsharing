# EPIC-001: Piattaforma Integrata di Mobilità Condivisa Multi-Veicolo (Smart Vehicle Sharing & Fleet IoT)

| Campo | Specifica |
| :--- | :--- |
| **ID** | EPIC-001 |
| **Titolo** | Piattaforma Integrata di Mobilità Condivisa Multi-Veicolo (Smart Vehicle Sharing & Fleet IoT) |
| **Iniziativa / Theme** | Mobilità Sostenibile e Trasporto Urbano Connesso (Green Smart Mobility) |
| **Owner / PM** | Lead Product Manager & Tech Lead Core Mobility |
| **Stato** | In Refinement / Ready for Dev |
| **Target Release / Milestone** | MVP 1.0 |
| **Priorità Strategica** | Must Have (P1) |

---

### 1. Obiettivo Strategico e Business Outcome
* **Problema di Business:** L'assenza di un ecosistema digitale unificato per la mobilità urbana genera frammentazione nei trasporti cittadini, costi elevati di gestione della flotta e attrito per gli utenti, impossibilitati a prenotare, sbloccare e guidare in modo flessibile auto e biciclette tramite un'unica interfaccia digitale sicura.
* **Valore Atteso:** Realizzazione della piattaforma core end-to-end che consenta a cittadini e pendolari l'accesso on-demand a mezzi a basso impatto ambientale (auto e bici), garantendo all'azienda il pieno controllo telemetrico della flotta, flussi di ricavo ricorrenti (abbonamenti e pay-per-use) e tempestività nei soccorsi in corsa.
* **Metriche di Successo (KPI / OKR):**
  * **Time-to-Vehicle:** Riduzione del tempo medio di localizzazione e presa in carico del veicolo < 60 secondi complessivi.
  * **Successo IoT & Sblocchi:** Tasso di completamento degli sblocchi e comandi telemetrici senza errori hardware > 99.2%.
  * **Concorrenza & Affidabilità:** 0% di doppie prenotazioni o race conditions su mezzi contesi.
  * **SLA Sicurezza & Assistenza:** Presa in carico degli alert SOS di emergenza in corsa < 2 secondi con geolocalizzazione al 100%.

---

### 2. Perimetro Funzionale (Scoping)
* **In Scope (Cosa include questa Epic):**
  * **Onboarding & Autenticazione:** Registrazione anagrafica (Nome, Cognome, Età, Data di nascita), verifica maggiore età, gestione consensi GDPR e autenticazione sicura con token JWT.
  * **Esplorazione Geospaziale & Mappa:** Mappa interattiva in tempo reale con visualizzazione differenziata di auto e biciclette libere, filtraggio per raggio e livello di autonomia residua.
  * **Motore di Prenotazione (Booking Engine):** Prenotazione con hold timer di 15 minuti per le auto, sblocco rapido biciclette tramite scansione QR code / smart lock.
  * **Ciclo di Vita della Prenotazione:** Proroga del blocco temporaneo, sostituzione del mezzo assegnato e cancellazione tempestiva con applicazione policy di penale/rimborso.
  * **Billing & Abbonamenti:** Catalogo piani (mensili, annuali, bundle minuti), checkout sicuro PCI-DSS e gestione trasparente della disdetta del rinnovo periodico.
  * **Censimento Flotta & Telemetria IoT:** Registrazione nuovi mezzi con associazione centralina di bordo, ricezione flussi continui di telemetria GPS, monitoraggio geofencing e storico viaggi.
  * **Customer Care & Safety:** Sistema di apertura ticket di supporto con foto e storico noleggi, pulsante SOS di emergenza in corsa con chiamata automatica al 112 e inoltro coordinate d'urgenza.
* **Out of Scope (Esclusioni esplicite e differite a release successive):**
  * Sistema proprietario di navigazione satellitare turn-by-turn in-app (demandato a integrazione con Google Maps / Apple Maps).
  * Gestione telepedaggi autostradali automatizzati (es. Telepass integrato a bordo).
  * Carpooling tra utenti privati (condivisione del tragitto con passeggeri sconosciuti).
  * Ricarica automatizzata robotizzata per veicoli elettrici.

---

### 3. Decomposizione in Features
Elenco esaustivo di tutte le funzionalità collegate che realizzano l'Epic complessiva, coprendo l'intero catalogo delle 13 User Stories:

| Feature ID | Titolo Feature | User Stories Collegate | Priorità | Stato |
| :--- | :--- | :--- | :--- | :--- |
| `FEAT-01` | **Identità, Onboarding Anagrafico e Sessioni Sicure** | **US01** (Registrazione Utente), **US02** (Accesso Utente) | Must Have | Ready for Dev |
| `FEAT-02` | **Motore Cartografico e Ricerca Georeferenziata Veicoli** | **US03** (Visualizzazione veicoli mappa) | Must Have | Ready for Dev |
| `FEAT-03` | **Booking Engine Concorrente e Blocco Temporaneo Auto** | **US04** (Prenotazione auto) | Must Have | Ready for Dev |
| `FEAT-04` | **Noleggio e Sblocco Istantaneo Micromobilità (Bici/E-Bike)** | **US05** (Prenotazione bicicletta) | Must Have | Ready for Dev |
| `FEAT-05` | **Gestione Flessibile, Estensione e Cancellazione Prenotazioni** | **US06** (Modifica prenotazioni), **US07** (Cancellazione prenotazione) | Must Have | Ready for Dev |
| `FEAT-06` | **Monetizzazione, Gestione Abbonamenti e Ricorrenze** | **US08** (Acquisto abbonamento), **US09** (Disdetta abbonamento) | Must Have | Ready for Dev |
| `FEAT-07` | **Censimento Flotta, Telemetria e Tracciamento GPS IoT** | **US10** (Registrazione veicolo), **US11** (Tracciamento GPS) | Must Have | Ready for Dev |
| `FEAT-08` | **Canale Assistenza Clienti e Gestione Segnalazioni** | **US12** (Apertura Ticket di Supporto) | Should Have | Ready for Dev |
| `FEAT-09` | **Sistema di Sicurezza Attiva, Geotag SOS e Chiamata Emergenze** | **US13** (Segnalazione Emergenza in Corsa) | Must Have | Ready for Dev |

---

### 4. Rischi e Dipendenze Architetturali
* **Dipendenze Esterne:**
  * **Provider Mappe Geospaziali:** Mapbox / Google Maps SDK per la renderizzazione e il geocoding.
  * **Payment Service Provider:** Stripe / Adyen conforme a PSD2 (Strong Customer Authentication) per pagamenti e abbonamenti ricorrenti.
  * **Infrastruttura IoT & Broker MQTT:** Broker scalabile (EMQX / AWS IoT Core) per il dialogo bidirezionale con centraline veicolo e smart lock.
  * **Gateway Email & SMS:** Provider per comunicazioni transazionali (AWS SES / Twilio).
* **Rischi Tecnici / Compliance:**
  * **Zone d'Ombra Rete Cellulare:** Possibile perdita di connettività GPS/telemetria nei parcheggi interrati; mitigata da meccanismi di buffering locale a bordo centralina con sincronizzazione differita e sblocco locale via Bluetooth (BLE).
  * **Concorrenza Estrema:** Rischio di race condition su prenotazioni simultanee dello stesso veicolo; mitigato con distributed locking Redis e transazioni atomiche a livello di database.
  * **Conformità Privacy & GDPR:** Conservazione cifrata dei dati personali anagrafici e pseudonimizzazione delle tracce GPS storiche al termine della corsa.

---

### 5. Criteri di Completamento (Epic Definition of Done)
- [ ] Tutte le 9 Features (`FEAT-01` .. `FEAT-09`) e le 13 User Stories collegate (`US01` .. `US13`) sono state implementate, testate e hanno superato con successo i test di collaudo UAT.
- [ ] Contratti API completi, standardizzati secondo le specifiche OpenAPI 3.0 e corredati di documentazione Swagger interattiva.
- [ ] Pipeline CI/CD attiva con suite di test automatizzati (Unitari, Integrazione, E2E) con code coverage minima certificata > 80%.
- [ ] Rispetto degli standard di sicurezza OWASP e conformità ai protocolli PCI-DSS e GDPR verificati mediante audit di sicurezza e penetration test.
- [ ] Resilienza e scalabilità dell'infrastruttura di ingestione telemetrica testate sotto carico simulato di almeno 10.000 eventi/minuto con latenza < 2s.
- [ ] Tutte le metriche KPI definite al punto 1 misurate e convalidate in ambiente di staging e pilota pre-release.
