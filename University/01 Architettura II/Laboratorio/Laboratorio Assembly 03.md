#### Controllo di flusso
Il controllo di flusso, nei linguaggi ad alto livello, è svolto tramite l'utilizzo di costrutti quali l'if else, lo switch, i cicli while, do while, for, ecc...

Nei linguaggi a basso livello il controllo di flusso è realizzato usando solo due costrutti:
- **Jump** (salto): modifica l'indirizzo della prossima istruzione
- **Branch** (salto condizionato): modifica l'indirizzo della prossima istruzione solo se si verifica una data condizione.

Entrambi i comandi modificano il PC, quel registro speciale che memorizza l'indirizzo della prossima istruzione da eseguire.
- Dopo un'istruzione, il PC viene automaticamente incrementato per andare all'istruzione successiva tramite un offset di 4 bytes.
- Nel caso invece avvenga un salto, il PC viene sostituito da un dato indirizzo target specificato dal comando di salto
##### Jump
È un salto incondizionato, ossia che viene sempre eseguito. Le istruzioni sono:
- Jump `j ADDRESS`: salta a un dato indirizzo
- Jump Register `jr $reg`: salta all'indirizzo contenuto in un registro

Per trovare l'indirizzo di salto si possono usare le label. Queste sono quindi fruibili sia nel segmento `.text` che in quello `.data`: in entrambi i casi registrano l'indirizzo di memoria del dato o dell'istruzione immediatamente seguente.

```wasm unwrap title:"Jump Label"
	.text
		... (; codice seguito ;)
	j qui
		... (; codice non eseguito ;)
qui:
		... (; codice seguito ;)
```

*** 
###### Istruzione formato J-Type
Il salto *j* si mappa su un'istruzione di formato *J*-type:

![[Pasted image 20240428131920.png | I C | 600]]

Il target address, ossia l'indirizzo che viene passato all'istruzione di jump in MIPS, è di 32 bit. L'istruzione di formato J-type però mette a disposizione solo 26 bit per specificarlo, poichè gli altri 6 bit sono necessari per l'OPCODE <span style="color:rgb(124, 124, 124)">(il codice che permette alla CPU identificare le istruzioni).</span>
<tab>
</tab> 

Per ovviare a questo problema:
- Si considerano i 2 bit finali come sottointesi con 00 (viene perciò fatto uno shift a sinistra di due bit)
	- Questo perchè le istruzioni di MIPS sono allineate a 4-byte, e di conseguenza i loro indirizzi (in binario) terminano con 00
- I primi 4 bit dell'address rimangono quelli del $PC$ corrente

![[Pasted image 20240428135149.png | I C | 600]]

Questo procedimento è detto "modalità di indirizzamento pseudo-diretta"
<tab>
</tab> 

Di conseguenza il salto Jump:
- Non può modificare i primi 4 bit del $PC$: non può quindi saltare fuori dal suo blocco di istruzioni
	- Per esempio, una jump all'indirizzo `0xC-------` può saltare solo ad un'altra istruzione di indirizzo `0xC-------`
- Salta sempre ad istruzioni allineate al word (che è comunque ciò che noi vogliamo)

**Nota**! Il Jump Register non ha invece alcuna limitazione in quanto il registro è di 32 bit. Può perciò essere usato per saltare fuori dal blocco.
<tab>
</tab> 

L'assembler, quando traduce un comando jump, svolge le seguenti operazioni:
- Traduce da etichetta a target address di 32 bit
- Calcola i 26 bit dal target address
- Se la jump salta fuori dal "blocco" (e quindi se il suo indirizzo comincia con 4 bit diversi dal target address) lo traduce in una sequenza di fino 3 istruzioni (tratta la jump come una pseudo-istruzione):
	- Fa una load address`la` (che è a sua volta una pseudo-istruzione che viene poi tradotta in due istruzioni) e poi usa una jump register `jr` oppure una branch.

Non bisogna perciò preoccuparsi di tenere in considerazione i blocchi quando si fanno le jump poichè queste, nel caso, sono trattate dall'assembler come pseudo-istruzioni.

##### Branch
È un salto condizionato, ossia viene eseguito solo se una certa condizione risulta verificata, altrimenti si passa alla prossima istruzione (come di consueto).

Branch con confronto fra due registri:
- `beq $ra $b addr` <span style="color:rgb(124, 124, 124)">branch on equal:</span> $ra = $rb 
- `bne $ra $b addr`<span style="color:rgb(124, 124, 124)"> branch on not equal:</span> $ra ≠ $rb
- `blt $ra $b addr` <span style="color:rgb(124, 124, 124)">branch on less then:</span> $ra < $rb

Branch con confronto fra registro e zero:
- `bgez $ra addr` <span style="color:rgb(124, 124, 124)">branch on greater-or-equal to zero:</span> $ra ≥ 0
- `bgtz $ra addr` <span style="color:rgb(124, 124, 124)">branch on greater-than zero:</span> $ra > 0
- `blez $ra addr` <span style="color:rgb(124, 124, 124)">branch on less-or-equal to zero:</span> $ra ≤ 0
- `bltz $ra addr` <span style="color:rgb(124, 124, 124)">branch on less-than zero:</span> $ra < 0

È possibile fare anche un confronto fra un registro e un valore: `beq $s0 imm addr` $ra = imm
- Questa istruzione diventa poi `addi $at imm; beq $s0 $at addr`

###### Istruzione formato I-Type
I branch in MIPS hanno formato $I$-type:

![[Pasted image 20240428153847.png | I C | 600]]

Il target address, ossia l'indirizzo che viene passato all'istruzione di jump in MIPS, è di 32 bit. L'istruzione di formato I-type però mette a disposizione i 16 bit del campo immediate per specificarlo.

La soluzione consiste in un procedimento detto "modalità di indirizzamento relativo".
- L'offset sommato al PC è un numero in complemento a 2 ed è relativo all'istruzione successiva alla branch
![[Pasted image 20240428160922.png | I C | 500]]

Conseguenze:
- Massimo salto in avanti: $+4(2^{15}-1)$ bytes dall'istruzione successiva alla branch, quindi $2^{15}$ istruzioni dopo quella corrente
- Massimo salto all'indietro: $-4(2^{15})$ bytes dall'istruzione successiva alla branch, quindi $2^{15}-1$ istruzioni prima quella corrente
- Sono perciò salti corti che però permettono di uscire dal blocco.
	- Posso per esempio saltare da 0xAFFFFFFE a 0xB0000000
- Le branch possono solo saltare ad indirizzi allineati alla parola (come le jump)

Se l'indirizzo target è troppo disante ($>2^{15}$) l'assembler genera un errore.

#### Assegnamenti condizionali
Gli assegnamenti condizionali possono essere un modo per ottenere lo stesso risultato di un if-then-else ma senza controllo di flusso.

Questi aumentano la leggibilità del codice ed inoltre possono aumentare l'efficienza: il controllo di flusso può far comportare alle CPU in pipeline un flushing ad ogni salto

Il MIPS mette a disposizione istruzioni e pseudo-istruzioni del tipo "Set On (condizione)", che hanno come risultato quello di assegnare ad un dato registro il valore intero $1$ se una certa condizione è verificata o il valore $0$ se non lo è.
- La condizione è definita su altri due registri
- Questi comandi sono utili per valutare condizioni composte (con più and, or, not)

Esempi di assegnamenti condizionati in MIPS:
- `seq $a $b $c` \$a = ($b = $c) <span style="color:rgb(124, 124, 124)">set on equal</span>
- `sne $a $b $c` \$a = ($b ≠ $c) <span style="color:rgb(124, 124, 124)">set on not equal</span>
- `slt $a $b $c` \$a = ($b < $c) <span style="color:rgb(124, 124, 124)">set on less then</span>
- `sle $a $b $c` \$a = ($b ≤ $c) <span style="color:rgb(124, 124, 124)">set on less then or equal</span>
- `sgt $a $b $c` \$a = ($b > $c)  <span style="color:rgb(124, 124, 124)">set on greater then</span>
- `sge $a $b $c` \$a = ($b ≥ $c) <span style="color:rgb(124, 124, 124)">set on greater then or equal</span>

Esempio di varianti:
- `slt $a $b $c` \$a = ($b < $c) <span style="color:rgb(124, 124, 124)">set on less then</span>
- `sltu $a $b $c` \$a = ($b < $c) <span style="color:rgb(124, 124, 124)">set on less then unsigned</span>
- `slti $a $b $c` \$a = ($b < imm) <span style="color:rgb(124, 124, 124)">set on less then immediate</span>
- `sltiu $a $b $c` \$a = ($b < imm) <span style="color:rgb(124, 124, 124)">set on less then immediate unsigned</span>

<span style="color:rgb(124, 124, 124)">Nelle varianti unsigned è necessario sapere se i paramentri da paragonare siano espressi in complemento a due o senza segno (cambia il risultato).</span>

