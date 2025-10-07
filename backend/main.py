from fastapi import FastAPI, HTTPException
import requests

app = FastAPI(title="Esta es mi DataView mini api")


@app.get("/api/poblation")
def get_poblation():
    url = f"https://api.worldbank.org/v2/country/CO/indicator/SP.POP.TOTL?format=json"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="error al obtener los datos")
    data = response.json()[1]
    
    result = [{"anio": d["date"], "poblacion": d["value"]} for d in data if d["value"]]
    return result

