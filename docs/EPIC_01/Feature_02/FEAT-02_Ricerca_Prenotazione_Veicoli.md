# FEAT-02: Ricerca e Prenotazione Veicoli

| Campo | Specifica |
| :--- | :--- |
| **ID** | FEAT-02 |
| **Titolo** | Ricerca e Prenotazione Veicoli |
| **Parent Epic** | EPIC-001 Piattaforma di Car/Bike Sharing tra Privati con Flotta Aziendale |
| **Owner / Lead** | Da assegnare |
| **Stato** | In Refinement |
| **Target Release** | MVP 1.0 |
| **Priorità** | Must Have |

---

### 1. Descrizione e Valore Utente
* **Descrizione Funzionale:** Consente all'utente autenticato di visualizzare su una mappa i veicoli disponibili — auto e biciclette, sia della flotta aziendale sia di privati condivisori — e di prenotare direttamente un'automobile o una bicicletta entro 24 ore dal primo giorno di disponibilità del veicolo, con addebito automatico tramite il metodo di pagamento registrato sull'account.
* **Bisogno Utente / Pain Point:** Senza questa feature l'utente non avrebbe modo di individuare i veicoli realmente disponibili nella propria zona né di riservarli, rendendo inutilizzabile l'intera piattaforma di condivisione; la mappa unifica in un solo punto di accesso l'offerta di flotta e privati, altrimenti frammentata.

---

### 2. Regole di Business e Requisiti Funzionali
1. In mappa sono mostrati solo i veicoli con stato "disponibile" (non già prenotati), distinguendo visivamente auto da biciclette e veicoli di flotta da veicoli privati (US03).
2. La posizione dei veicoli mostrata in mappa deriva dal tracciamento GPS (US11) ed è aggiornata in forma aggregata, senza esporre la posizione precisa in tempo reale del proprietario privato.
3. Una prenotazione (auto o bicicletta) può essere richiesta solo entro 24 ore dal primo giorno di disponibilità del veicolo selezionato (US04, US05).
4. Al momento della conferma della prenotazione, il sistema verifica la disponibilità effettiva del veicolo per il periodo richiesto prima di procedere all'addebito.
5. L'addebito dell'importo avviene automaticamente tramite il metodo di pagamento registrato sull'account dell'utente, sia per le auto sia per le biciclette (US04, US05).
6. Il meccanismo di prenotazione è identico indipendentemente dal fatto che il veicolo appartenga alla flotta aziendale o a un privato condivisore.

---

### 3. Requisiti Non Funzionali (FURPS+)
* **Performance:** Caricamento dei marker dei veicoli disponibili in mappa e conferma della prenotazione restituiti all'utente in tempi rapidi, senza percettibile attesa nell'interazione con la mappa.
* **Security:** L'accesso alla mappa e alla prenotazione è consentito solo a utenti autenticati (dipendenza da FEAT-01 Autenticazione); l'addebito automatico avviene esclusivamente sul metodo di pagamento registrato e verificato sull'account dell'utente.
* **Usability:** Distinzione visiva chiara tra tipologia di veicolo (auto/bicicletta) e proprietà (flotta/privato) sui marker della mappa; messaggi espliciti quando un veicolo non è più disponibile o quando la richiesta eccede la finestra delle 24 ore.

---

### 4. Decomposizione in User Stories
Elenco delle User Stories atomiche che realizzano la Feature:

| User Story ID | Titolo Story | Punti (SP) | Stato |
| :--- | :--- | :--- | :--- |
| `US03` | Visualizzazione veicoli disponibili nella mappa | 3 | In Refinement |
| `US04` | Prenotazione auto | 5 | In Refinement |
| `US05` | Prenotazione bicicletta | 3 | In Refinement |

---

### 5. Criteri di Accettazione della Feature (Feature Acceptance Criteria)
- [ ] Il flusso nominale (Happy Path) — visualizzazione mappa, selezione veicolo disponibile, conferma prenotazione entro 24 ore, addebito automatico — è completabile dall'interfaccia client.
- [ ] I casi limite ed eccezioni (nessun veicolo disponibile nell'area, richiesta fuori dalla finestra delle 24 ore, veicolo prenotato da un altro utente nel frattempo) sono gestiti con feedback chiaro all'utente.
- [ ] La feature è integrata e validata nell'ambiente di collaudo con esito positivo dei test di integrazione, inclusa la verifica di assenza di doppie prenotazioni concorrenti sullo stesso veicolo.
