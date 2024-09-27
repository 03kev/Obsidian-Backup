# Lezione 1 - 24/09/2024

## Introduzione 

Obiettivi del sistema operativo: astrazione e virtualizzazione.

### Esame

Laboratorio esame: si foclizza su tre esempi, linux android e windows, per capire come i principi fondamentali del corso siano usati in questi tre sistemi.
- è opzionale, è aggiuntivo: può dare un bonus di 3 punti (non è previsto un decremento)

Per superare i due esami di teoria (sis op I e sis op II) bisogna rispondere in modo sufficiente a tutte e 3 le domande. La sufficienza viene guardata domanda per domanda.
- per questo motivo le domande sono generali: ciò non significa che pero' bisogni rispondere in modo generico, bisogna lo stesso entrare nel dettaglio su certi argomenti richiesti.

## Lezione 1 - Macchina di von Neumann: architettura e funzionamento

(se proprio c'è bisogno di ricordarsi queste cose guardarsi le slide di Basilico)

Riprende ciò che è già stato visto in Architettura degli Elaboratori:
- CPU, memoria centrale (connessi tramite il bus di memoria)
- Interfaccia input/output (connessi tramite il bus di I/O) -> periferiche
- Fetch, decode, execute 

- Figure strutturali dei linguaggi di programmazione (condizioni, cicli, ...)

- Attività asincrone:
    - interruzione: il processore non deve fare le fasi di fetch, decode ed execute in serie e sempre, ma si deve accorgere anche degli eveni esterni e interrompere il flusso di esecuzione per gestirli.

## Lezione 2

- Chiamata di procedura (laboratorio di assembly)
    - come avviene
    - come si usa lo stack

- Risposta alle interruzioni
