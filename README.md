# @pkmn.cc/data

![version](http://img.shields.io/badge/status-0.0.1.beta-yellow.svg)&nbsp;
[![Build Status](https://api.travis-ci.org/pkmn-cc/data.svg)](https://travis-ci.org/pkmn-cc/data)&nbsp;
[![Coverage Status](https://coveralls.io/repos/github/pkmn-cc/data/badge.svg?branch=master)](https://coveralls.io/github/pkmn-cc/data?branch=master)

@pkmn.cc/data provides fundamental types and data structures for building
products around Pokémon. @pkmn.cc/data exposes curated data and methods (munged
using [@pkmn.cc/munge](https://github.com/pkmn-cc/munge)) from
[Pokémon Showdown](https://github.com/Zarel/Pokemon-Showdown) and
[Honko's Damage Calculator](https://github.com/Zarel/honko-damagecalc).

@pkmn.cc/data is designed to support all generations of Pokémon, with later
generations implemented as patches to the earlier ones. If your code does not
require functionality from the latest generations and you are worried about
being forced to load extra data, please consider the
**[@pkmn.cc/data-async](https://github.com/pkmn-cc/data/tree/async)** branch
which makes heavy use of `async` and `await` to defer loading of expensive data
files until strictly required.

## Sources

### Pokémon Showdown

Pokémon Showdown's
[`/data`](https://github.com/Zarel/Pokemon-Showdown/tree/master/data) (and
[`/mods`](https://github.com/Zarel/Pokemon-Showdown/tree/master/mods))
directories serve as the source for most of the data, validated against Honko
and the [Pokémon Database](https://pokemondb.net). However, Showdown is designed
such that the earlier generations are implemented as mods/patches on the latest
generation - the reverse of @pkmn.cc/data. Furthermore, Showdown intermingles
data and logic within its `data` directories - @pkmn.cc/data maintains a strict
seperation of data (stored as JSON) and logic. @pkmn.cc/data's design is not an
indictment of Showdown's architecture - one can argue actually it serves the
project quite well - it simply has different goals and constraints.

@pkmn.cc/data's data diverges from Showdown's in that it removes information
that is not required/present in the earlier generations (eg. Showdown data for
earlier generations sometimes references Pokémon/formes/concepts that do not
exist). [@pkmn.cc/munge](https://github.com/pkmn-cc/munge) provides a good
reference for how exactly Showdown's data maps to @pkmn.cc/data's.

### Honko's Damage Calculator

Honko's Damage Calculator is structured in the same 'later generations
implemented as patches' manner that @pkmn.cc/data uses, but the project requires
drastically less details than are present in the full Pokémon Showdown dataset.
[@pkmn.cc/dmg](https://github.com/pkmn-cc/dmg) is a refactored version of the
calculator which is built as a library on top of @pkmn.cc/data, serving as the
base for an updated
[pkmn-cc/honko-damagecalc](https://github.com/pkmn-cc/honko-damagecalc) GUI.

## Extensions

[@pkmn.cc/datax](https://github.com/pkmn-cc/datax) contains extensions to the
basic datatypes that are not necessarily required for all projects (for example,
learnset and ruleset information). @pkmn.cc/datax can be used as a drop in
replacement for @pkmn.cc/data provided your project requires the added
functionality.

## License & Credits

@pkmn.cc/data is distributed under the terms of the MIT License.

@pkmn.cc/data owes a large debt to
[Pokémon Showdown](https://github.com/Zarel/Pokemon-Showdown/blob/master/README.md#credits)
and
[Honko's Damage Calculator](https://github.com/Zarel/honko-damagecalc#credits-and-license)
contributors.
