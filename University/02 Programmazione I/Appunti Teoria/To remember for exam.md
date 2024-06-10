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