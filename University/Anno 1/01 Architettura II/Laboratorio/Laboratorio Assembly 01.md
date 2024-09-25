- Tutte le istruzioni sono codificate in 32 bit
- I registri, che sono 32, hanno ciasciuno 32 bit.
- Gli indirizzi di memoria sono di 32 bit.

#### Registri
- I registri utente sono 32, e possono essere utilizzati come input o output da tutte le operazioni.
	- Il registro $0 contiene sempre il valore zero
- I registri non utente non sono utilizzabili nè in lettura nè in scrittura dalle normali operazioni e sono:
	- **PC**: contiene l'indirizzo della prossima istruzione da eseguire
	- **Hi & Lo**: due registri che contengono il risultato delle operazioni di molitplicazione e divisione (intera)
	- <span style="color:rgb(124, 124, 124)">EPC, Cause, BadVAddr, Status: vengono usati nella gestione delle eccezioni</span>

##### Istruzioni aritmetiche
![[Pasted image 20240410105019.png | I C | 740]]
- Come si può vedere dalla tabella, sommare due registri e sommare un registro con una costante richiedono due comandi diversi: add e addi
- I comandi unsigned ignorano l'overflow, mentre quelli signed lo riportano

##### Inizializzare i registri
Non esiste un comando per inizializzare direttamente i registri: per farlo si usa il registro speciale $zero:
`addi $5 $zero 2` somma 2 a 0 e lo salva nel registro $5.
2
Essendo però la costante in addi direttamente salvata nell'istruzione mips, a questa vengono concessi solo 16 bit per il campo immediate, ossia quello in cui viene salvato il valore della costante (gli altri servono per l'opcode e per i registri da usare).
![[Pasted image 20240410110908.png | II]]

Si usano quindi due istruzioni `lui` e `ori` per poter salvare in un registro costanti superiori ai 16 bit:
- `lui $t1 0x1234` Load upper immediate: assegna i 16 upper-bits del registro $t1 al campo immediate e i 16 lower-bits con zero. $t1 è un registro di appoggio.
- `ori $t2 $t1 0x5678` Bitwise OR immediate: effettua un or bit a bit fra $t1 e il campo immediate esteso con zeri, e lo salva in $t2.

###### Pseudoistruzione li
Il MIPS permette di usare una pseudoistruzione che ottiene lo stesso effetto: `li $5 2` 
- L'assembler MIPS traduce automaticamente questa pseudoistruzione nell'istruzione reale MIPS `addi $5 $zero 2`

Nello stesso modo questa pseudoistruzione può essere usata per salvare un campo immediate che supera i 16 bit: `li $5 0x12345678`. Viene poi tradotta dall'assembler in `lui $5 0x1234; ori $5 $1 0x5678`
- Come registro di appoggia si usa un registro che per convenzione non è mai usato dai nostri programmi, ossia il registro '$ra'.

***
#### Memoria in MIPS
![[Pasted image 20240410112409.png | I C | 400]]

- Il segmento riservato contiene il sistema operativo, ecc...
- Il segmento testo contiene le istruzioni del programma da eseguire (il PC è di default inizializzato all'inizio di questo segmento)
- Il segmento dati contiene i dati, sia statici che dinamici

##### Parola
![[Pasted image 20240426165113.png | II R | 150]]In MIPS una parola occupa 32 bit, ossia 4 byte. Gli indirizzi di due parole consecutive differiscono di 4 byte.

<span style="color:rgb(124, 124, 124)">In MIPS la dimensione di una parola di RAM = dimensione di un registro = dimensione di un'istruzione = dimensione di un indirizzo di RAM.</span>

##### Lettura e scrittura in RAM
![[Pasted image 20240410112835.png | I C | 500]]
- Il primo operando è il registro dal / al quale operare, mentre il secondo è il registro che contiene l'indirizzo RAM.
- Il numero prima delle parentesi è l'offset che viene aggiunto all'indirizzo. Se non è specificato, vale 0.
<tab>
</tab> 
- Lettura della memoria: **Load Word**
	- `lw $s1, 100($s2)` \$s1 $\leftarrow$ M[[$s2]+100]
- Scrittura verso la memoria: **Store Word**
	- `sw $s1, 100($s2)` M[[$s2]+100] $\leftarrow$ $s1

La memoria è indirizzata come un vettore: indirizzo base + offset identificano la posizione della parola da scrivere o leggere. L'offset è in byte.

<span style="color:rgb(124, 124, 124)">[ Istruzione LA: LOAD ADDRESS ]</span>

#### Direttive Assembler
- `.data` dice all'assembler che ciò che segue sono dati da memorizzare nel segmento *data* della RAM, e lo fa nell'ordine specificato. 
- `.text` invece gli dice che ciò che segue sono istruzioni da memorizzare nel segmento *text* della RAM, e nell'ordine specificato.

###### Vettori
Si consideri un vettore $V$ dove ogni elemento $V[\ i\ ]$ è una parola di memoria (32 bit). 
- Gli array sono memorizzati in modo sequenziale: si consideri $b$ come il registro base di $V$, che è anche l'indirizzo di $V[\ 0\ ]$. L'elemento $i$-esimo ha indirizzo $b\ +\  4*i$. 

```wasm unwrap title:"Vettori"
.data
	4 5 12 4 12 30 13
	(; è un vettore V di 7 elementi contenuti nel segmento dati statici, ognuno
	   codificato da un word ;)

.text
	li $7 0x10010000 (; metto in $t7 l'indirizzo del primo elemento ;)
	
	lw $9 ($7) (; leggo in $t0 il primo elemento, V[0] ;)
	lw $9 4($7) (; V[1] ;)
	lw $9 24($7) (; V[6] ;)
```

##### Direttive per il segmento dati
- `.word`: i valori che seguono sono memorizzati in una parola ciascuno (4 byte)
- `.half`: i valori che seguono sono memorizzati in half-word ciascuno (2 byte)
- `.byte`: i valori che seguono sono memorizzati in un singolo byte ciascuno
- `.space N`: lascia N byte non utilizzati prima del dato successivo 
###### Allineamento Dati
L'accesso a memoria è allineato su $n$ byte se ogni dato di dimensione $n$ byte comincia ad un indirizzo multiplo di $n$, con $n$ potenza di $2$.
- In Mips l'accesso a word è allineato a $4$: il loro indirizzo deve perciò essere un multiplo di $4$, altrimenti viene generato un errore a runtime.
- L'accesso agli half-word è invece allineato a $2$.

`.align n` lacia un certo numero di byte vuoti prima del prossimo dato, in modo da rendere la sua posizione di memoria divisibile per $2^n$, rendendolo di fatto allineato.
- Questo lascia da un minimo di $0$ fino ad un massimo di $2^n - 1$ byte

