import requests
import pandas as pd
import os
import json

#İl Datası Getir
url = "https://servis.mgm.gov.tr/web/merkezler/iller"

headers = {
    "Referer": "https://www.mgm.gov.tr/tahmin/il-ve-ilceler.aspx",
    "Origin": "https://www.mgm.gov.tr"
}

response = requests.get(url, headers=headers)
iller_df=pd.DataFrame(response.json())
iller_df.to_csv("data/Sehir_List.csv",sep=';',index=False,encoding="utf-8")

#İlce Datası Getir
ilceler = pd.DataFrame()
ilceler_listesi = []
for il in iller_df["il"]:
    il_url = f"https://servis.mgm.gov.tr/web/merkezler/ililcesi?il={il}"
    response = requests.get(il_url,headers=headers)
    ilceler = pd.concat([ilceler,pd.DataFrame(response.json())])
ilceler.to_csv("data/Ilce_List.csv",sep=';',index=False,encoding="utf-8")

havadurum = pd.read_csv("data/Hava_Durumu.csv", sep=";")

for mid in ilceler["merkezId"]:
    havadurum_url = f"https://servis.mgm.gov.tr/web/tahminler/gunluk?istno={mid}"
    response = requests.get(havadurum_url,headers=headers,verify=False)
    data = response.json()[0]
    rows = []
    # 5 günlük veriyi satır satır ekleyeceğiz
    for i in range(1, 6):
        row = {
            "istNo": str(data["istNo"]),
            "tarih": data[f"tarihGun{i}"],
            "enDusuk": str(data[f"enDusukGun{i}"]),
            "enYuksek": data[f"enYuksekGun{i}"],
            "hadise": data[f"hadiseGun{i}"],
            "enDusukNem": data[f"enDusukNemGun{i}"],
            "enYuksekNem": data[f"enYuksekNemGun{i}"],
            "ruzgarYon": data[f"ruzgarYonGun{i}"],
            "ruzgarHiz": data[f"ruzgarHizGun{i}"]
        }
        rows.append(row)
    
    havadurum = pd.concat([havadurum,pd.DataFrame(rows)])

havadurum=havadurum.drop_duplicates()
havadurum.reset_index(inplace=True)
havadurum.drop("index",axis=1,inplace=True)
havadurum.to_csv("data/Hava_Durumu.csv",sep=';',index=False,encoding="utf-8")


