# pkmn-async

![version](http://img.shields.io/badge/status-0.0.1.beta-yellow.svg)&nbsp;
[![Build Status](https://api.travis-ci.org/gamephreak/pkmn.svg)](https://travis-ci.org/gamephreak/pkmn)
[![Coverage
Status](https://coveralls.io/repos/github/gamephreak/pkmn/badge.svg?branch=async)](https://coveralls.io/github/gamephreak/pkmn?branch=async)

pkmn-async provides fundamental types and data structures for building products
around Pokémon. pkmn-async exposes curated data and methods (munged using
[pkmunge](https://github.com/gamephreak/pkmunge)) from
[Pokémon Showdown](https://github.com/Zarel/Pokemon-Showdown) and
[Honko's Damage Calculator](https://github.com/Zarel/honko-damagecalc).

pkmn-async is designed to support all generations of Pokémon, with later
generations implemented as patches to the earlier ones. If your code does not
require functionality from the latest generations you will not be forced to load
all of the extra data. pkmn-async makes heavy use of `async` and `await` to
defer loading of expensive data files until strictly required. If you wish to
use a synchronous API, please instead depend on the main
**[pkmn](https://github.com/gamephreak/pkmn)** library.

## Sources

### Pokémon Showdown

Pokémon Showdown's
[`/data`](https://github.com/Zarel/Pokemon-Showdown/tree/master/data) (and
[`/mods`](https://github.com/Zarel/Pokemon-Showdown/tree/master/mods))
directories serve as the source for most of the data, validated against Honko
and the [Pokémon Database](https://pokemondb.net). However, Showdown is designed
such that the earlier generations are implemented as mods/patches on the latest
generation - the reverse of pkmn-async. Furthermore, Showdown intermingles data
and logic within its `data` directories - pkmn-async maintains a strict
seperation of data (stored as JSON) and logic. pkmn's design is not an
indictment of Showdown's architecture - one can argue actually it serves the
project quite well - it simply has different goals and constraints.

pkmn-async's data diverges from Showdown's in that it removes information that
is not required/present in the earlier generations (eg. Showdown data for
earlier generations sometimes references Pokémon/formes/concepts that do not
exist). [pkmunge](https://github.com/gamephreak/pkmunge) provides a good
reference for how exactly Showdown's data maps to pkmn-async's.

### Honko's Damage Calculator

Honko's Damage Calculator is structured in the same 'later generations
implemented as patches' manner that pkmn-async uses, but the project requires
drastically less details than are present in the full Pokémon Showdown dataset.
[dmgcalc](https://github.com/gamephreak/dmgcalc) is a refactored version of the
calculator which is built as a library on top of pkmn-async, serving as the base
for an updated
[gamephreak/honko-damagecalc](https://github.com/gamephreak/honko-damagecalc)
GUI.

## Extensions

[pkmnx](https://github.com/gamephreak/pkmnx) contains extensions to the basic
datatypes that are not necessarily required for all projects (for example,
learnset and ruleset information). pkmnx can be used as a drop in replacement
for pkmn provided your project requires the added functionality. **NOTE:**
pkmnx is strictly synchronous.

## License & Credits

pkmn-async is distributed under the terms of the MIT License.

pkmn-async owes a large debt to
[Pokémon Showdown](https://github.com/Zarel/Pokemon-Showdown/blob/master/README.md#credits)
and
[Honko's Damage Calculator](https://github.com/Zarel/honko-damagecalc#credits-and-license)
contributors.
