from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

#Carico il dataframe generale
df = pd.read_csv('stato_lavori.csv', sep=';', encoding='UTF-8')

# Creo le stringhe per filtrare i lavori in base al loro stato, come specificato nel glossario, in ordine
str_prog = 'in programmazione|in progettazione' # In progettazione
str_esec = 'in esecuzione' # In esecuzione
str_term = 'terminato|lavori chiusi|in collaudo' # Terminato

#Importare il DataFrame di tutti i comuni italiani e lo filtro per le città che mi interessano.
df_geo = pd.read_csv('italy_geo.csv', sep=';', encoding='UTF-8')
df_geo_citta = df_geo.copy()

#Creazione del filtro che verifica se sotto la voce comune il dato è true
df_geo_citta_filter = df_geo_citta['comune'].isin(df['Citta'].unique())
df_geo_citta = df_geo_citta[df_geo_citta_filter]

#Prendo la regione in post da React, selezionata dall'utente
regione = 'Emilia Romagna'

#Seleziono la regione data da React
df_regione = df[df['Regione'] == regione]

#Lavori in emilia-romagna terminati/in esecuzione/in progettazione
terminati_FWA = df_regione[(df_regione['Stato FWA'].str.contains(str_term, na=False)) & (df_regione['Piano FWA (anno)'] == 2022)]['Provincia'].value_counts()
in_esecuzione_FWA = df_regione[(df_regione['Stato FWA'].str.contains(str_esec, na=False)) & (df_regione['Piano FWA (anno)'] == 2022)]['Provincia'].value_counts()
in_progettazione_FWA = df_regione[(df_regione['Stato FWA'].str.contains(str_prog, na=False)) & (df_regione['Piano FWA (anno)'] == 2022)]['Provincia'].value_counts()

#Prendiamo i Cantieri divisi per piano d'anno.
totale = df_regione[df_regione['FWA'] == 1]['Piano FWA (anno)'].value_counts()

#Lavori in emilia-romagna 
terminati_Fibra = df_regione[(df_regione['Stato Fibra'].str.contains(str_term, na=False)) & (df_regione['Piano fibra (anno)'] == 2022)]['Provincia'].value_counts()
in_esecuzione_Fibra = df_regione[(df_regione['Stato Fibra'].str.contains(str_esec, na=False)) & (df_regione['Piano fibra (anno)'] == 2022)]['Provincia'].value_counts()
in_progettazione_Fibra = df_regione[(df_regione['Stato Fibra'].str.contains(str_prog, na=False)) & (df_regione['Piano fibra (anno)'] == 2022)]['Provincia'].value_counts()


# Definisci una route che restituirà il file JSON


@app.route('/dataEmiliaRomagnaTerminati', methods=['GET'])
def get_data():
    data = {
        'terminati_FWA': terminati_FWA.to_dict(),
        'terminati_Fibra': terminati_Fibra.to_dict(),
    }
    return jsonify(data)

@app.route('/dataEmiliaRomagnaInProgettazione', methods=['GET'])
def get_data():
    data = {
        'in_progettazione_FWA': in_progettazione_FWA.to_dict(),
        'in_progettazione_Fibra': in_progettazione_Fibra.to_dict()
    }
    return jsonify(data)

@app.route('/dataEmiliaRomagnaInEsecuzione', methods=['GET'])
def get_data():
    data = {
        'in_esecuzione_FWA': in_esecuzione_FWA.to_dict(),
        'in_esecuzione_Fibra': in_esecuzione_Fibra.to_dict(),
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)






# @app.route('/leggiCSV')
# def get_data():


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)
