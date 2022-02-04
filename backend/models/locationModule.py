def libraries():
  import pandas as pd
  import requests
  import urllib.parse
  import folium
  from folium import plugins

  return pd, requests , folium , plugins 

def extractLocation(user_countries):
  import urllib.parse
  import requests

  add_loc = {}

  for address in user_countries:
    # print(address)
    try:
      url = 'https://nominatim.openstreetmap.org/search/' + urllib.parse.quote(address) +'?format=json'
      response = requests.get(url).json()
      add_loc[address] = [float(response[0]["lat"]),float(response[0]["lon"])]
    except:
      pass
    
  return add_loc

def addLat(location,add_loc):
  import numpy as np
  if location == None:
    pass
  else:
    if location in add_loc.keys():
      return (add_loc[location][0])

def addLong(location,add_loc):
  import numpy as np
  if location == np.NaN:
    pass
  else:
    if location in add_loc.keys():
      return (add_loc[location][1])

def mapPlotter(df,file_name):

  import folium
  # from folium import plugins
  # from folium.plugins import MarkerCluster
  # MarkerCluster()

  # choices:

  map2 = folium.Map(location=[30.3753, 69.3451], tiles='CartoDB dark_matter', zoom_start=1.3)
  # map2 = folium.Map(location=[30.3753, 69.3451], tiles='OpenStreetMap', zoom_start=1.3)
  # map2 = folium.Map(location=[30.3753, 69.3451], tiles='Stamen Terrain', zoom_start=1.3)


  marker_cluster = folium.plugins.MarkerCluster().add_to(map2)

  for point in range(0, df.shape[0]):
    try:
      print('chal rha hai')
      folium.Marker(df[['lat','long']].iloc[point], popup=str(df[['user_ location','user_name']].iloc[point])).add_to(marker_cluster)
    except:
      pass
  # map2

  mapFname = file_name.split('.')[0]+'_visualizationMap.html'
  map2.save(mapFname)

def mapCreator(data, file_name):
  pd, requests, folium , plugins = libraries()
  df = pd.read_csv(data)
  print(df.shape)
  df = df.dropna(subset=['user_ location'])
  user_countries = list(df['user_ location'].unique())
  # print(user_countries)
  add_loc = extractLocation(user_countries)
  print(add_loc)
  # print(add_loc)
  df['lat'] = df.apply (lambda row: addLat(row['user_ location'],add_loc), axis=1)
  print(df['lat'])
  df['long'] = df.apply (lambda row: addLong(row['user_ location'],add_loc), axis=1)
  print(df['long'])
  mapPlotter(df, file_name)