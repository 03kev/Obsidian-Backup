L'uso dei registri utente è soggetto ad alcune convenzioni d'uso. Per agovolarne l'uso, l'assembler consente di riferirsi ad un registro non solo con il suo numero ma anche con il suo nome standard
- Per esempio, i registri denominati $t (temporanei) ed $s (save) non hanno un uso specifico, ma sono usati per i valori su cui lavorare con i comandi comuni.

#### Moltiplicazioni e Divisioni fra Interi
##### Istruzione mult
Il risultato di un prodotto fra word a 32 bit è potenzialmente un numero a 64 bit.

Di conseguenza `mult $t3 $t4` produce il risultato in due registri speciali:
- `HI` che contiene i 32 bit più significativi
- `LO` che contiene i 32 bit meno significativi

I due registri HI e LO non sono parte dei 32 registri utente, ma vengono solo scritti dalle operazioni. Possono essere acceduti soltanto copiando il loro valore in un registro a scelta:
- `mfhi $t1` copia in $t1 il registro HI
- `mflo $t2` copia in $t2 il registro LO

##### Istruzione div
Il risultato di una divisione fra interi produce contemporaneamente due risultati: il quoziente e il resto.

Di conseguenza `div $t3 $t4` produce il risultato in due registri speciali:
- `HI` che contiene il resto
- `LO` che contiene il quoziente

I due registri HI sono acceduti nella stessa maniera di prima:
- `mfhi $t1` copia in $t1 il registro HI
- `mflo $t2` copia in $t2 il registro LO

##### Pseudo-istruzione mul
Si usa mul quando il risultato del prodotto è contenibile nel solo registro speciale LO:
- `mul $t1 $t3 $t4` $t1 \leftarrow t3 \times t4$ 

Che è poi tradotta dall'assembler in:
- `mult $t3 $t4; mflo $t1`

Questa pseudoistruzione mul usa direttamente i registri, e perciò il risultato può occupare al massimo una parola. L'istruzione mult invece usa entrambi i registri HI e LO e permette di conseguenza di avere risultati che hanno bisogno di due parole per essere espressi.

##### Pseudo-istruzioni div e rem
###### div
Si usa div quando è necessario avere solo il quoziente della divisione:
- `div $t1 $t3 $t4` $t1 \leftarrow t3\ /\ t4$ 

Che è poi tradotta dall'assembler in:
- `div $t3 $t4; mflo $t1`

Questa pseudo-istruzione div ha lo stesso nome dell'istruzione, e viene distinta solo in base al numero di parametri che la seguono: 3 nel primo caso, 2 nel secondo.
###### rem
Si usa rem quando è necessario avere solo il resto della divisione:
- `rem $t1 $t3 $t4` $t1 \leftarrow t3\ \%\ t4$ 

Che è poi tradotta dall'assembler in:
- `div $t3 $t4; mfhi $t1`

#### Memoria dati (statica)
Il segmento .data contiene i dati del programma statici, ossia che rimangono allocati dall'inizio alla fine dell'esecuzione del programma.

##### Label
Una label è un segnalibro fisso posto in un indirizzo della memoria statica di cui tiene traccia l'assembler

```wasm unwrap title:Label
	.data
qui: (; è definita la label: l'assembler si segna l'address del dato successivo ;)
	5000
	
	.text
	la $t1 qui (; assegna a t1 l'address corrispondente alla label qui ;)
	lw $t0 ($t1) (; carica in t0 il word all'indirizzo RAM in t1, quindi 5000 ;)
```

##### Direttive per la specifica dati
- Come visto in precedenza `.word`, `.half`, `.byte`, `.space n`, `.align n`
- `.ascii` specifica che ogni stringa che segue, messa fra virgolette, è uguale ad un byte per lettere, ossia il suo codice ASCII.
- `.asciiz` funziona come .ascii, ma aggiunge un ulteriore byte 0x00 per terminare la stringa.

***

L'indirizzo di una parola di memoria è anche l'indirizzo di uno dei 4 byte che compongono quella parola. Il quale sia tra i 4 dipende dall'ordine dei byte, e quindi dal fatto che l'architettura sia in big endian o little endian.
![[Pasted image 20240427131858.png || I C | 700]]
###### Direttiva .byte
La direttiva byte specifica che i dati che seguono occupano un byte ciascuno.
`.byte 0xAA 0xBB 0xCC 0xDD` è equivalente a:
- `.word 0xDDCCBBAA` in little endian
- `.word 0xAABBCCDD` in big endian

###### Direttiva .half
La direttiva half-word specifica che i dati che seguono occupano due byte ciascuno.
`.byte 0xAABB 0xCCDD` è equivalente a `.word 0xAABBCCDD` in big endian

###### Dati numerici
- Si possono esprimere i valori anche in esadecimale.
- Si possono esprimere anche i valori come numeri negativi, che vengono interpretati in complemento a 2 (esempi sulle slide).

###### Direttive .ascii e .asciiz
`.ascii "Derp"` è equivalente a `.byte 0x44 0x64 0x72 0x70`
- Ogni lettera della stringa che segue .ascii è tradotta in un codice ascii di un byte.

`.asciiz "Derp"` è equivalente a `.byte 0x44 0x64 0x72 0x70 0x00`

###### Vettori (array)
Un array non è altro che una sequenza di $n$ dati in RAM dello setsso formato, stessa dimensione e memorizzati in sequenza (ossia ad indirizzi successivi)
- Un array di interi è una successione di words agli indirizzi $n,\ n+4,\ n+8\ ...$ 

Gli array sono memorizzati in modo sequenziale: si consideri $b$ come il registro da cui parte un array $V$, che è anche l'indirizzo di $V[\ 0\ ]$. L'elemento $i$-esimo ha indirizzo $b\ +\  4*i$. 

```wasm unwrap title:Arrays
	.data
voti: .word 28 21 30 27 24
	
	.text
	la $s0 voti (; s0 <- indirizzo array voti (ossia di voti[0]) ;)
	lw $t5 ($s1) (; t5 <- voti[0] ;)
	lw $t5 12($s1) (; t5 <- voti[3] ;)
```

###### Direttiva .space n
Con la direttiva `.space n` si dice all'assembler di lasciare $n$ byte vuoti in RAM prima di scrivere il dato successivo. 
- Non è previsto che venga cancellata.

Se il programma legge da questo spazio prima di scriverci può trovare un qualsiasi valore.
- Per esempio, il valore lasciato in quell'area di memoria da un programma precedentemente eseguito.
- Per tal motivo è detta "Memoria sporca"

<span style="color:rgb(124, 124, 124)">Un programma corretto scrive nella memoria RAM riservata in questo modo, prima di leggerla</span>

##### Lettura e scrittura RAM
- [[Laboratorio Assembly 01#Lettura e scrittura in RAM|Laboratorio 01]] 
###### Load e Store di half-words
- Quando si caricano half-words (`lh`) o bytes (`lb`), MIPS estende in segno
- La versione unsigned `lhu` estende invece con zeri

#### Chiamate di sistema

###### Livelli di astrazione in un elaboratore
--- start-multi-column: 
```column-settings
Number of Columns: 2
Largest Column: middle
Column Spacing: [1px]
Column Size: [150px, 270px]
Shadow: off
```
- Livello 5
- Livello 4
- Livello 3
- Livello 2
- Livello 1
- Livello 0

--- end-column ---

- **Linguaggi Applicativi**
- **Linguaggio Assembly**
- **Sistema Operativo**
- **Linguaggio Macchina**
- **Architettura**
- **Logica Digitale**

--- end-multi-column
##### System Calls
La system call permette di utilizzare servizi la cui esecuzione è a carico del sistema operativo. Di norma queste sono operazioni di input/output e di interfacciamento con le periferiche (attraverso i driver).

Ogni servizio è associato ad un codice numeri univoco, un intero $K$. 
- Su MARS la lista è disponibile da help $\rightarrow$ system calls

Per utilizzare una system call che ua un dato codice numerico:
1) Caricare il codice nel registro $v0
2) Caricare gli argomenti, se necessari, nei registri $a0, $a1, $a2, $a3
3) Eseguire l'istruzione syscall
4) Leggere evenutali valori di ritorno nei registri $v0 (e $v1)

**IMPORTANTE!** Dopo la chiamata di una system call, qualsiasi registro di classe $ti (ossia i registri 'temporanei') può essere modificato dal funzionamento interno della funzione chiamata.

###### System Calls "canoniche"

![[Pasted image 20240427161928.png | I C | 750]]

###### Sistem Calls "aprocrife" (fornite da MARS)

![[Pasted image 20240427162144.png | I C | 750 ]]


```wasm unwrap title:"System Calls example"
	.data
msg1: .asciiz "Hello world!"
msg2: .asciiz "Inserisci un intero"

	.text
	.globl main
main:

	li $v0 4 
	la $a0, msg1
	syscall (; si stampa una stringa nello standard output (la console) ;)
	
	li $v0 55
	la $a0 msg1
	li $a1 1
	syscall (; si stampa una stringa in una finestra di dialogo ;)
	
	li $v0 51
	la $a0 msg2
	syscall (; si legge un intero in input con una finestra di dialogo ;)
	
	li $v0 10
	syscall (; exit ;)
```

***
#### Uso dello Stack
![[Pasted image 20240427163805.png | I C | 750]]

##### Aree di memoria
- **Area riservata**: contiene il codice per il kernel del sistema operativo. Non si può usare.
- **Area text**: contiene il programma, ossia le istruzioni codificate nei segmenti .text del nostro programma.
- **Area dati statici**:
	- Non cambia di dimensione durante l'esecuzione
	- Ad alto livello contiene le variabili globali e statiche (rimangono allocate durante tutta l'esecuzione)
	- In MIPS contiene i dati che scriviamo nei segmenti .data
	- La sua dimensione cambia in base al programma, a seconda di quanti dati usiamo in .data
- **Dati dinamici**
	- Stack
	- Memoria libera
	- Heap

###### Stack
Lo stack comincia dal "tetto" in alto della memoria. Si espande verso il basso e contrae verso l'alto durante l'esecuzione del programma (quindi dinamicamente).
- Ad alto livello è usata per le variabili locali

In MIPS si usa un apposito registro, lo `$sp` (il numero $29) per tenere traccia di dove è arrivato lo stack.
- Lo `$sp` contiene l'indirizzo dell'ultimo word usato dallo stack. È inizializzato dal sistema, ma è ruolo del nostro programma tenerlo aggiornato.

###### Heap
Lo heap comincia da dove finisce il segmento di dati statici. Si espande verso l'alto e contrae verso il basso durante l'esecuzione del programma (quindi dinamicamente).
- Ad alto livello è usata per le variabili allocate dinamicamente.
	- Si espande quando vengono allocate con comandi come new, alloc, malloc, ecc...
	- Si contrae quando vengono deallocate con comandi come free, delete o dal garbage collector.

Il suo uso in MIPS è rimandato a una lezione successiva

###### Memoria libera
È la zona di memoria fra stack e heap, che può essere occupata da l'una o dall'altra. Per questo motivo viene occupata da quello dei due che si espande per primo, ed è più efficiente in quanto non riserva una zona di memoria fissa per lo stack e una per lo heap.

Se si esaurisce, causa un errore a tempo di esecuzione:
- "stack overflow" se lo stack scende troppo e invade lo heap
- "heap overflow" se lo heap sale troppo e invade lo stack

###### Stack Pointer
Il registro stack pointer `$sp` contiene sempre l'indirizzo della parola che sta in cima allo stack. Questa parola è l'ultima ad essere stata inserita nello stack e sarà la prima ad essere rimossa.

![[Pasted image 20240427172814.png | I C | 750]]

###### Register Spilling
Salvare dati sullo stack può servire per fare **spilling di registri**.
- In generale un programma potrebbe lavorare su un numero di variabili maggiore rispetto al numero di registri disponibili. Non è perciò possibile avere tutti i dati nel banco registri nello stesso momento.

Una soluzione è tenere nei registri i dati di cui si ha maggior bisogno mentre i dati di cui non si ha una urgente necessità vengono spostati temporaneamente in memoria (con un push sullo stack).
- L'operazione di trasferire variabili da registri a memoria è detta **register spilling**

L'area di memoria di solito utilizzata per questa operazione è lo stack
<tab>
</tab> 

<span style="color:rgb(124, 124, 124)">Esempio:</span>
- <span style="color:rgb(124, 124, 124)">Si supponga di poter utilizzare solo i registri $t0 $t1</span>
- <span style="color:rgb(124, 124, 124)">Bisogna calcolare il prodotto di due variabili che stanno nel segmento dati e i cui indirizzi sono identificati dalle label x e y</span>

```wasm unwrap title:"Register Spilling"
	.data
x:  .word 3
y:  .word 4
	
	.text
	.globl main
main:
	
	la $t0 x
	lw $t1 0($t0)
	
	addi $sp $sp -4
	sw $t1 0($sp) (; spilling (push) ;)
	
	la $t0 y
	lw $t1 0($t0)
	
	lw $t0 0($sp)
	addi $sp $sp 4 (; spilling (pop) ;)
	
	mult $t0 $t1
	mflo $t0
```


