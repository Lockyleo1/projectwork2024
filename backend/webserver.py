from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Carico il dataframe generale
df = pd.read_csv('stato_lavori.csv', sep=';', encoding='UTF-8')

# Creo le stringhe per filtrare i lavori in base al loro stato, come specificato nel glossario
str_prog = 'in programmazione|in progettazione'  # In progettazione
str_esec = 'in esecuzione'  # In esecuzione
str_term = 'terminato|lavori chiusi|in collaudo'  # Terminato
str_collaudo = 'in collaudo'  # In Collaudo

# Importare il DataFrame di tutti i comuni italiani e lo filtro per le città che mi interessano
df_geo = pd.read_csv('italy_geo.csv', sep=';', encoding='UTF-8')
df_geo_citta = df_geo.copy()
df_geo_citta_filter = df_geo_citta['comune'].isin(df['Citta'].unique())
df_geo_citta = df_geo_citta[df_geo_citta_filter]

# Funzione per ottenere i dati per una regione specifica
def get_regione_data(regione):
    df_regione = df[df['Regione'] == regione]

    terminati_FWA = df_regione[(df_regione['Stato FWA'].str.contains(str_term, na=False)) & (df_regione['Piano FWA (anno)'] == 2022)]['Provincia'].value_counts()
    in_esecuzione_FWA = df_regione[(df_regione['Stato FWA'].str.contains(str_esec, na=False)) & (df_regione['Piano FWA (anno)'] == 2022)]['Provincia'].value_counts()
    in_progettazione_FWA = df_regione[(df_regione['Stato FWA'].str.contains(str_prog, na=False)) & (df_regione['Piano FWA (anno)'] == 2022)]['Provincia'].value_counts()
    in_collaudo_FWA = df_regione[(df_regione['Stato FWA'].str.contains(str_collaudo, na=False)) & (df_regione['Piano FWA (anno)'] == 2022)]['Provincia'].value_counts()
    
    terminati_Fibra = df_regione[(df_regione['Stato Fibra'].str.contains(str_term, na=False)) & (df_regione['Piano fibra (anno)'] == 2022)]['Provincia'].value_counts()
    in_esecuzione_Fibra = df_regione[(df_regione['Stato Fibra'].str.contains(str_esec, na=False)) & (df_regione['Piano fibra (anno)'] == 2022)]['Provincia'].value_counts()
    in_progettazione_Fibra = df_regione[(df_regione['Stato Fibra'].str.contains(str_prog, na=False)) & (df_regione['Piano fibra (anno)'] == 2022)]['Provincia'].value_counts()
    in_collaudo_Fibra = df_regione[(df_regione['Stato Fibra'].str.contains(str_collaudo, na=False)) & (df_regione['Piano fibra (anno)'] == 2022)]['Provincia'].value_counts()
    return {
        'terminati_FWA': terminati_FWA.to_dict(),
        'in_esecuzione_FWA': in_esecuzione_FWA.to_dict(),
        'in_progettazione_FWA': in_progettazione_FWA.to_dict(),
        'in_collaudo_FWA': in_collaudo_FWA.to_dict(),
        'terminati_Fibra': terminati_Fibra.to_dict(),
        'in_esecuzione_Fibra': in_esecuzione_Fibra.to_dict(),
        'in_progettazione_Fibra': in_progettazione_Fibra.to_dict(),
        'in_collaudo_Fibra': in_collaudo_Fibra.to_dict(),
    }

# Endpoint per ottenere i dati dei lavori terminati per una regione specifica
@app.route('/dataTerminati/<regione>', methods=['GET'])
def get_data_terminati(regione):
    regione_data = get_regione_data(regione)
    data = {
        'terminati_FWA': regione_data['terminati_FWA'],
        'terminati_Fibra': regione_data['terminati_Fibra'],
    }
    return jsonify(data)

# Endpoint per ottenere i dati dei lavori in progettazione per una regione specifica
@app.route('/dataInProgettazione/<regione>', methods=['GET'])
def get_data_in_progettazione(regione):
    regione_data = get_regione_data(regione)
    data = {
        'in_progettazione_FWA': regione_data['in_progettazione_FWA'],
        'in_progettazione_Fibra': regione_data['in_progettazione_Fibra']
    }
    return jsonify(data)

# Endpoint per ottenere i dati dei lavori in esecuzione per una regione specifica
@app.route('/dataInEsecuzione/<regione>', methods=['GET'])
def get_data_in_esecuzione(regione):
    regione_data = get_regione_data(regione)
    data = {
        'in_esecuzione_FWA': regione_data['in_esecuzione_FWA'],
        'in_esecuzione_Fibra': regione_data['in_esecuzione_Fibra'],
    }
    return jsonify(data)

# Endpoint per ottenere i dati dei lavori in collaudo per una regione specifica
@app.route('/dataInCollaudo/<regione>', methods=['GET'])
def get_data_in_collaudo(regione):
    regione_data = get_regione_data(regione)
    data = {
        'in_collaudo_FWA': regione_data['in_collaudo_FWA'],
        'in_collaudo_Fibra': regione_data['in_collaudo_Fibra']
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
