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
- Proposizioni atomiche (di FOL) completamente istanziate: $Piove,\ Corre(Mario),\ Ama(Pippo, Anna)$

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

La **Arity** è un numero che ci dice di quante costanti il predicato ha bisogno per formare un enunciato.

Esempio:
- Piove. Affermazione, Arity = 0
- Ugo è alto. Predicato nominale che stabilisce una proprietà del soggetto. Arity = 1
- Ugo vede Gigi. Predicato verbale che stabilisce una relazione binaria fra soggetto e complemento oggetto. Arity = 2.
- Mario ha ottenuto 28 nel primo appello. Stabilisce una relazione ternaria. Arity = 3.

###### Sintassi
**Sintassi**: le proposizioni atomiche si ottengono riempiendo i posti dei predicati del linguaggio con dei sintagmi nominali, che possono essere dei semplici nomi o dei gruppi complessi con funzione di nome (un bel libro, il padre di Carla).

In FOL, il linguaggio di un contesto comprende:
1) Costanti, ossia nomi per indicare oggetti
	- Luigi, 45, pluto, ecc...
2) Predicati (n-ari) per definire proprietà o mettere in relazione oggetti
	- "Cane( \_<sub>1</sub> )" -> predicato unario: corrisponde a frasi del tipo "_ è un cane", "il cane \_" ; esprime una proprietà degli individui
	- "Rincorre( \_<sub>1</sub>, \_<sub>2</sub> )" -> predicato binario: corrisponde a frasi del tipo "_ riconcorre \_"; esprime una relazione fra chi rincorre, nel posto 1, e chi è rincorso, nel posto 2.
	- Ecc...
3) Funzioni (n-arie) per indicare oggetti indirettamente
	- Padre di _ .

Sintassi delle proposizioni atomiche in FOL: si ottengono riempiendo i posti dei predicati del linguaggio (che esprimono proprietà o relazioni) con delle costanti, ad esempio:
- "Gatto(Felix), "Rincorre(Fido, Felix), "Piove", ecc...
#### La logica delle proposizioni atomiche
##### Contesto
Un contesto è un insieme di circostanze. 
- $Cube(a) \rightarrow \neg Dodec(a)$: se a è un cubo allora non è un dodecaedro -> è vera nel contesto dei blocchi in ogni circostanza.

Fissare però un contesto è un'operazione extra-logica. Noi infatti dobbiamo solo assumere che un contesto fissi un insieme di circostanze a noi ben noto.

Quando si lavora nella logica pura (FOL) si devono considerare tutte le circostanze di ogni possibile contesto, ossia tutti i modi matematicamente validi di interpretare i simboli del linguaggio. Non vi è alcuna informazione di contesto. Se nessun contesto è specificato si intente che si sta ragionando nella logica pura (FOL).

###### Semantica delle proposizioni atomiche (interpretazione)
**Semantica**: le circostanze possibili dipendono dal contesto. In una circostanza:
- Una costante denota un unico oggetto.
- Una proposizione atomica è vera se la proprietà o relazione espressa dal predicato vale per gli oggetti indicati dalle costanti, altrimenti è falsa.

###### In breve:
- Contesto: insieme di circostanze. Gli si associa un Linguaggio.
- Linguaggio: dato da costanti + predicati (n-ari) + funzioni (n-arie).
- Proposizioni atomiche: predicati completamente istanziati (in ogni posto) con costanti.
- Interpretazione (in una circostanza): fissato l'universo del discorso A:
	- Costanti: elementi dell'universo del discorso: $I(c) \in A$.
	- Predicati (n-ari): relazioni (n-arie) sull'universo del discorso: $I(P) \subseteq A^n$. 
	- Proposizione atomica: 
	  $P(c_{1}, \ldots, c_{n})$ è vera (nella data interpretazione) $\iff (I(c_{1}, \ldots, I(c_{n})) \in I(P)$ 
