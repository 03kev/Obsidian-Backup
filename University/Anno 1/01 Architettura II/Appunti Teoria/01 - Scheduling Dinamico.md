[...]
![[Pasted image 20240415110800.png | I C | 350x300]]

- I centri di direzione sono specifici per il tipo di istruzione. Tutte queste unità funzionali lavorano in parallelo.
	- Di conseguenza, potendo terminare in tempi diversi questo tipo di esecuzione può comportare un riordinamento delle istruzioni.
- Inoltre le unità funzionali sono dei circuiti combinatori, e in base al tipo di istruzione che devono eseguire questi sono ovviamente semplificati.

- Un'istruzione genera una variazione dello stato della CPU (le istruzione generano una variazione di contenuto o nel register file o nella memoria, e quando questo succede si verifica un cambio di stato della CPU).

- Tutte le unità funzionali mandano il proprio output alla Commit Unit, che si occupa di applicare gli effetti di tutte le istruzioni nell'ordine corretto, ossia non compromettendo la semantica dell'istruzione.
	- Di conseguenza, se un'istruzione a successiva ad un'istruzione b viene eseguita prima, questa dovrà aspettare per l'esecuzione dell'istruzione b nella commit unit.

La reservation station è un buffer che all'arrivo di un'istruzione ne crea un record che contiene:
- L'operazione che i deve svolgere, ad esempio add
- Il valore degli operandi su cui deve svolgere l'operazione
Non è una copia dell'istruzione, ma piuttosto una sua "concretizzazione" -> VEDERE ESEMPIO SULLE SLIDE. Sono le operazioni che le istruzioni comportano:
- Se $s1 ha il valore 40, addi $s1 $s1 4 diventa nel record s1 <- 40 + 4. Nel caso invece $s1 sia una dipendenza con un'istruzione, allora nel record si scrive s1 <- □ + 4
Nell'unità funzionale poi non viene eseguita l'istruzione, ma gli operandi creati dalla reservation station.

 Se però per via di un hazard uno o più valori degli operandi non sono disponibili nel RF, il valore dell'operando non viene copiato e l'ingresso di *i* nell'unità funzionale è posto in attesa.
 - Quando il valore dell'operando è reso disponibile in una delle altre unità funzionali, allora si accede a quel valore prima ancora che venga scritto nel RF.
 - Altro vantaggio: in questa CPU si aspetta solo se ci sono degli hazard, altrimenti viene tutto eseguito in contemporanea.

Lo stato della CPU viene quindi cambiato solo quando le istruzioni vengono mandate in commit, e rigorosamente in ordine, dalla Commit Unit.

Ciò che viene fatto dalla CPU qui in runtime è molto simile a ciò che il compilatore fa con il register renaming. Guardare il secondo esempio nel quale è più chiara questa dinamica.