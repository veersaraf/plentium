# Data — download instructions

Do **not** commit dataset files here. This folder is for scripts and instructions only.

## Primary dataset

**Our World in Data — Complete Energy Dataset**

- Repository: https://github.com/owid/energy-data
- CSV: https://github.com/owid/energy-data/raw/master/owid-energy-data.csv
- Codebook: https://github.com/owid/energy-data/raw/master/owid-energy-codebook.csv
- License: Creative Commons BY (credit Our World in Data)

### Download with Python 3

```bash
mkdir -p data/raw
python3 - <<'PY'
from pathlib import Path
from urllib.request import urlretrieve

raw = Path("data/raw")
raw.mkdir(parents=True, exist_ok=True)
urlretrieve(
    "https://github.com/owid/energy-data/raw/master/owid-energy-data.csv",
    raw / "owid-energy-data.csv",
)
urlretrieve(
    "https://github.com/owid/energy-data/raw/master/owid-energy-codebook.csv",
    raw / "owid-energy-codebook.csv",
)
print("saved", list(raw.iterdir()))
PY
```

### Download with curl

```bash
mkdir -p data/raw
curl -L -o data/raw/owid-energy-data.csv \
  https://github.com/owid/energy-data/raw/master/owid-energy-data.csv
curl -L -o data/raw/owid-energy-codebook.csv \
  https://github.com/owid/energy-data/raw/master/owid-energy-codebook.csv
```

Expected shape (as of September 2026): about **23,377 rows × 130 columns**, ~9 MB. Always prefer the live file above over any snapshot.

## Optional supporting sources (later chapters)

- Cost of space launches to LEO: https://ourworldindata.org/grapher/cost-space-launches-low-earth-orbit
- IAEA Power Reactor Information System (PRIS) public tables, if we add nuclear

## What we will *not* put in git

- `data/raw/*.csv`
- `data/processed/*.csv` / `*.db`
- `.env` files
