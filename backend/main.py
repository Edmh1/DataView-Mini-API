from fastapi import FastAPI, HTTPException
import requests, logging
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000"
]

app = FastAPI(title="Esta es mi DataView mini api")

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/api/population")
def get_poblation():
    url = f"https://api.worldbank.org/v2/country/CO/indicator/SP.POP.TOTL?format=json"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()[1]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener datos: {str(e)}")

    
    result = []
    for d in data:
        try:
            if d["value"] is not None:
                result.append({"anio": int(d["date"]), "poblacion": int(d["value"])})
        except Exception as e:
            logging.debug("se espigajo aqui")
            pass

    return result

