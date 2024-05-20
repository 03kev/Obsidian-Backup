Two types of memories:
- Register Files, that are used in the CPU as its working bench. They use SRAM Technology (Static Random Access Memory) which provides a powerful property:
	- RAM: Reading and writing data don't rely on the physical position of the data inside the storage. So that means that it will have a high performance.
	- It's Static because we don't need to refresh the memory cells in order to keep the data

- Main Memory: it's external to the CPU. DRAM Technology, which works like the SRAM with the difference that it's Dynamic: 
	- It's required to refresh the memory cells to keep the data.
	- Two subdivisions of Main Memories: SDRAM and DDR SDRAM.

*** 

Throughout time, the technological development of CPUs has created more performance improvements when compared to what happened to the memories.![[Pasted image 20240417092713.png | II C | 600 ]]
Nowadays CPUs are no longer able to support this exponential growth due to a physical limit: the chips cannot be miniaturized anymore (that's the reason why the graph is flattening in the last decades). 

We have so to organise better the memories in order to fill this technological gap that was made between the development of CPUs and the one of the memories.

*** 
#### Unit of Measurement
![[Pasted image 20240417093729.png | II C | 700]]
10<sup>3</sup> = 1000; 2<sup>10</sup> = 1024

#### Memory Hierarchy
The memory system is organized like a tiered hierarchy. Data can be moved only between layers that are next to each other.
- In the same way, also data are organized in a hierarchy: the layer $i$ contains a subset of data that are stored at the layer $i+1$
- Layers in between the CPU's registers and the Main Memory are called cache.
<tab>
</tab> 
- **Low Levels Memories** (that are closer to the CPU) have high performance but are too expensive, so they are small. 
- On the other hand, **High Levels Memories** have lower performances but are less expensive, and therefore they have a larger capacity.
![[Pasted image 20240417095048.png | I C | 600]]

All the memory accesses are managed following this hierarchy
- Request of a $d$ data to an $i$ layer. Is $d$ stored in $i$?
	- Yes: writing or reading is done
	- No: the request is forwarded to the layer $i+1$ below

<span style="color:rgb(124, 124, 124)">( EXTRA -> MEMORY SWAP: WHEN THE LOWER LAYERS ARE ALL FULL AND THE CPU NEEDS TO ALLOCATE PROCESSES ON THE MASS MEMORY (SSD OR HDD) -> THAT MEANS THAT THE CPU WILL FORWARD THE REQUEST UP TO THE LAST LAYER OF THE HIERARCHY )</span>

#### Cache Memory
![[Pasted image 20240422111048.png | II R | 300]]It's an associative memory: the information that we use to index the data is contained in the data itself.
> The cache can be built, like for the central memory, with a one-dimensional array where every element is a line addressed by an index and containing a block of the data itself (associative memory).

<span style="color:rgb(124, 124, 124)">Split Cache: the instruction cache can be split from the data cache</span>

<span style="color:rgb(102, 102, 102)">[ Terminology and Notation of Cache -> slides ]</span>
##### Direct Mapped Cache
First issue: determine the line index $I(d)$ for a data $d$

Direct mapping: every block in the central memory is associated with a unique index of the cache.
- Issue: there are more blocks in the memory rather than the lines of the cache <span style="color:rgb(102, 102, 102)">(the cache, as a matter of fact, is only a small subset of the memory)</span>, so a line index <span style="color:rgb(102, 102, 102)">(indice di linea)</span> is shared with more central memory blocks.

Solution:
- Find the block's number in memory from the $d$ address:
  $N(d) = div(M(d),\ B)$
- Find the cache index to whom is assigned the block $N(d)$:
  $I(d) = mod(N(d),\ L)$

Now every memory block has preassigned a place in the cache.

<span style="color:rgb(102, 102, 102)">[ Look at the examples on the slides about those two formulas. 3 examples: block smaller than the word, block equal to the word, block bigger than the word ]</span>

***

- If the central memory is organised in blocks, those blocks are in number far greater than the cache lines -> in a single cache line correspond more central memory blocks (like in the examples)
	- It's not sufficient to assign those blocks to the cache lines: we have to identify the specific block that is effectively stored in the cache.

- From the cache line, we also cannot find the address of the data contained in it, but it is also true that we have a restricted area: we know all the addresses of every memory block that could be stored in that specific cache line.

We're going so to explore this issue: finding the address of the data stored in the cache line.

###### Integer division for base power (divisione intera per potenza della base)

- The cache line number is always a power of two: $L = 2^k$
- The dimension of a block is typically defined by an integer number of words: if in the block are stored $2^m$ words that would mean that $B = 2^{m+2}$ -> also $B$ is a power of $2$. 

The previous calculus, done in the CPU, are integer divisions between a binary integer unsigned and a power of $2$.

Given a binary integer unsigned $p$ codified in $b$ bit, by the integer division between $p$ and the $k$-th power of two $2^k$ we have the following:
- The quotient of the division is given by the $b-k$ most significant digits of $p$ (that are extractable with a shift to the right of $k$ positions applied to $p$)
- The remainder of the division is given by the $k$ digits less significant of $p$.

![[Pasted image 20240424093231.png | I]]

We can therefore use this property to implement the access to the cache using the direct mapping.

Considering a cache with $L=2^k$ and $B=2^{m+2}$, we can calculate the line index of a data $d$ like: 

![[Pasted image 20240424093526.png | I]]

So, given a cache with $L$ lines, each of them containing blocks of $B$ bytes, and $M(d)$, the address of the byte or of the word we have to access:

![[Pasted image 20240424094214.png | I]]
**[...]**

*** 

**Third problem**: the copy of the data that is contained in the cache may not be updated. So we have to add a bit of validity.

**[...]**

###### Size of the cache

**[...]**

###### Direct mapped cache implementation

**[...]**

*** 

##### Miss management 

Given the address of a data $M(d)$ now we can tell where to search for it in the cache and to establish whether the data is valid or not.

But when checking for the validity bit and comparing it with the tag, we can also receive back a cache miss.
- When that happens the CPU stops and the block $N(d)$ is moved from the central memory to the cache in the line $I(d)$. 
  Then the validity bit of the line $I(d)$ is set to one and the CPU can start again, doing a cache hit.

###### Writing access

If an instruction requires writing access to a data $d$:

- It's needed to check whether the block $N(d)$ is available in cache or not.
	- If it is, the writing is done to the copy of the data in the cache -> write hit.
	- If it's not we have a write miss. We manage the miss with the previously seen procedure, and once the block containing the data is moved in the cache we proceed with a write hit.

- Now we have another problem: the coherence of the cache. After writing the data in the cache, its version in the central memory is outdated. To fix these, we can adopt two simple solutions:
	- write-through: when the data is written in the cache, it's immediately also written in memory
	- write-back: writing operations only happen in the cache. When a block in the cache is being replaced, before the overwrite its copy in the memory is updated.

***

In a cache mapped directly the data $d$ can only be stored in the line $I(d)$ of the cache
- Access operations are therefore simple
- There is little flexibility when it comes to using memory efficiently
	-  A data can be located only on a single specific cache line -> not flexible
	- For example, a program that has on some cache lines a strong competition between blocks mapped on them, while other line caches are rarely used.

So we need to create a more flexible cache -> therefore it'll have to assign a data to whatever cache line.
![[Pasted image 20240429110329.png | I C | 600]]
##### Fully-associative cache
<span style="color:rgb(124, 124, 124)">The Branch Target Buffer was an example of an associative memory</span>

We've got a problem: in the direct-mapped cache, the address of the data was determined by the index of the cache line in which it was stored. Now that a data can be on every possible cache line, we can't do that anymore.

Instead of using the index cache line, we could use part of the data itself -> that's the reason why it's called associative.

In the cache, there are L ≥ 1 physical lines, but we could consider it like it's just one single line: therefore $L = 1$, and $k = 0$.
- The tag is now made by all the $32-(m+2)$ bits that of the block number.

**[...]**
##### Set-associative cache

The set-associative cache is a generalisation of the previous two types. The cache is partitioned into sets, and every set has storage for $n$ blocks. Every data is associated with a set, and inside it the data can be located in every place within the $n$ possible places.

![[Pasted image 20240429120024.png | I C | 470]]

**[...]** -> Look at notes on paper

***

##### Block Substitution
If we've got an associative memory, we have to decide which of the n places we'll overwrite when we have a miss (we have to put the new data in the cache, and to do so we have to overwrite one of the places in the set).
- Randomly
- Least-Recently Used (LRU): we overwrite the block that is not accessed by the most time
- Pseudo-LRU: a simplified version of LRU

###### LRU
- Use bits approach
	- If we decide to give each line a use field, then the cache will have to reserve $n \times log_{2} (n)$ bits for it in each set <span style="color:rgb(124, 124, 124)">(example in slide 171)</span>
![[Pasted image 20240508093308.png | I C | 600 ]]
- Pseudo-LRU based on BST
	- The cache will have to reserve $n \times log_{2} (n)$ bits for it in each set

![[Pasted image 20240508101121.png | I C | ]]

**[...]** <span style="color:rgb(124, 124, 124)">example in the slides</span> 

*** 
**[...]**

Every data stored in the memory has parity-bit equal to zero.