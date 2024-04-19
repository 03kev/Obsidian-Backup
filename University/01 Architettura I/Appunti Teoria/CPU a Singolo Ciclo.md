Una CPU a singolo ciclo è una CPU che esegue un'istruzione per ciclo di clock.

- Un'istruzione è una stringa binaria che codifica le informazioni necessarie all'elaboratore affinchè questa esegui una particolare operazione.
- La CPU è un circuito in grado di decodificare questa stringa e di eseguirne l'operazione che rappresenta.
- Il linguaggio binario infatti è l'unico linguaggio in cui la macchina esprime le istruzioni.

L'esecuzionedi un'istruzione passa per 5 fasi svolte dalla CPU in modo iterativo:
![[Fasi CPU.png | I ]]

La CPU è composta da due elementi fondamentali:
1) Data Path: è il percorso che le informazioni seguono all'interno della CPU attraversando i suoi sottocomponenti
2) Logica di Controllo:
	- Manovra gli scambi del data path in modo che le informazioni seguano un percorso diverso a seconda dell'istruzione
	- Controlla i sotto-componenti della CPU a seconda dell’istruzione

La CPU è in grado di svolgere:
- Istruzioni Aritmetico-Logiche: come ad esempio add o AND
- Istruzioni di accesso alla memoria dati: load e store
- Istruzioni di controllo di flusso: salti condizionati e non condizionati

Ogni istruzione è codificata in linguaggio macchina su 32 bit, organizzati in un formato in gruppi detti campi.
Nell'elaboratore MIPS esistono tre formati:
- Formato R (register): per le istruzioni aritmetico-logiche che operano su valori in registri
- Formato I (immediate): per le istruzioni aritmetico-logiche che operano su valori immediati (costanti) e per le istruzioni di salto condizionato
- Formato J (jump): per le istruzioni di salto non condizionato

***

La memoria è interpretata come un array unidimensionale dove ogni elemento è detto parola di memoria.
Ogni parola di memoria ha un'ampiezza di *n*-bit, e la memoria può quindi contenere 2<sup>n</sup> parole (altezza).
>Con n=32 (4 byte) si hanno 2<sup>32</sup> parole, circa 4 GB di spazio

![[Pasted image 20231130100745.png | II R | 220]]<tab>
</tab>
La parola è l'unità base di trasferimento da e verso la memoria e si 
definisce in byte.
Ogni parola è associata ad un indirizzo su *n*-bit che la localizza nella memoria.


- In MIPS ogni parola è di 4 byte
- Lo spazio degli indirizzi è definito con risoluzione al byte: ogni singolo byte ha un suo indirizzo
- Allineamento: l’indirizzo di una parola deve essere multiplo della sua dimensione in byte (4)
- L’indirizzo di una parola è l’indirizzo di uno dei suoi 4 byte, per questo gli indirizzi di due parole di memoria successive distano 4
- Quale dei 4 byte è associato all’indirizzo della parola?
	- Big Endian: il byte più significativo (gli 8 bit più alti)
	- Little Endian: il byte meno significativo (gli 8 bit più bassi)

***
###### Memoria
La memoria centrale è un modulo a cui si può accedere tramite un indirizzo per leggere o scrivere una parola

La Memoria è suddivisa in due sezioni:
1) **Memoria istruzioni**: ogni parola è un’istruzione per la CPU, la sequenza di parole corrisponde allasequenza di istruzioni
2) **Memoria Dati**: ogni parola è un dato (es: un valore numerico da usare in un'istruzione numerica)

La memoria istruzioni viene usata solo in lettura, ossia per leggere la prossima istruzione che la CPU deve svolgere.
L'indirizzo della prossima istruzione sta all'interno di un registro speciale chiamato **Program Counter**
![[Pasted image 20231204090708.png | I C | 400]]
La memoria dati viene usata sia in lettura (per trasferire una parola dalla memoria alla CPU) che in scrittura (per trasferire un aprola dalla cpu alla memoria) ma non nello stesso ciclo di clock.

Input:
1) Addr: indirizzo della parola di memoria (32 bit)
2) MemRead: segnale di controllo (1 bit), 1 per lettura, 0 a riposo
3) MemWrite: segnale di controllo (1 bit), 1 per lettura, 0 a riposo
4) D: il dato da trasferire in memoria se siamo in modalità scrittura (32 bit)
Output:
- DataRead: il dato recuperato dalla memoria se siamo in modalità lettura (32 bit)

![[Pasted image 20231204091239.png | II L | 300]] <tab>
</tab>  
- Random Acces Memory (RAM): tempo di accesso ad una parola di memoria è fisso, indipendentemente dall'indirizzo a cui si trova una parola
- MemRead e MemWrite: in un ciclo di clock solo uno dei due verrà posto ad 1.
<tab>
</tab> <tab>
</tab> 
###### Register File
È una memoria interna ad accesso molto rapido, cosituita da unità dette registri.
La CPU mantiene in questa memoria i dati su cui più frequentemente svolge delle operazioni

Molte istruzioni operano su valori contenuti dentro registri: anzichè indicare il valore di un operando, indicano il numero (interpretabile anche come un indirizzo) del registro in cui si trova tale valore.

Le architetture che usano un banco registri sono anche dette load/store, perchè lavorare sul banco registri implica, tipicamente, di trasferire da memoria (load) degli operandi e, successivamente, di scrivere in memoria il risultato di una operazione (store).
- In MIPS un registro ha la stessa dimensione di una parola di memoria (32 bit) seppur questo non sia vero in tutte le architetture
- Il RF del MIPS contiene 32 registri da 32 bit: per indirizzare un registro servono 5 bit

A differenza della memoria dati, il RF può essere usato sia in lettura che in scrittura nello stesso ciclo di clock. Si possono inoltre leggere due registri contemporaneamente: ha quindi due uscite di scritture.
<tab>
</tab> 
![[Pasted image 20231204092705.png | II R | 300]] Input:
1) Write: segnale di controllo (1 bit), 1 per scrittura
2) RegRead<sub>1</sub> e RegRead<sub>2</sub>: indirizzi (5 bit) dei due registri da leggere
3) WriteAddr: indirizzo (5 bit) del registro in cui scrivere (se in modalità scrittura)
4) D: dato (32 bit) da scrivere nel registro indirizzatp da WriteAddr (se in modalità scrittura)

Output:
- DataRead<sub>1</sub> e DataRead<sub>2</sub>: i valori (32 bit) contenuti nei registri indirizzati da RegRead<sub>1</sub> e RegRead<sub>2</sub> (se in modalità lettura)

###### Splitter
Ci permette di seperare un segnale su più bit in sottogruppi. Lo useremo per estrarre i campi dai 32 bit di una istruzione
![[Pasted image 20231204093145.png | I | 600]]
- Si può usare anche in verso opposto per raggruppare bit

***
###### Istruzioni con formato R
Il formato R è usato per le istruzioni che utilizzano esclusivamente valori che sono dei registri e per le operazioni di shift.

Le istruzioni aritmetico-logiche:
![[Pasted image 20231204093616.png | I]]
La ALU è in grado di svolgere le elaborazioni richieste da queste istruzioni.