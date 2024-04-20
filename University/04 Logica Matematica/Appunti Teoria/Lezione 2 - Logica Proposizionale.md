#### Introduzione alla Logica Proposizionale

Per logica proposizionale si intende sia la logica delle lettere proposizionali (P, Q, R, ...), sia la logica dei predicati atomici (enunciati semplici) completamente istanziati (senza variabili).
- ( Si chiama inoltre logica delle proposizioni atomiche la logica degli enunciati semplici insieme alla relazione di identità ).

##### Logica degli enunciati e dei connettivi
**Enunciato**: frase interpretata come vera o falsa in una data circostanza
> Piove, Mario corre, piove e Mario corre, Pippo non ama Anna

**Enunciato Semplice**: enunciato che non è composto da altri enunciati usando i connettivi
>Piove, Mario corre, Pippo ama Anna

Formalizzazione degli enunciati semplici:
- Lettere proposizionali: $P, Q, R$ (astrazione)
- Proposizioni atomiche (di FOL), completamente istanziate: $Piove,\ Corre(Mario),\ Ama(Pippo, Anna)$

Esempio: Se piove prendo l'ombrello
- Formalizzazione con lettere proposizionali: $P \rightarrow Q$  
- Formalizzazione con proposizioni atomiche: $Piove \rightarrow Ombrello$ 

##### Propozioni Atomiche
Le proposizioni atomiche sono le più semplici frasi con senso compiuto interpretabili come vere o false in una data circostanda di un contesto. Un contesto sottointende:
1) Un linguaggio, caraterizzato da:
	- vocabolario (in informatica detto segnatura)
	- sintassi
2) Una semantica, caraterizzata da:
	- circostanze possibili
	- interpretazione, procedimento attraverso il quale attribuiamo un valore di verità T o F alla proposizione in una data circostanza