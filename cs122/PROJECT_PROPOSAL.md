# Project Proposal
**CS 122-04 · Advanced Programming with Python · Fall 2026**  
Team Submission for Project Assignment #1

**Canvas Google Doc:** [CS 122-04 Project Proposal — Team Plentium](https://docs.google.com/document/d/1P5el4z14J5S7dQVx1oTMN2lw8GZLxelpZ1kZehxoqsI/edit)

## Team Introduction

**Team Name:** Plentium

**Team Members:**
- Veer Saraf
- *[Add Canvas group member 2]*
- *[Add Canvas group member 3, if the group is three]*

**Team Motto:** Measure the frontier.

## Dataset Choice & Justification

**Dataset Title:** Our World in Data — Complete Energy Dataset

**Source Link:** [https://github.com/owid/energy-data](https://github.com/owid/energy-data)  
**CSV download:** [https://github.com/owid/energy-data/raw/master/owid-energy-data.csv](https://github.com/owid/energy-data/raw/master/owid-energy-data.csv)  
**Codebook:** [https://github.com/owid/energy-data/blob/master/owid-energy-codebook.csv](https://github.com/owid/energy-data/blob/master/owid-energy-codebook.csv)

**License:** Creative Commons BY (free for public use with attribution)

**Size / Scope:**
- 23,377 country-year rows × 130 columns (~8.9 MB CSV)
- 314 countries and regions; years 1900–2025
- About 66% empty cells in the current file (missingness is real, not a download error)
- After melting metric columns into long format, the table expands to on the order of **3 million** observations — well above the lecture guideline of ≥ 100,000 rows or equivalent size/complexity

**Description:**  
Each row is one geographic entity and year. Columns cover primary energy consumption, electricity generation, fuel shares (coal, oil, gas, hydro, nuclear, solar, wind, biofuel), per-capita measures, year-over-year change, population, and GDP. Our World in Data curates the file from the Energy Institute *Statistical Review of World Energy*, Ember yearly electricity data, and related public sources, and publishes a codebook for every column.

**Justification:**  
This dataset is a good fit for CS 122 because it is public, well documented, and messy in the ways the course actually grades: missing values, mixed units, country vs. region aggregates, and a wide table that has to be cleaned before it is useful. It is also meaningful. Energy use is tightly tied to living standards, and the mix of fossil fuels versus nuclear and renewables is one of the central public questions of the decade. The file is large enough to require pandas (not a spreadsheet), small enough to keep on a laptop, and structured so we can store a cleaned subset in SQLite and serve it from Flask. We will not commit the CSV to GitHub; the `data/` folder will contain download instructions only.

Supporting public sources we may join later (also free, not required for the first milestone):
- [Cost of space launches to LEO (CSIS / Our World in Data)](https://ourworldindata.org/grapher/cost-space-launches-low-earth-orbit)
- IAEA PRIS reactor and waste statistics, if we add a nuclear chapter

## Vision Statement

**Problem / Question:**  
Is the world actually moving toward *energy abundance* — more useful, cleaner, more reliable energy per person — or is the popular story of decline a better fit for the numbers? Which countries have raised living standards while shifting away from coal and oil, and what roles do nuclear, hydro, solar, and wind play in that shift?

**High-Level Goal:**  
By the end of the semester we will ship a **Python** product, not a JavaScript one: pandas notebooks for exploration, a cleaned SQLite database, seaborn/matplotlib charts, unit tests, and a small Flask app where a user can pick a country and see energy mix, per-capita use, and clean-energy share over time. That app is the CS 122 implementation of **Plentium** — a factual, optimistic look at frontier energy progress. A prior personal Next.js prototype by Veer exists only as design inspiration; **all graded code will be new Python** aligned with this course (pandas, visualization, databases, Flask, tests).

**Potential Users:**  
Students and instructors in this class, plus anyone who wants a numbers-first view of energy progress — journalists, policy-curious readers, and classmates comparing countries they care about.

**End goals (flexible, for planning):**
1. Load, clean, and reshape the OWID energy file, including missing-value handling.
2. Answer the abundance question with charts and summary tables.
3. Expose the cleaned data through a Flask explorer (and SQLite).
4. Stretch: a nuclear and/or space chapter using additional public tables.

## Repository Setup

**GitHub Repo Link:** *To be created in the course org* → [https://github.com/CS122-04-FA26/plentium-owid-energy](https://github.com/CS122-04-FA26/plentium-owid-energy)

**Repo Name:** `plentium-owid-energy`  
(naming convention: `teamname-dataset-theme`)

**Repo Structure (initial):**
- `README.md` — project title, team members, dataset description
- `data/` — download instructions only (no raw CSV)
- `notebooks/` — exploratory analysis (to be added)
- `src/` — Python source (to be added)
- `.gitignore` — Python, virtualenv, `.env`, data files
