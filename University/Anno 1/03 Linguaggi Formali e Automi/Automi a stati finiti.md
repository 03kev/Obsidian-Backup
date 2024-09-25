**[ Slide 1/8 ... ]**

In dettaglio:
- In ogni istante di tempo T l'automa si trova in un particolare stato. 
	Inizialmente A si trova in uno stato detto iniziale: q<sub>0</sub>.
-  In funzione del simbolo letto e dello stato attuale A cambia stato:
	- δ = funzione di Transizione
	- δ (q, σ) = stato prossimo di A essendo in q e leggendo σ
- Una volta letta l'intera parola w A raggiunge uno stato p e l'uscita dipende da p:
	λ (p) = 0 ∨ 1 funzione di uscita

Definizione: un automa a stati finiti è una tupla $A = <\Sigma, Q, \delta, q_0, \lambda /F>$ 
Dove:
- $\Sigma$ = alfabeto di input
- $Q$ = insieme degli stati (se Q è finito A è a stati finiti)
- $\delta$ = funzione di transizione $\delta : Q \mathbb(X) \Sigma \rightarrow q$ 

***

