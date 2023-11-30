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

