Pregi e difetti CPU a singolo ciclo:
- Semplicità
	- L'esecuzione avviene in un singolo ciclo di clock, con i segnali che attraversano un datapath diverso a seconda dell'istruzione
	- L'unità di controllo è una funzione combinatoria
- Inefficienza
	- Ogni istruzione richiede un tempo per essere eseguita pari alla durata del ciclo di clock, quando alcune invece potrebbero richiederne di meno
	- Replicazione dei componenti
		- Due unità di memoria: una per il fetch dell'istruzione e una per la lettura / scrittura dei dati
		- Se un'istruzione ha bisogno di svolgere due operazioni aritmetiche servono due ALU

- La durata del ciclo di clock è dimensionato sull'istruzione più lenta, ossia quella il cui datapath ha il cammino critico più lungo.