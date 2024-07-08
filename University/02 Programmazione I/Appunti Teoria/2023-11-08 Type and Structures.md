#### Type Keyword
- **Type Alias** (alias di tipo): `{go}type intero = int`. Serve a definire dei type alias: sono dei nomi per richiamare i tipi diversamente. I type alias quindi denotano lo stesso tipo e sono solo modi diversi per riferirci ad esso.
- La `rune` e il `byte` sono rispettivamente il type alias dell'`int32` e dell'`int8`: si riferiscono quindi allo stesso tipo ma con un nome diverso. È zucchero sintattico.
```go unwrap title:"Type Alias"
type intero = int //creo un type alias intero di int (stessa cosa)
type rune = int32 //rune è di base un type alias di int32
type byte = int8 //byte è un type alias di int8
	
func main() {
	var x intero = 5 //x è effettivamente un intero 
	Println(x)
}
```

**Type Definition** o Type Declaration (definizione o dichiarazione di tipo): `{go}type name int` crea un nuovo tipo `name` sulla base di quello preesistente che gli viene passato, in questo caso `{go}int`. Nonostante ciò sono due tipi distinti, che rimangono però perfettamente convertibili tra di loro.
```go unwrap title:"Utilizzo dei Type Definition per dichiarare unità di temperatura diverse"
type Celsius float64
type Fahrenheit float64
	
func CtoF(c Celsius) Fahrenheit {
	return Fahrenheit(float64(c) * 9/5 + 32)
}
	
func main() {
	c := Celsius(32.5) //var c Celsius = 32.5
	f := Fahrenheit(CtoF(c)) //var f Fahrenheit = CtoF(c) = 90.5
	Println(c, f)
}
```

#### Structures
##### Strutture definite come Variabili
Sono delle variabili più complesse definite dall'utente che vengono usate per raggruppare altre variabili, anche di tipo diverso, in un unico tipo/gruppo. Le variabili struttura si dichiarano come `{go}var name struct { key type }`
>Sono comparabili alle classi della programmazione ad oggetti, con la differenze che però non supportano l'ereditarietà. 

Per accedere ai valori delle chiavi della struttura: `{go}struct_name.key` 

```go unwrap title:"Dichiarazione di una variabile struttura" err:8
func main() {
	var Address struct {
		city string
		street string
		civic int
	}
	Address.city = "Parma"; Address.street = "Verdi"; Address.civic = 8
	//Address{street:"Verdi", civic:8} non va in quanto non è un tipo
	Println(Address) //output: solo i valori della struct
	Printf("%+v\n", Address) //output: chiavi e valori della struct

}
```

##### Strutture definite come tipi
Le strutture possono essere definite come tipi
```go unwrap title:
type Person struct {
	age int
	height float64
	name string
}

type Address struct {
	city string
	street string
	civic int
}

type Identity struct {
	info *Person // La struttura Person non viene ricopiata ma viene passato il suo indirizzo
	residence Address // viene ricopiata la struttura Address qui
	worker bool
}

func main() {
	who := Person{age:12, name: "Filippo", height:1.71} //Le variabili vanno messe tramite chiave. Quelle non assegnate hanno il valore di default del tipo
	residence := Address{"Parma", "Verdi", 8} //Le variabili vanno messe tutte ed in ordine
	id := Identity{&who, residence, true}
	id2 := Identity{&Person{age:12, name: "Filippo2", height:1.71}, residence, true}
	Print(who, "\n", residence, "\n", id, "\n", *id2.info, *id.info, id.info)
}
```

###### Puntatori a Strutture
Essendo delle variabili, è possibile usare i puntatori con le strutture.
```go unwrap title:
type myStruct struct {
	a, b int
	f float64
	s string
}

func stampa(s *myStruct) {
	Println("myStruct.b =", s.b)
	Println("myStruct.s =", s.s)
}

func main() {
	t := myStruct{10, 3, .8, "prova"}
	var p *myStruct //puntatore di tipo myStruct
	p = &t
	Println(p.f) //non ha bisogno dell'operatore * quando si usa un puntatore di tipo struttura
	stampa(p) //non ha bisogno dell'operatore & in quanto puntatore di tipo struttura
}
```

***
Metodi per le strutture
https://gobyexample.it/metodi.html

http://www.valeriofinazzo.it/wordpress/2020/08/tutorial-go-metodi-e-interfacce/