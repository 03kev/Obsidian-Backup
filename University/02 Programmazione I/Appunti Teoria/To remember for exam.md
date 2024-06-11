###### Assegnamento breve
```go unwrap title:
t := 1  // var t int = 1
x, y := 3, 4 // multiple assignments (var x, y int = 5, 9)
```

###### Indebolimento dell'assegnamento multiplo parallelo
L'assegnamento multiplo parallelo ha un indebolimento della regola della variabile nuova:
`{go}var x int; x:= 1`  non compila, x è già dichiarato.

`{go}var x int; x, y := 5, 6`  compila, perchè il Go assegna un valore alla variabile `{go}x`  già dichiarata, e invece dichiara `{go}y` . Per fare però in modo che assegni un valore a una variabile già dichiarata, nell'assegnamento multiplo deve esserci almeno una nuova variabile a sinistra da dichiarare. Esempio:
`{go}var x, y int; x, y := 5, 6`  non compila.

###### Zucchero sintattico
Con "zucchero sintattico" si intendono i costrutti sintattici che non cambiano la struttura del programma ma soltanto la forma. L'assgnazione breve è un caso evidente di zucchero sintattico.

###### Variabili float
Variabile float64 -> deriva da floating point. Contiene valori frazionali.
In go non puoi dividere un float per un intero. Si risolve con`{go} n := x.0` . 
- A meno che non si faccia tra una costante e il float, in questo caso non c'è interferenza di tipo. Es: `2 * float`  funziona. 
- `n := 2; n * float` non funziona. Il go nel primo caso intende in maniera autonoma il 2 come 2.0 in ordine da portare a termine l'operazione.

###### Istruzione If
Istruzione di selezione: ci permette sulla base di una condizione di eseguire una parte di codice o un'altra
!= , \==, >, <, >=, <= operandi di confronto
```go unwrap title:
if COND {
	CORPO: il codice in questo blocco viene eseguito solo se la condizione è vera
} else if COND2 {
	CORPO2: il codice in questo blocco viene eseguito solo se la condizione del primo blocco è falsa e se questa è vera
} else { //COND3
	CORPO3: il codice in questo blocco viene eseguito solo se la condizioni dei blocchi precedenti sono false
}
```
L'if è concatenabile. In un if a catena si esegue al più un singolo corpo (se c'è l'else almeno uno)

COND è una condizione che restituisce un tipo booleano. L'if non accetta quindi una condizione, ma ciò che questa restituisce, ossia una variabile booleana, `{go}var bool.` 
Ha solo due valori: `true`e `false`. Gli operatori di confronto prendono due espressioni, le comparano e restituiscono un'espressione booleana a seconda se la condizione sia vera o falsa.

###### Algebra di Boole
Con delle operazioni logiche che per i booleani sono diverse da quelle dell'algebra normale. Da questa derivano gli operatori logici: || or, && and, ! not
- || e && sono binari (prendono 2 argomenti: EXPR || EXPR)
- ! è unario (prende un argomento: !EXPR)

Funzionamento:
- && restituisce true se entrambe le condizioni, e quindi entrambi i booleani, sono veri: T && T = T.
- || restituisce false se almeno una delle condizioni (e quindi almeno uno dei due bool) è vera. E' l'oppure inclusivo
- ! prende un'espressione e lo converte nel valore booleano opposto. !(a\==b) è uguale ad a!=b

###### Variabili locali
Le variabili valgono solo nel blocco in cui sono definite (per esempio in un blocco if). 
`{go}if a := b*b; b > 0 { ... }`  $a$ è dichiarata nell'if ed è definita solo nel suo blocco.

###### Cicli
Il for è l'unica istruzione per eseguire un ciclo in go
`{go}for { ... } = for true { ... } = for ;; { ... } // while true { ... }` 
`{go}for x >= 0 { ... } // while x >= 0 { ... }`

Ciclo for ternario:
`{go}for i := 0; i < n; i ++ { ... }` 
`for 1°_ISTRUZIONE; ESPRESSIONE_BOOLEANA; 2°_ISTRUZIONE { CORPO }`

- Viene eseguita la 1° istruzione (di solito di assegnamento/dichiarazione di variabile pari a 0)
- Si controlla l'espressione booleana che, se restituisce true, fa proseguire il ciclo. In caso contrario si esce dal ciclo.
- Si esegue il corpo
- Viene eseguita la 2° istruzione (di solito di incremento della variabile assegnata/dichiarata)
- Si prosegue ricontrollando l'espressione booleana, eseguendo il corpo, ecc...

Tutte le 3 parti del ciclo sono omettibili. Se si omette l'espressione booleana, di default diventa true.

`{go}for i := n - 1; i >= 0; i-- { ... }` Forma idiomatica di un ciclo in discesa

###### Conversione di tipo
Nelle espressioni di go bisogna utilizzare variabili dello stesso tipo -> int * float64 = error
`{go}b := int(a)`
`{go}b := float64(a)` 

###### Break
si usa per uscire da un ciclo

###### Shadowing
Dichiarare in un contesto lessicale più piccolo (in un sotto-blocco) una variabile che esiste in un contesto lessicale più ampio.

```go unwrap title:
func main() {
	n := 3;
	if n > 0 {
		n := 2
		Println(n)
	}
	Println(n)
	//Output: 2, 3. n è in shadowing
}
```

```go unwrap title:
func main() {
	n := 3;
	if n > 0 {
		n, a := 2, 5
		Println(n, a)
	}
	Println(n)
	/* n non è in shadowing per via dell'indebolimento dell'asssegnamento multiplo
	   parallelo: n non viene ridichiarata in oscuramento ma solo riassegnata, 
	   mentre a viene dichiarata. */
}
```


###### Funzioni
```go unwrap title:
func main() {
	func nome(n int) (int, int) {
		return n * 2, n / 2
	}
}
```

```go unwrap title:
func main() {
	func nome(n int) (c int) {
		c = n * 2
		return
	}
}
```

`{go}c`  variabile locale alla funzione. Assegnando il valore alla variabile decidiamo il valore restituito dalla funzione senza doverlo specificare nel return.

***

##### Domande orale Vigna

- Operatori &, || e !
- Varie forme di ciclo for in go
	- For range
	- 3 tipi di for range: stringhe, slice/array, mappe
	- Ciclo for: come viene eseguito?
- Break - interrompe ciclo; continua - interrompe l'esecuzione del corpo e passi all'istruzione successiva
- Come è la rappresentazione interna delle stringhe in go?
	-  Conversione di una slice di rune
- Slice? Tutto a riguardo (appunti)
	- Differenza tra array e slice
	- Subslicing di una slice
		- operatore di subslice e a cosa si può applicare - slice di byte, stringhe, vettori che danno una slice
- Dichiarare una funzione dentro una funzione
- Puntatori
- Bit byte in int64 int int32
- In una mappa la chiave deve essere sempre diversa, non può essere uguale, ma il valore invece può esserlo.
- Switch ( == se non c'è niente prima delle graffe vale true)
	- Switch x (x variabile o condizione)
- Differenza tra passare una slice / vettore a una funione

###### Esercizi
- Fare struct e fare una funzione che restituisca l'età moltiplicata per due
- Contare le parole di una stringa di rune usando comandi tipo unicode.IsLetter
- Trovare elementi comuni di due slice e stamparli
- Dichiarare una funzione che prende due argomenti da int a interi e restituisce una funzione da int e int
- Verificare la distanza tra due elementi di una mappa