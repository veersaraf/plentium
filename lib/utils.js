import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const getDomainData = (data, country, domainCode, year) => {
  // suffixes = ["e-TWh", "elc-TWh", "e-3-%", "elc-3-%", "e-chng-%", "e-%", "e-use-pp-gdp-pc"]

  data = Array.isArray(country) ? data.filter((d) => country.includes(d.Country)) : country ? data.filter((d) => d.Country == country) : data
  data = year ? data.filter((d) => d.Year == year) : data
  data = domainCode ? data.map(({ Country, Year, ...rest }) => ({
    Country,
    Year,
    ...Object.fromEntries(
      Object.entries(rest)
        .filter(([key]) => key.includes(domainCode))
        .map(([key, value]) => [key.replace(new RegExp(`\\s*\\(?\\s*${domainCode}\\s*\\)?\\s*`), ""), value])
    )
  })) : data

  return data
}

export const removeNAN = (data) => {
  return data.filter(item => 
    Object.values(item).every(value => value !== null && value !== undefined && value !== "")
  )
}

export function saveAsJSON(data, name, fs) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile(name, jsonData, 'utf-8');
}

export function sortData(data, type="alpha", value) {

  data = data.filter(item => {
    const val = item[value];
    return val !== undefined && val !== "" && !Number.isNaN(val);
  })

  return type === "asc" ? data.sort((a, b) => a[value] - b[value]) : type === "desc" ? data.sort((a, b) => b[value] - a[value]) : type === "alpha" ? data.sort((a, b) => {
    if (a.Country < b.Country) return -1;
    if (a.Country > b.Country) return 1;
    if (a.Year < b.Year) return -1;
    if (a.Year > b.Year) return 1;
    return 0;
  }) : data

}

export function mergeDatasets(datasets, countries, suffixes) {
  const merged = {};

  datasets.forEach((dataset, index) => {
    dataset.forEach(entry => {
      if (!countries.includes(entry.Country)) return;

      const key = `${entry.Country}-${entry.Year}`;
      if (!merged[key]) merged[key] = { Country: entry.Country, Year: entry.Year };

      Object.keys(entry).forEach(k => {
        if (k !== "Country" && k !== "Year" && !k.includes("Code") && !k.includes("Continent")) {
          merged[key][`${k} ${suffixes[index]}`] = entry[k];
        }
      });
    });
  });

  return Object.values(merged);
}

export const leaderboardDomains = {
  "Energy consumption": {"Code": "e-TWh", "Unit": "TWh", "Key": "Total Consumption",},
  "Electricity production": {"Code": "elc-TWh", "Unit": "TWh", "Key": "Total Consumption",},
  "Energy use per person": {"Code": "e-use-pp-gdp-pc", "Unit": "KWh", "Key": "Primary energy consumption per capita (kWh/person)",},
  "GDP per capita" : {"Code": "e-use-pp-gdp-pc", "Unit": "$", "Key":  "GDP per capita, PPP (constant 2017 international $)"},
  "Renewables %": {"Code": "elc-3-%", "Unit": "%", "Key": 'Renewables'},
  "Solar %": {"Code": "e-%", "Unit": "%", "Key": "Solar",},
  "Wind %": {"Code": "e-%", "Unit": "%", "Key": "Wind"},
  "Nuclear %": {"Code": "elc-3-%", "Unit": "%", "Key": "Nuclear"},
  "Hydro %": {"Code": "e-%", "Unit": "%", "Key": "Hydro"},
  "Clean energy capacity" : {"Code": false, "Unit": "GW", "Key": "Total clean energy capacity"},
  "Solar capacity" : {"Code": false, "Unit": "GW", "Key": "Solar"},
  "Wind capacity" : {"Code": false, "Unit": "GW", "Key":"Wind"},
  "Nuclear capacity" : {"Code": false, "Unit": "GW", "Key": "Nuclear"},
  "Hydro capacity" : {"Code": false, "Unit": "GW", "Key": "Hydro"},
  "Bioenergy capacity" : {"Code": false, "Unit": "GW", "Key": "Bioenergy"},
}

export const continents = ["World","North America", "South America","Latin America and Caribbean", "Middle East", "ASEAN","Europe", "Asia", "Africa", "Oceania", "G7", "G20", "OECD", "EU"]