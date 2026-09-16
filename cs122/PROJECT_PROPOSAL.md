# Project Proposal
Team Submission for Project Assignment #1

**Google Doc:** https://docs.google.com/document/d/19zjeI0rYYKL9YKL1F9Vge2TmZPnFLSHEi8rxdcB7whI/edit

## Team Introduction

**Team Name:** Frontier Facts

**Team Members:**
- Veer Saraf
- [Name]
- [Name]

**Team Motto:** A positive, unified, and factual way to look at humanity's frontier technologies — the ones carrying us toward a world of abundance.

## Dataset Choice & Justification

**Dataset Title:** Ember Monthly Electricity Data

**Source Link:** https://ember-energy.org/data/monthly-electricity-data/

**Direct file:** https://storage.googleapis.com/emb-prod-bkt-publicdata/public-downloads/monthly_full_release_long_format.csv

**Size/Scope:** About 515,000 rows, 18 columns, 67 MB. About 100 countries. Monthly from 1999 through mid-2026. Public and free (credit Ember).

**Description:** Each row is one country, one month, and one number — for example how much electricity that country made from nuclear, solar, wind, coal, or gas that month. It also has total demand and power-sector emissions.

**Justification:** We want to see if the world is making more electricity, and cleaner electricity, over time. This file is public, free, and large enough for the class (well over 100,000 rows). It is interesting because you can actually watch nuclear, solar, and wind rise month by month, instead of guessing from headlines.

**Second dataset (smaller, still useful):** Our World in Data Energy Dataset  
https://github.com/owid/energy-data  
About 23,000 rows. Yearly energy use plus population and GDP, so we can check whether countries that use more energy also look better off.

## Vision Statement

**Problem/Question:** Is the world moving toward a world of abundance? Are people getting more electricity, and is more of it coming from sources like nuclear, solar, and wind?

**High-Level Goal:** Build a Python program that loads this data, cleans it, and lets someone pick a country and see the story in simple charts. Same idea as the motto: a positive, unified, and factual way to look at the frontier technologies leading us to abundance.

**Potential Users:** Classmates, and anyone who wants a clear look at energy progress without the usual doom-and-gloom framing.

## Repository Setup

**GitHub Repo Link:** https://github.com/CS122-04-FA26/frontier-facts-ember-energy *(create this in the course org)*

**Repo Name:** `frontier-facts-ember-energy`

**Repo Structure (initial):**
- `README.md` – project overview
- `data/` – download instructions
- `notebooks/` – exploratory analysis notebooks (to be added)
- `src/` – source code (to be added)
- `.gitignore` – standard ignores
