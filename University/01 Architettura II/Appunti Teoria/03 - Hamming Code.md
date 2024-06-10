![[Pasted image 20240520105620.png | I C | 600 ]]
We start counting the bits from $1$ to $n$, from left to right. To distinguish it from the position of the bits we call this number index.
- The parity bits are those whose index is a power of 2.

![[Pasted image 20240520105835.png | II R | 150 ]]
Every bit calculates the parity on a specific group of other bits, chosen between the $n$s bits.
**Coverage rule**: a bit with index $h$ is covered by the parity bit $p_{i}$ if and only if $h$ in binary has a $1$ in position $log_{2}i$. 
- The parity bit $p_{1}$ (00001) covers all the indexes that in binary have a $1$ in the bit in position $0$: 00001, 00011, 000101, ...
- The parity bit $p_{2}$ (00010) covers all the indexes that in binary have a $1$ in the bit in position $1$: 00010, 00011, 000110, ...
- etc...

*** 
![[Pasted image 20240520111518.png | I | 625]]

1) Every parity bit covers more bits, including the parity bit itself.
2) A unique combination of parity bits covers every data bit.
3) Those regularities are maintained throughout the pattern for every $n$.

A unique combination of parity bits protects every data bit.

If we receive a data whose parity bit group is incorrect, then there will be only a data bit that can be corrupted, that is the one covered by that parity bit group.
- For example, with a group of 5 parity bits, we can cover up to 31 bits (until the index 31: the bit at index 32 will be the parity bit number 6).

**[...]**

