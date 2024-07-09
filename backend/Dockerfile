# Usa un'immagine di base con Python per Flask
FROM python:3.9-slim

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia i file necessari per il server Flask
COPY webserver.py .
COPY stato_lavori.csv .
COPY italy_geo.csv .
COPY pcn_route.csv .

# Installa le dipendenze Python
RUN pip install flask pandas flask-cors

# Espone la porta 5000 del container
EXPOSE 5000

# Comando di avvio del server Flask
CMD ["python", "webserver.py"]