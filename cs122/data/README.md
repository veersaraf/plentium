# Data

Do not put the actual datasets in git. Download them locally.

## 1. Ember Monthly Electricity Data (main)

About 515,000 rows. This is the large file.

- Page: https://ember-energy.org/data/monthly-electricity-data/
- File: https://storage.googleapis.com/emb-prod-bkt-publicdata/public-downloads/monthly_full_release_long_format.csv

```bash
mkdir -p data/raw
curl -L -o data/raw/ember-monthly-electricity.csv \
  https://storage.googleapis.com/emb-prod-bkt-publicdata/public-downloads/monthly_full_release_long_format.csv
```

## 2. Our World in Data Energy Dataset (supporting)

About 23,000 rows. Yearly energy, population, and GDP.

- Page: https://github.com/owid/energy-data
- File: https://github.com/owid/energy-data/raw/master/owid-energy-data.csv

```bash
curl -L -o data/raw/owid-energy-data.csv \
  https://github.com/owid/energy-data/raw/master/owid-energy-data.csv
```

## Optional later (not required for the proposal)

- Ember yearly electricity (~371,000 rows): https://storage.googleapis.com/emb-prod-bkt-publicdata/public-downloads/yearly_full_release_long_format.csv
- Global Power Plant Database (~35,000 plants, with fuel type and location): https://github.com/wri/global-power-plant-database
