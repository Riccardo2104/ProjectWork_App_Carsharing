EPIC-001: Ecar

| **ID**                         | EPIC-001                                                         |
| ------------------------------ | ---------------------------------------------------------------- |
| **Titolo**                     | Piattaforma di Car/Bike Sharing tra Privati con Flotta Aziendale |
| **Iniziativa / Theme**         | Mobilità Condivisa Urbana                                        |
| **Owner / PM**                 | Da assegnare                                                     |
| **Stato**                      | Draft                                                            |
| **Target Release / Milestone** | MVP 1.0                                                          |
| **Priorità Strategica**        | Must Have / P1                                                   |

# **1\. Obiettivo Strategico e Business Outcome**

**Problema di Business:** Gli utenti che necessitano di mobilità occasionale (auto o bicicletta) non dispongono di un unico punto di accesso che combini veicoli di una flotta aziendale e veicoli messi a disposizione da privati, con conseguente frammentazione dell'offerta e sotto-utilizzo dei veicoli privati inattivi.

**Valore Atteso:** Un'unica piattaforma che funge da intermediario tra privati per la condivisione di veicoli, integrata con una flotta aziendale propria, ampliando la disponibilità di veicoli prenotabili e generando ricavi sia dalle prenotazioni dirette sia dagli abbonamenti.

**Metriche di Successo (KPI / OKR):**

- Metrica 1: Percentuale di prenotazioni completate senza modifiche o cancellazioni fuori termine > 90%.
- Metrica 2: Tempo medio tra registrazione di un veicolo privato e prima prenotazione ricevuta < 7 giorni.
- Metrica 3: Tasso di risoluzione dei ticket di assistenza entro 24 ore > 95%.

# **2\. Perimetro Funzionale (Scoping)**

**In Scope (Cosa include questa Epic):**

- Registrazione e accesso utenti, con conferma email e autenticazione a due fattori.
- Visualizzazione su mappa dei veicoli disponibili (flotta aziendale e veicoli privati).
- Prenotazione, modifica e cancellazione di auto e biciclette, con vincoli temporali (24h/48h).
- Acquisto e disdetta di un abbonamento a condizioni agevolate.
- Registrazione di veicoli da parte di privati condivisori, con generazione automatica di ID e tracciamento GPS fornito dalla società.
- Apertura di ticket di assistenza e segnalazione di emergenze durante una corsa attiva.

**Out of Scope (Esclusioni esplicite e differite):**

- Gestione di pagamenti con provider specifici o metodi di pagamento alternativi (dettaglio da definire in fase implementativa).
- Piani di abbonamento multipli o differenziati (attualmente previsto un solo piano).
- Ruoli di amministrazione e manutenzione della piattaforma (attore ipotizzato ma non confermato nei requisiti).
- Categorizzazione avanzata, priorità o SLA sui ticket di assistenza.

# **3\. Decomposizione in Features**

Elenco delle funzionalità collegate che realizzano l'Epic:

| **Feature ID** | **Titolo Feature**                                | **Priorità** | **Stato**     |
| -------------- | ------------------------------------------------- | ------------ | ------------- |
| FEAT-01        | Autenticazione (US01, US02)                       | Must Have    | In Refinement |
| FEAT-02        | Ricerca e Prenotazione Veicoli (US03, US04, US05) | Must Have    | In Refinement |
| FEAT-03        | Gestione Prenotazioni (US06, US07)                | Should Have  | Backlog       |
| FEAT-04        | Gestione Abbonamenti (US08, US09)                 | Should Have  | Backlog       |
| FEAT-05        | Condivisione Veicolo tra Privati (US10, US11)     | Must Have    | Backlog       |
| FEAT-06        | Assistenza e Sicurezza in Corsa (US12, US13)      | Should Have  | Backlog       |

# **4\. Rischi e Dipendenze Architetturali**

**Dipendenze Esterne:**

- Dispositivo GPS fornito dalla società da installare su ogni veicolo registrato (flotta e privati).
- Servizio di invio email per la conferma degli account (UC-001).
- Servizio di autenticazione a due fattori (UC-002).
- Sistema di gestione pagamenti per addebiti su prenotazioni e abbonamenti.

**Rischi Tecnici / Compliance:**

- Affidabilità del segnale GPS in aree con copertura scarsa, con impatto sulla mappa di disponibilità (US03) e sulla segnalazione di emergenza (US13).
- Trattamento della posizione GPS dei veicoli privati: necessità di garantire che la posizione precisa non sia condivisa in tempo reale per motivi di privacy.
- Doppie prenotazioni concorrenti sullo stesso veicolo in caso di alta concorrenza sulle richieste.
- Assenza di specifiche dettagliate su categorie/priorità dei ticket di assistenza (FEAT-06), da definire prima dello sviluppo.

# **5\. Criteri di Completamento (Epic Definition of Done)**

☐ Tutte le Features e User Stories collegate sono state rilasciate e hanno superato il collaudo UAT.

☐ Contratti API conformi alle specifiche OpenAPI.

☐ Documentazione tecnica e architetturale aggiornata nel dossier.

☐ Metriche KPI verificate in ambiente di staging/pilota.