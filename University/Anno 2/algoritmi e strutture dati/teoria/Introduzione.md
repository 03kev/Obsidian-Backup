### Lezione 1 - 25/09/2024

Libro di testo: Algoritmi e strutture dati, McGraw-Hill, 2008

Un algoritmo è un procedimento per la risoluzione di un problema.
- Sintesi: dal problema si trova un algoritmo
- Analisi: data una strategia risolutiva, si valuta la sua efficienza
Le strutture dei dati sono dei modi per organizzare i dati.

#### Algoritmica

Algoritmica: la parte dell'informatica che si occupa di tutti gli aspetti legati agli algoritmi.
- Progettazione degli algoritmi

- Studio delle strutture dati da essi utilizzate

- Analisi della loro efficienza

- Studio delle limitazioni inerenti e complessità dei problemi

- Definizione di nuovi modelli di calcolo

    

Nella progettazione di un algoritmo sono importanti:
- Correttezza: l'algoritmo deve risolvere il problema

- Efficienza: l'algoritmo deve risolvere il problema nel minor tempo possibile
  Queste due caratteristiche rientrano nell'analisi dell'algoritmo.

  

Nella progettazione di un algoritmo è importante tenere conto dell'uso delle risorse:
- Tempo
- Spazio
- Rete
- Processori (quanti ne usiamo)
- Consumo di energia
  Tutti questi fattori influiscono sull'efficienza dell'algoritmo.

  

Studiare l'algoritmica è importante per:
- Risolvere problemi: aspetto pratico
- Forniscono delle metodologie che sono utili nelle altre discipline: aspetto teorico
##### Problema del commesso viaggiatore
Istanza del problema (input):
- n città
- distanza tra le città
Problema:
- Trovare il percorso più breve che visiti tutte le città e torni al punto di partenza

Gli algoritmi che risolvono il problema calcolano le permutazioni delle città: n! permutazioni.

***
### Lezione 2 - 27/09/2024
#### Definizione di algoritmo
Un algoritmo è un insieme ordinato e finito di passi eseguibili e non ambigui che definiscono un procedimento che termina.
- La descrizione dell'algoritmo deve essere quindi finita
- Il passo dipende dall'ambito e dal livello di astrazione con cui sto descrivendo un algoritmo
    - Questi passi devono essere eseguibili e non ambigui: tutto deve essere specificato e nulla può essere lasciato all'interpretazione
- L'algoritmo deve terminare: deve essere finito e non deve essere infinito

Ci sono dei contesti in cui alcune di queste caratteristiche possono essere trascurate, permettendo di uscire quindi da questa definizione stringente.
- In alcuni algoritmi non tutto è scritto, e qualcosa viene lasciato all'esecutore: per esempio gli algoritmi randomizzati.
    - Un esempio possono essere gli algoritmi di calcolo, come l'algoritmo di Monte Carlo dove si fa un calcolo approssimato di un integrale di una funzione (si costruisce un rettangolo attorno alla funzione e tramite un algoritmo randomico si generano dei numeri all'interno di questo rettangolo. La percentuale di punti che cadono sotto la funzione corrisponde approssimativamente al rapporto tra l'integrale e l'area del rettangolo).
    - Nel quick sort si disordinano gli elementi e si sceglie un elemento pivot in modo randomico in modo da evitare il caso peggiore. Si migliorano quindi le prestazioni di un algoritmo.
- Alcuni algoritmi non terminano, come per esempio quelli che regolano i processi industriali.

##### Visione matematica degli algortimi
Gli algoritmi possono essere visti come trasformazioni di input in output.

Un algortimo $a$ può essere visto come una funzione $F_{a}: D_{i}\ \rightarrow Ds$, dove $D_{i}$ è il dominio delle istanze (gli input del problema) e $D_{s}$ è il dominio delle soluzioni (gli output del problema).
Un problema $p$ prende in input un'istanza $x∈D_{i}$ e restituisce una soluzione $f(x)∈D_{s}$.
L'algoritmo $a$ risolve il problema $p$ se e solo se per $∀x∈Di\ F_{a}(x) = f(x)$.

#### Definizione di programma
Un programma è un insieme ordinato e finito di istruzioni (ossia un algoritmo) scritte secondo le regole di uno specifico linguaggio di programmazione.
##### Pseudocodice
```algol 
ALGORITMO nome_algoritmo(parametri_con_tipo) -> tipo_di_ritorno
    istruzione1
    ...
    istruzioneN
    RETURN valore_di_ritorno
```

#### Sintesi/progetto di algoritmi
Dato un problema si vuole ottenere un algoritmo che lo risolve.
##### Analisi dell'algoritmo.
Si valutano:
- Correttezza: dato un algoritmo $a$ e un problema $p$, dimostrare che $x$ risolve $p$ ( $∀x∈D_{i} \ \ F_{a}(x) = f(x)$ )
- Efficienza (studia la complessità dell'algoritmo): valutare la quantità di risorse (come tempo e spazio) utilizzate dall'algoritmo. Dopodiché si può fare di meglio?

Per fare l'analisi dell'algoritmo:
- Valutazione a posteriori: si decodifica l'algoritmo in un linguaggio di programmazione (Testing) e lo si fa girare. Subentrano dei problemi nel testing:
    - Esistono infiniti ingressi, e con il testing si può solo testare un sottoinsieme di questi ingressi.
    - Costo della codifica: passare dall'algoritmo al programma può essere molto costoso.
    - La valutazione a posteriori è quindi un metodo insoddisfacente.
- Valutazione a priori: è una stima teorica in fase di progetto della correttezza e dell'efficienza dell'algoritmo.
    - Questo metodo permette di confrontare soluzioni diverse e di codificare solo quella che si ritiene tramite l'analisi a priori migliore.
    - Si utilizzano degli strumenti matematici.

***
#### Algoritmi per la moltiplicazione
##### Moltiplicazione tramite somme iterate

$a,b ≥ 0;\ a*b = a+\dotsc+a\ b$ volte

```
ALGORITMO moltiplicazione(intero a, intero b) -> intero
    prod <- 0 // linea 1
    WHILE b > 0 DO
        prod <- prod + a
        b <- b - 1
    RETURN prod
```

(dimostrazione della correttezza non presente qui)

se $b=0$ eseguo le linee $1,2,5 \rightarrow T=3$
se $b>0$:

- Le linee $1,5$ sono eseguite una volta $\rightarrow T=2$
- Le linee $3,4$ sono eseguite $b$ volte $\rightarrow T=2b$
- La linea $2$ è eseguita $b{+}1$ volte $\rightarrow T=b{+}1$

$T_{tot} = 3b+3 \ \longrightarrow$ la crescita è lineare
##### Moltiplicazione alla russa

```
ALGORTIMO moltiplicazione(intero a, intero b) -> intero
    prod <- 0
    WHILE b > 0 DO
        IF b è dispari THEN
            prod <- prod + a
        b <- b/2
        a <- a*2
    RETURN prod
```

$a_{i},\ b_{i},\ prod_{i}$  i valori di $a, b, prod$ dopo l'iterazione $i$
Dimostro che $a_{i}\ b_{i}+prod_{i} = ab$ (dimostrazione della correttezza)
###### Induzione su $i$ 
$$
\begin{flalign}
&\text{\small $\bullet$} \; \text{BASE: } i = 0 \\
&\quad i = 0 \\
&\quad a_0 = a, \quad b_0 = 0, \quad \text{prod}_0 = 0 \\
&\quad a_0 \cdot b_0 + \text{prod}_0 = ab + 0 = ab \\ \\

&\text{\small $\bullet$} \; \text{INDUZIONE: } i-1 \rightarrow i \\
&\quad a_{i} = 2a_{i-1} \\[10pt]

&\quad b_{i} = \left\lfloor \dfrac{b_{i-1}}{2} \right\rfloor = 
\begin{cases}
\dfrac{b_{i-1}}{2}, & \text{se } b_{i-1} \text{ è pari} \\
\dfrac{b_{i-1} - 1}{2}, & \text{se } b_{i-1} \text{ è dispari}
\end{cases} \\[10pt]

&\quad \text{prod}_{i} = 
\begin{cases}
\text{prod}_{i-1}, & \text{se } b_{i-1} \text{ è pari} \\
\text{prod}_{i-1} + a_{i-1}, & \text{se } b_{i-1} \text{ è dispari}
\end{cases} \\[10pt]

&\quad \begin{cases}
\text{se } b_{i-1} \text{ è pari:} & a_{i} b_{i} + \text{prod}_{i} = \cancel{2} a_{i-1} \dfrac{b_{i-1}}{\cancel{2}} + \text{prod}_{i-1} = a_{i-1} b_{i-1} + \text{prod}_{i-1} \\
\text{se } b_{i-1} \text{ è dispari:} & a_{i} b_{i} + \text{prod}_{i} = \cancel{2} a_{i-1} \dfrac{b_{i-1}}{\cancel{2}} + \text{prod}_{i-1} + a_{i-1} = a_{i-1}(b_{i-1} - 1) + \text{prod}_{i-1} + a_{i-1} = \\
& = a_{i-1} + b_{i-1} - \cancel{a_{i-1}} + \text{prod}_{i-1} + \cancel{a_{i-1}} = a_{i-1} b_{i-1} + \text{prod}_{i-1}
\end{cases} && \\
\\
&\text{In entrambi i casi si ottiene:} \\

&a_{i}\ b_{i} + \text{prod}_{i} = a_{i-1}\ b_{i-1} + \text{prod}_{i-1} = ab \\
&\hspace{14.54em} \text{\small \downarrow} \\
&\hspace{11.5em} \text{\small ipotesi di induzione} && \\
\\
\end{flalign}
$$
L'esecuzione dell'algoritmo termina quando $b=0$. Sia $u$ il numero dell'iterazione dopo la quale $b=0$, allora $a_{u}\ b_{u} + prod_{u} = ab$. Ma se $b_{u} = 0$, allora $prod_{u} = ab$.

###### Complessità dell'algoritmo

```
prod <- 0
WHILE b > 0 DO
	IF b è dispari THEN
		prod <- prod + a
	b <- b/2
	a <- a*2
RETURN prod
```

Si consideri $u$ il numero di iterazioni effettuate
- Le linee $1, 7$ vengono eseguite $1$ volta $\rightarrow T = 2$
- La linea $2$ viene ripetuta $u{+}1$ volte $\rightarrow T = u{+}1$
- Le linee $3, 5, 7$ vengono eseguite $u$ volte $\rightarrow T = 3u$
- La linea 4 viene eseguita al più $u$ volte $\rightarrow T ≤ u$

$T_{tot} ≤ 5u + 3$

| **$b$** | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   |
|:-------:| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **$u$** | 0   | 1   | 2   | 2   | 3   | 3   | 3   | 3   | 4   |
Da ciò si ricava che $u=\lfloor\ log_{2}\ b\ \rfloor + 1$ 

$T(a,b) ≤ 5\ (\ \lfloor\ log_{2}\ b\ \rfloor + 1)+3 = 5\ \lfloor\ log_{2}\ b\ \rfloor +8$
- La crescita del tempo non dipende da $a$ ed è logaritmica
- Lo spazio inoltre è costate: non dipende da $a$ e da $b$ ma si utilizzano solo 3 variabili

***

Un algoritmo ricorsivo è un algoritmo che richiama se stesso
#### Calcolo della potenza $x^{y}$ 
$x, y ≥ 0$ interi
##### Prodotti iterati
$x^{y} = x\ \dotsc\ x\ per\ y\ volte$ 

```
ALGORITMO potenza(intero x, intero y) -> intero
	power <- 1
	WHILE y > 0 DO
		power <- power * x
		y <- y - 1
	RETURN power	
```

- **Correttezza**: dopo l'iterazione $i$ si ha che $y_{i} = y - i$ e $power_{i} = x^{i}$. Si fanno $y$ iterazioni e quindi il risultato finale è $x^{y}$.
- **Complessità** (è analoga a quella della moltiplicazione a somme iterate): 
	- Numero di righe di codice: $T(x,y) = 3y+3$
	- Spazio: 3 variabili (i due parametri e la variabile power)

##### Soluzione ricorsiva

$x^{y} = x^{\tiny {\normalsize 2}\dfrac{y}{2}} = (x^{\tiny \dfrac{y}{2}})^{2}$
###### Primo caso
$$
\begin{flalign}
\begin{cases}
\text{1} & \text{se y = 0} \\[5pt]
(x^{\tiny \dfrac{y}{2}}) ^ {2} & \text{se y > 0 } \land \text{ y pari} \\[5pt]
(x^{\tiny \dfrac{y-1}{2}}) ^ {2}\ x & \text{se y > 0 } \land \text{ y dispari}
\end{cases}&&
\end{flalign}
$$
```
ALGORITMO potenza(intero x, intero y) -> intero
	IF y = 0 THEN
		RETURN 1
	ELSE
		power <- potenza(x, y/2) //divisione intera
		power <- power * power
		IF y è dispari THEN
			power <- power * x
		RETURN power
```
- In questo algoritmo si usano solo variabilli intere ed operazioni su interi

Dimostrazione della correttezza: $\text{∀x, y ≥ 0 potenza(x, y) restituisce } x^{y}$ 
**Induzione su $y$**:
$$
\begin{flalign}

&\text{\normalsize $\bullet$} \; \text{BASE: } y = 0 \\
&\quad \text{restituisce 1 e } x^{y} = x^{0} = 1 \\ \\

&\text{\normalsize $\bullet$} \; \text{INDUZIONE: } < y \rightarrow y \text{\scriptsize \quad(si suppone che sia vera per tutti i valori minori di un certo y)} \\[2pt]
&\quad \text{\small $\circ$} \; \text{\small CASO y PARI} \\
&\quad \quad (x^{\scriptsize \dfrac{y}{2}}) ^ {\large\ 2} = x^{y} \rightarrow \text{risultato} \\
&\hspace{2.55em} \text{\small \downarrow} \\
&\hspace{1.8em} \text{\small risultato di potenza(x, y/2) } \text{\scriptsize \; (per ipotesi di induzione)} && \\
\\
&\quad \text{\small $\circ$} \; \text{\small CASO y DISPARI} \\
&\quad \quad \text{potenza(x, y/2)} = x^{\lfloor \small \dfrac{y}{2} \normalsize \rfloor} = x^{\small\dfrac{\text{y - 1}}{2}} \\
&\hspace{8.9em} \text{\small \downarrow} \\
&\hspace{5.9em} \text{\small per ipotesi di induzione} && \\
&\quad \quad (x^{\scriptsize \dfrac{\text{y - 1}}{2}})^{\text{\normalsize\ 2}}=x^{\text{\normalsize\ y - 1}}\\ 
&\quad \quad x^{\text{\normalsize\ y - 1}}\ x = x^{\normalsize\ y}
&&

\end{flalign}
$$

```
IF y = 0 THEN
	RETURN 1
ELSE
	power <- potenza(x, y/2) //divisione intera
	power <- power * power
	IF y è dispari THEN
		power <- power * x
	RETURN power
```

Sia $T(x, y)$ il tempo misurato come numero di righe di codice che vengono eseguite su input $x,y \hspace{0.1em}$. 
- $y=0$ vengono eseguite le linee $1,2 \rightarrow T=2$ 
- $y > 0$ :
	- vengono eseguite le linee $1, 3, 4, 5, 7 \rightarrow T = 5$
	- viene eseguita la linea $6$ per $y$ dispari $\rightarrow T ≤ 1$ 
	- la linea $3$ esegue una chiamata ricorsiva con un suo tempo $\rightarrow T(x, \lfloor \dfrac{y}{2} \rfloor)$

$T_{tot} ≤ 6 + T(x, \lfloor \dfrac{y}{2} \rfloor)$
$$
\begin{flalign}
T(x, y) ≤
\begin{cases}
2 & \text{se } y = 0 \\
6 + T(x, \lfloor \dfrac{y}{2} \rfloor) & \text{altrimenti}
\end{cases} \quad \longrightarrow \text{equazione di ricorrenza} && 
\end{flalign}
$$
###### Secondo Caso

