[...]
![[Pasted image 20240415110800.png | I C | 350x300]]

- I centri di direzione sono specifici per il tipo di istruzione. Tutte queste unità funzionali lavorano in parallelo
	- Di conseguenza, potendo terminare in tempi diversi questo tipo di esecuzione può comportare un riordinamento delle istruzioni.

- Un'istruzione genera una variazione dello stato della CPU (le istruzione generano una variazione di contenuto o nel register file o nella memoria, e quando questo succede si verifica un cambio di stato della CPU).

- Tutte le unità funzionali mandano il proprio output alla Commit Unit, che si occupa di applicare gli effetti di tutte le istruzioni nell'ordine corretto, ossia non compromettendo la semantica dell'istruzione.
	- Di conseguenza, se un'istruzione a successiva ad un'istruzione b viene eseguita prima, questa dovrà aspettare per l'esecuzione dell'istruzione b nella commit unit.

- La reservation station è un buffer che all'arrivo di un'istruzione ne crea un record che contiene:
	- L'operazione che i deve svolgere, ad esempio add
	- Il valore degli operandi su cui deve svolgere l'operazione
- Non è una copia dell'istruzione, ma piuttosto una sua "concretizzazione"


