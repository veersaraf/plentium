# Data

Do not put the actual dataset in this folder. Only instructions.

## Our World in Data Energy Dataset

- Page: https://github.com/owid/energy-data
- File: https://github.com/owid/energy-data/raw/master/owid-energy-data.csv
- Column guide: https://github.com/owid/energy-data/raw/master/owid-energy-codebook.csv

Download:

```bash
mkdir -p data/raw
curl -L -o data/raw/owid-energy-data.csv \
  https://github.com/owid/energy-data/raw/master/owid-energy-data.csv
```

The file is about 9 MB. About 23,000 rows and 130 columns.
