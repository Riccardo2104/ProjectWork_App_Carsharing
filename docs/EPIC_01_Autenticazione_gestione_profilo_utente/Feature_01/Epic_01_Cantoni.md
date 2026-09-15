# EPIC-001: Piattaforma Integrata di Sharing Mobility e Gestione Flotta

| Campo | Specifica |
| --- | --- |
| **ID** | EPIC-001 |
| **Titolo** | Piattaforma Integrata di Sharing Mobility e Gestione Flotta |
| **Iniziativa / Theme** | Mobilità Condivisa Green e Ottimizzazione della Flotta |
| **Owner / PM** | Product Manager / Tech Lead |
| **Stato** | In Refinement |
| **Target Release / Milestone** | MVP 1.0 |
| **Priorità Strategica** | Must Have |

### 1. Obiettivo Strategico e Business Outcome

* **Problema di Business:** Frammentazione dell'esperienza utente nella fruizione e condivisione dei veicoli aziendali/urbani, unita all'assenza di un tracciamento centralizzato e di un sistema tempestivo per la gestione di anomalie, abbonamenti e prenotazioni.
* **Valore Atteso:** Fornire un'unica soluzione end-to-end che consenta agli utenti di registrarsi, cercare, prenotare, condividere e gestire abbonamenti per auto e biciclette, migliorando il tasso di utilizzo della flotta e riducendo il tempo di gestione operativa dell'assistenza.
* **Metriche di Successo (KPI / OKR):**
* **Metrica 1:** Tasso di completamento delle prenotazioni (auto/bici) senza errori di sistema > 98.5%.
* **Metrica 2:** Tempo medio di risposta per la presa in carico dei ticket di emergenza e supporto < 5 minuti.
* **Metrica 3:** Accuratezza del tracciamento GPS in tempo reale > 99%.

### 2. Perimetro Funzionale (Scoping)

#### In Scope (Cosa include questa Epic):

* Gestione completa dell'Onboarding e Autenticazione utente (`US01`, `US02`).
* Mappa interattiva per la ricerca e prenotazione di auto e biciclette (`US03`, `US04`, `US05`).
* Ciclo di vita della prenotazione: modifica e cancellazione (`US06`, `US07`).
* Monetizzazione tramite gestione e disdetta abbonamenti (`US08`, `US09`).
* Piattaforma di condivisione veicoli e monitoraggio GPS in corsa (`US10`, `US11`).
* Assistenza cliente e gestione emergenze sul campo (`US12`, `US13`).

#### Out of Scope (Esclusioni esplicite e differite):

* Gestione dei pagamenti automatici di sanzioni o pedaggi autostradali.
* Integrazione con servizi di ricarica per veicoli elettrici (EV Charging stations) - *Pianificato per Release 2.0*.
* Algoritmi predittivi basati su IA per il posizionamento automatico della flotta sulla mappa.

### 3. Decomposizione in Features

Elenco delle funzionalità collegate che realizzano l'Epic e coprono tutte le User Stories dell'utente:

| Feature ID | Titolo Feature | User Stories Collegate | Priorità | Stato |
| --- | --- | --- | --- | --- |
| **FEAT-01** | Gestione Identity & Access Management (IAM) | **US01** - Registrazione Utente<br>

<br>**US02** - Accesso Utente | Must Have | Ready for Dev |
| **FEAT-02** | Mappa e Prenotazione Multimodale (Auto & Bici) | **US03** - Visualizzazione veicoli disponibili nella mappa<br>

<br>**US04** - Prenotazione auto<br>

<br>**US05** - Prenotazione bicicletta | Must Have | In Refinement |
| **FEAT-03** | Ciclo di Vita delle Prenotazioni | **US06** - Modifica prenotazioni<br>

<br>**US07** - Cancellazione prenotazione | Must Have | Backlog |
| **FEAT-04** | Gestione Abbonamenti e Piani Ricorrenti | **US08** - Acquisto abbonamento<br>

<br>**US09** - Disdetta abbonamento | Should Have | Backlog |
| **FEAT-05** | Onboarding Veicoli e Tracciamento Telemetrico IoT | **US10** - Registrazione veicolo<br>

<br>**US11** - Tracciamento GPS | Must Have | Backlog |
| **FEAT-06** | Modulo Assistenza e Safety in Corsa | **US12** - Apertura Ticket di Supporto<br>

<br>**US13** - Segnalazione Emergenza in Corsa | Must Have | In Refinement |

### 4. Rischi e Dipendenze Architetturali

* **Dipendenze Esterne:**
* Provider di Mappe/Geocoding (es. Google Maps API, Mapbox) per la localizzazione in tempo reale.
* Piattaforma Gateway IoT / centraline per il tracciamento GPS dei veicoli e l'aggiornamento di stato.
* Payment Gateway (es. Stripe) per l'elaborazione degli abbonamenti.


* **Rischi Tecnici / Compliance:**
* **GDPR e Privacy:** Il tracciamento GPS continuo (`US11`) e la raccolta di dati anagrafici personali (`US01`) richiedono adeguamento normativo, gestione del consenso e cifratura dei dati.
* **Connettività:** Gestione delle zone d'ombra della rete cellulare per il tracciamento GPS e la gestione delle prenotazioni attive.
* **Concorrenza:** Gestione del "race condition" per prenotazioni simultanee dello stesso veicolo (`US04`, `US05`).

### 5. Criteri di Completamento (Epic Definition of Done)

* Tutti i requisiti definiti nelle User Stories da **US01** a **US13** sono stati sviluppati, testati e rilasciati in ambiente di produzione.
* Le integrazioni con la mappa, il tracciamento GPS e il gateway degli abbonamenti hanno superato i test UAT (User Acceptance Testing).
* Contratti API conformi alle specifiche OpenAPI (OpenAPI Specification 3.0).
* Documentazione tecnica, schemi dei dati utente/veicolo e architetturale aggiornati nel dossier di progetto.
* Conformità al GDPR verificata (politiche di conservazione dati GPS ed età dell'utente per validazione contrattuale).
* Metriche KPI verificate in ambiente di staging/pilota.