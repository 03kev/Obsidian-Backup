#### Controllo di flusso
Il controllo di flusso è realizzato usando solo due costrutti:
- **Jump** (salto): modifica l'indirizzo della prossima istruzione
- **Branch**: modifica l'indirizzo della prossima istruzione solo se si verifica una data condizione

Entrambi i comandi modificano il PC, quel registro speciale che memorizza l'indirizzo della prossima istruzione da eseguire.
- Dopo un'istruzione, il PC viene automaticamente incrementato per andare all'istruzione successiva tramite un offset di 4 bytes.
- Nel caso invece avvenga un salto, il PC viene sostituito da un dato indirizzo target specificato dal comando di salto
###### Jump
È un salto incondizionato, ossia che viene sempre eseguito. Le istruzioni sono `j (jump)`e `jr (jump register)`:

![[Pasted image 20240410140237.png | I C | 700]]



