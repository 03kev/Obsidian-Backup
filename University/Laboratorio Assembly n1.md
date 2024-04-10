- Tutte le istruzioni sono codificate in 32 bit
- I registri, che sono 32, hanno ciasciuno 32 bit.
- Gli indirizzi di memoria sono di 32 bit.

#### Registri
- I registri utente sono 32, e possono essere utilizzati come input o output da tutte le operazioni.
	- Il registro $0 contiene sempre il valore zero
- I registri non utente non sono utilizzabili nè in lettura nè in scrittura dalle normali operazioni e sono:
	- **PC**: contiene l'indirizzo della prossima istruzione da eseguire
	- **Hi & Lo**: due registri che contengono il risultato delle operazioni di molitplicazione e divisione (intera)

#### Istruzioni aritmetiche
![[Pasted image 20240410105019.png | I]]
- Come si può vedere dalla tabella, sommare due registri e sommare un registro con una costante richiedono due comandi diversi: add e addi
- I comandi unsigned ignorano l'overflow, mentre quelli signed lo riportano

##### Inizializzare i registri
Non esiste un comando per inizializzare direttamente i registri: per farlo si usa il registro speciale $zero:
`addi $5 $zero 2` somma 2 a 0 e lo salva nel registro $5.

Essendo però la costante in addi direttamente salvata nell'istruzione mips, a questa vengono concessi solo 16 bit per il campo immediate, ossia quello in cui viene salvato il valore della costante (gli altri servono per l'opcode e per i registri da usare).
![[Pasted image 20240410110908.png | II]]

Si usano quindi due istruzioni `lui` e `ori` per poter salvare in un registro costanti superiori ai 16 bit:
- `lui $t1 0x1234` Load upper immediate: assegna i 16 upper-bits del registro $t1 al campo immediate e i 16 lower-bits con 0. $t1 è un registro di appoggio.
- `ori $t2 $t1 0x5678` Bitwise OR immediate: effettua un or bit a bit fra $t1 e il campo immediate esteso con 0.

###### Comando li
Il MIPS permette di usare una pseudoistruzione che ottiene lo stesso effetto: `li $5 2` 
- L'assembler MIPS traduce automaticamente questa pseudoistruzione nell'istruzione reale MIPS `addi $5 $zero 2`

Nello stesso modo questa pseudoistruzione può essere usato per salvare un campo immediate che supera i 16 bit: `li $5 0x12345678`. Viene poi tradotta dall'assembler in `lui $5 0x1234; ori $5 $1 0x5678`
- Come registro di appoggia si usa un registro che per convenzione non è mai usato dai nostri programmi, ossia il registro 'ra', il registro numero $1.

