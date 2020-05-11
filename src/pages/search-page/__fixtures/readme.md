datasetsApiResponse.json is generated as:
```
curl "https://fellesdatakatalog.brreg.no/datasets?q=Marka&size=50" -H "Accept: application/json" -o applications/search/src/pages/search-page/__fixtures/datasetsApiResponse.json
```

informationmodelsApiResponse.json:
```
curl -X POST 'http://localhost:8000/informationmodels' -H 'Content-Type: application/json' -d '{"q":"åpne data fra"}' -o ./src/pages/search-page/__fixtures/informationmodelsApiResponse.json
```

todo - instead of readme, each json could have corresponding .sh script to update. 