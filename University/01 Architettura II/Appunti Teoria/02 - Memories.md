Two types of memories:
- Register Files, that are used in the CPU as its working bench. They use the SRAM Technology (Static Random Access Memory) which provides a powerful property:
	- RAM: Reading and writing data don't rely on the physical position of the data inside the storage. So that means that it will have an high performance.
	- It's Static because we don't need to refresh the memory cells in order to keep the data

- Main Memory: it's external to the CPU. DRAM Technology, which works like the SRAM with the difference that it's Dynamic: 
	- It's required to refresh the memory cells to keep the data.
	- Two subdivisions of Main Memories: SDRAM and DDR SDRAM.

*** 

Throughout time, the technological development of CPUs has created more performance improvements when compared to what happened to the memories.![[Pasted image 20240417092713.png | II C | 600 ]]
Nowadays CPUs are no longer able to support this exponential growth due to a physical limit: the chips cannot be miniaturized anymore (that's the reason why the graph is flattening in the last decades). 

We have so to organise better the memories in order to fullfill this technological gap that was made between the development of CPUs and the one of the memories.

*** 
#### Unit of Measurement
![[Pasted image 20240417093729.png | II C | 700]]
10<sup>3</sup> = 1000; 2<sup>10</sup> = 1024

#### Memory Hierarchy

The memory system is organized like a tiered hierarchy. Data can be moved only between layers that are next to each other.
- In the same way, also datas are organized in a hierarchy: the layer i contains a sublayer of data that are stored at the layer i+1
- Layers in between the CPU's registers and the Main Memory are called cache.
<tab>
</tab> 
- **Low Levels Memories** (that are closer to the CPU) have high performance but are too expensive, so they are small. 
- On the other hand **High Levels Memories** have lower performances but are less expensive, and therefore they have larger capacity.
![[Pasted image 20240417095048.png | I C | 600]]

All the memory accesses are managed following this hierarchy
- Request of a *d* data to an *i* layer. Is *d* stored in *i*?
	- Yes: writing or reading is done
	- No: the request is forwarded to the layer i+1 below

( EXTRA: MEMORY SWAP: WHEN THE LOWER LAYERS ARE ALL FULL AND THE CPU NEEDS TO ALLOCATE PROCESSES ON THE MASS MEMORY (SSD OR HDD) -> THAT MEANS THAT THE CPU WILL FORWARD THE REQUEST UNTIL THE LAST LAYER OF THE HIERARCHY )

#### Cache Memory

It's an associative memory: the information that we use to index the data is contained in the data itself.

[ Terminology and Notation of Cache ]

( Split Cache: the instruction cache can be splitted from the data cache )
