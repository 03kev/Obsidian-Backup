
###### Zucchero sintattico
Con "zucchero sintattico" si intendono i costrutti sintattici che non cambiano la struttura del programma ma soltanto la forma. L'assgnazione breve è un caso evidente di zucchero sintattico.

#### Variables
A var declaration creates a variable of a particular type, attaches a name to it, and sets its initial value. Each declaration has the general form `{go}var name type = expression`

Either the type or the = expression part may be omitted, but not both. If the type is omitted,
it is determined by the initializer expression. If the expression is omitted, the initial value is the zero value for the type, which is 0 for numbers, false for booleans, "" for strings, and nil for interfaces and reference types (slice, pointer, map, channel, function). The zero value of an aggregate type like an array or a struct has the zero value of all of its elements or fields.

##### Declarations
A declaration names a program entity and specifies some or all of its properties. There are four major kinds of declarations: var, const, type, and func.

##### Dichiarazione breve
```go unwrap title:
t := 1  // var t int = 1  // NomeVariabile = [Espressione] // tipo sulla base dell'espressione
x, y := 3, 4 // multiple assignments (var x, y int = 5, 9)
```
Within a function, an alternate form called a short variable declaration may be used to declare and initialize local variables. It takes the form `{go}name := expression`, and the type of *name* is determined by the type of *expression*.

Keep in mind that := is a declaration, whereas = is an assignment. A multi-variable declaration should not be confused with a tuple assignment, in which each variable on the left-hand side is assigned the corresponding value from the right-hand side:`{go}i, j = j, i // swap values of i and j`
###### Indebolimento dell'assegnamento multiplo parallelo
L'assegnamento multiplo parallelo ha un indebolimento della regola della variabile nuova:
`{go}var x int; x:= 1`  non compila, x è già dichiarato.

`{go}var x int; x, y := 5, 6`  compila, perchè il Go assegna un valore alla variabile `{go}x`  già dichiarata, e invece dichiara `{go}y` . Per fare però in modo che assegni un valore a una variabile già dichiarata, nell'assegnamento multiplo deve esserci almeno una nuova variabile a sinistra da dichiarare. Esempio:
`{go}var x, y int; x, y := 5, 6`  non compila.

<span style="color:rgb(124, 124, 124)">One subtle but important point: a short variable declaration does not necessarily declare all the variables on its left-hand side. If some of them were already declared in the same lexical block, then the short variable declaration acts like an assignment to those variables.</span>

##### Assegnamento
The value held by a variable is updated by an assignment statement, which in its simplest form
has a variable on the left of the = sign and an expression on the right.
```go unwrap title:
x = 1                             // named variable
*p = true                         // indirect variable
person.name = "bob"               // struct field
count[x] = count[x] * scale       // array or slice or map element
```

Assignments statements are an explicit form of assignment, but there are many places in a program where an assignment occurs implicitly: 
- a function call implicitly assigns the argument values to the corresponding parameter variables
- a return statement implicitly assigns the return operands to the corresponding result variables
- a literal expression for a composite type such as `{go}medals := []string{"gold", "silver"}` implitcitly assigns each element as if it had been written like this: `{go}medals[0] = "gold"; medals[1] = "silver"` 

##### Assegnamento Tupla
Another form of assignment, known as tuple assignment, allows several variables to be assigned at once. All of the right-hand side expressions are evaluated before any of the variables are updated, making this form most useful when some of the variables appear on both sides of the assignment, as happens, for example, when swapping the values of two variables: `x, y = y, x`

***

#### Type declaration
A type declaration defines a new named type that has the same underlying type as an existing type. The named type provides a way to separate different and perhaps incompatible uses of the underlying type so that they can't be mixed unintentionally: `{go}type name underlying_type`

<span style="color:rgb(124, 124, 124)">Type declarations most often appear at package level, where the named type is visible throughout the package, and if the name is exported (it starts with an upper-case letter), it's accessible from other packages as well.</span>

***

#### Scope
A declaration associates a name with a program entity, such as a function or a variable. The scope of a declaration is the part of the source code where a use of the declared name refers to that declaration.

Scope and lifetime are not the same thing: 
- the scope of a declaration is a region of the program text: it's a compile time property
- the lifetime of a variable is the range of time during execution when the variable can be referred to by other parts of the program: it's a run time property

###### Syntactic block
A syntactic block is a sequence of statements enclosed in braces like those that surround the body of a function or loop. A name declared inside a syntactic block is not visible outside that block. The block encloses its declarations and determines their scope. 
- We can generalize this notion of blocks to include other groupings of declarations that are not explicitly surrounded by braces in the source code; we'll call them all lexical blocks. There is a lexical block for each for, if and switch statement, for each case in a switch statement, etc...

Declarations outside any function, that is at package level, can be referred to from any file in the same package.
- <span style="color:rgb(124, 124, 124)">Imported packages, such as fmt in the tempconv example, are declared at the file level, so they can be referred to from the same file, but not from another file in the same package without another import.</span>

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

A program may contain multiple declarations of the same name so long as each declaration is in a different lexical block. For example, you can declare a local variable with the same name as a package level variable.

When the compiler encounters a reference to a name, it looks for a declaration, starting with the innermost enclosing lexical block and working up to the universe block. If the compiler finds no declaration, it reports an "undeclared name" error. If a name is declared in both an outer block and an inner block, the inner declaration will be found first. In that case, the inner declaration is said to shadow or hide the outer one, making it inaccessible.

###### For scope
Not all lexical blocks correspond to explicit brace-delimited sequences of statements; some are merely implied. 

The for loop creates two lexical blocks: the explicit block for the loop body, and an implicit block that additionally encloses the variables declared by the initialization clause, such as i. The scope of a variable declared in the implicit block is the condition, post-statement (i++), and body of the for statement.

###### If, switch scope
Like for loops, if statements and switch statements also create implicit blocks in addition to their body blocks.

```go unwrap err:12 title:
func main() {
	f := func() int { return 2 }
	g := func(x int) int { return x+1-1 }
	
	if x := f(); x == 0 {
		Println(x)
	} else if y := g(x); x == y { // the x declared above is also visible here
		Println(x, y)
	} else { // the x and y declared above are also visible here
		Println(x)
	}
	//Println(x, y) // compile error: x and y are not visible here
}
```

The second if statement is nested within the first, so variables declared within the first statement's initializer are visible within the second. 
- Similar rules apply to each case of a switch statement: there is a block for the condition and a block for each case body. 


***

##### Puntatori
A pointer value is the address of a variable. A pointer is thus the location at which a value is stored. Not every value has an address, but every variable does. With a pointer, we can read or update the value of a variable indirectly, without using or even knowing the name of the variable, if indeed it has a name.

Another way to create a variable is to use the built-in function new. The expression new(T) creates an unnamed variable of type T, initializes it to the zero value of T, and returns its address, which is a value of type \*T.


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
- Differenza tra passare una slice / vettore a una funzione


- defer, panic e recover per gestire i segmentation fault
###### Esercizi
- Fare struct e fare una funzione che restituisca l'età moltiplicata per due
- Contare le parole di una stringa di rune usando comandi tipo unicode.IsLetter
- Trovare elementi comuni di due slice e stamparli
- Dichiarare una funzione che prende due argomenti da int a interi e restituisce una funzione da int e int
- Verificare la distanza tra due elementi di una mappa

***

Il programma di massima del corso è il seguente (TWG=The Way to Go):

1. Introduzione al corso. Architettura del calcolatore. Che cos'è l'informatica. Linguaggi di programmazione (macchina, assembly, alto livello). Il calcolatore come macchina programmabile.
2. La macchina di von Neumann. Informazione (bit, byte,...). Caricamento in RAM del programma, fetch-decode-execute. Architettura della CPU: ALU e CU. Un esempio di CPU con relativo linguaggio assembly.
3. Ciclo di vita del software. Strumenti per la programmazione. Storia di go. Il primo programma in go [TWG4]. Il go tool. Compilazione. Esecuzione. Formattazione. Documentazione. [TWG3]
4. Discussione degli aspetti lessicali e sintattici. Commenti [TWG4]. Struttura generale di un programma go: programma, pacchetti, sorgenti. La libreria standard. [TWG4]
5. Variabili: nome, tipo, valore, visibilità (scope). Tipi. Classificazione dei tipi (tipi di base, tipi composti, interfacce). Dichiarazione, assegnamenti e assegnamenti multipli, short-assignment. [TWG4]
6. I/O di base: fmt.Println, fmt.Print, fmt.Scan. Tipi di base numerici (int, float64). Espressioni numeriche. Conversioni. Variabili inutilizzate e blank variable. [TWG4]
7. Selezione binaria (if). Il tipo bool e gli operatori booleani. Esercizi. [TWG5]
8. Ancora sull'if: variabili locali all'if (locali ai blocchi; locali al costrutto). Esempi.
9. Il ciclo (for): versione unaria, ternaria, zeraria. Esercizi. [TWG5]
10. I caratteri (ASCII, Unicode, UTF-8). Tipo rune. Tipo string: differenze fra raw e UTF-8. Funzione len. Quarta forma del ciclo for (range). [TWG4]
11. Funzioni: parametri, segnatura argomenti. Passaggio per valore. Valori restituiti. Valori restituiti con nome. [TWG6]
12. Esercizi con i cicli semplici e funzioni. Istruzioni break e continue. [TWG5]
13. Esercizi con i cicli annidati.
14. Rappresentazione dell'informazione. Notazione posizionale. Rappresentazione degli interi negativi. Range di rappresentazione, overflow. Tipi interi a lunghezza fissa. Cenni alla rappresentazione dei reali: virgola fissa e mobile (standard IEEE 754). Cenni al tipo complex. [Dispense, TWG4, TWG5]
15. Selezione multiaria (switch). [TWG5]
16. Esercizi. Pacchetto strconv e pacchetto strings. [TWG]
17. Puntatori: operatori * e &. La funzione new. [TWG4]
18. Type: alias e definizioni. Struct. Esercizi con puntatori e struct.
19. Array e slice. Inizializzatori. Applicazione dei for range. Funzione append. [TWG7]
20. Esercizi. Subslicing. fmt.Printf. Argomenti da riga di comando.
21. Generazione numeri pseudocasuali. Pacchetto math. Esercizi.
22. Mappe. Applicazione dei for range. Conversione di string a []rune. Esercizi. [TWG8]
23. Ricorsione. Stack di esecuzione. [TWG6]
24. Esercizi sulla ricorsione.
25. Metodi. Interfacce (cenni). Esempi: Stringer, Reader, Writer. [TWG10, TWG11 (cenni)]
26. Grafica con il pacchetto github.com/holizz/terrapin. Esempio semplice. Frattali e curva di Koch. Un motore di ricerca.
27. Tipi funzione e chiusure (cenni). Esempi dalle librerie (ordinamento, shuffling, ricerca in stringhe). L'esempio dell'integrazione numerica (metodo Monte–Carlo). [TWG6]
28. Ordinamento e ricerca tramite funzioni di libreria. I/O di base. [TWG6, TWG12, TWG13]
29. I/O avanzato. File, `panic`, `defer` e `recover`. [TWG6, TWG12, TWG13]
30. Pacchetti e struttura. Visibilità. Documentare un pacchetto.
31. Esercitazione: lettura di un file di testo con formato prestabilito, espressioni regolari, gestione degli errori di I/O e di parsing.
32. Testing unitario e funzionale. (E2E) [TWG13]
33. Il linguaggio C. Il gcc. Differenze sintattiche: punto-e-virgola, parentesi nelle strutture di controllo, dichiarazioni di variabili, tipi e funzioni. Differenze nelle strutture di controllo del flusso (switch, while, do-while). Uso di istruzioni semplici nelle strutture di controllo. Inclusione vs. importazione.
34. Assenza di stringhe, slice, mappe. Uso dei char[] per le stringhe. Tipi elementari e dipendenza dal compilatore; uso di tipi specifici (stdint.h, bool.h). Cast impliciti. Definizione di macro. Funzioni di libreria. Parametri da riga di comando.
35. Puntatori, aritmetica dei puntatori. Gestione della memoria: malloc, free.
36. Goroutine e canali.