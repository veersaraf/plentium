# {Team name} — energy abundance, in numbers

**CS 122-04 · Advanced Programming with Python · Fall 2026**  
Intended org repo: `{teamname}-owid-energy`

A Python project that tests the *energy abundance* thesis with public data: do countries that consume more energy, and more nuclear/renewable electricity, actually look more prosperous in the numbers?

## Team

- Veer Saraf
- *[Add teammate 2]*
- *[Add teammate 3 if applicable]*

**Name options (pick one):** Frontier Facts · Wattward · Amply · Cleargrid · Joulerise

## Dataset

**Our World in Data — Complete Energy Dataset** (CC BY)

- Source: https://github.com/owid/energy-data
- See [`data/README.md`](data/README.md) for download instructions. **Do not commit the CSV.**

The file is a country-year table of energy consumption, electricity mix, per-capita measures, population, and GDP (about 23k rows × 130 columns, years 1900–2025). It has substantial missing values, which we will handle in pandas.

## Project structure

```
README.md
data/          # download instructions only
notebooks/     # pandas / seaborn exploration
src/           # Flask app, database helpers, tests
.gitignore
```

## Setup (later milestones)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python data/download.py   # to be added
```

## License / attribution

OWID energy data is used under Creative Commons BY. Please credit Our World in Data and the original sources listed in their codebook.
