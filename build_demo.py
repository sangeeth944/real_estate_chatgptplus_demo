import json,pathlib,urllib.request,concurrent.futures
root=pathlib.Path(__file__).parent
photos=['1600596542815-ffad4c1539a9','1600210492486-724fe5c67fb0','1497366754035-f200968a6e72','1600047509807-ba8f99d2cdde','1600607687939-ce8a6c25118c','1600566753086-00f18fb6b3ea','1497366811353-6870744d04b2','1600607687920-4e2a09cf159d']
def get(item):
 i,p=item
 try: urllib.request.urlretrieve('https://images.unsplash.com/photo-'+p+'?w=1200&q=82',root/f'dist/assets/property-{i}.jpg')
 except: pass
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:list(ex.map(get,enumerate(photos)))
rows=[('The Palm Residence','Dubai','Palm Jumeirah','Villa','Buy',2450000,5,6,6200),('Skyline Atelier','Mumbai','Worli','Apartment','Rent',4200,3,3,2100),('The Foundry Workspace','Bengaluru','Indiranagar','Office','Rent',2800,0,2,1850),('Casa Solstice','Goa','Assagao','House','Buy',890000,4,4,3400),('Marina Penthouse','Dubai','Dubai Marina','Apartment','Buy',1250000,3,4,2850),('Garden House','Bengaluru','Whitefield','House','Rent',1900,4,4,3100),('One Harbour Office','Mumbai','Bandra Kurla Complex','Office','Buy',720000,0,2,2400),('The Coastal Retreat','Goa','Siolim','Villa','Rent',3200,4,5,4200),('Cedar Court','Bengaluru','Koramangala','Apartment','Buy',310000,2,2,1450),('Oceanlight Villa','Goa','Anjuna','Villa','Buy',1150000,5,5,5100),('The Boulevard','Dubai','Downtown Dubai','Office','Rent',5100,0,3,3200),('Parkside Residence','Mumbai','Powai','Apartment','Rent',2200,2,2,1600)]
data=[]
for i,r in enumerate(rows):
 name,city,area,typ,deal,price,beds,baths,size=r
 data.append(dict(id=str(i+1),name=name,city=city,area=area,type=typ,deal=deal,price=price,beds=beds,baths=baths,size=size,image=f'assets/property-{i%8}.jpg',gallery=[f'assets/property-{j%8}.jpg' for j in [i,i+1,i+3]],description=f'A considered {typ.lower()} in {area}, with generous proportions, natural light and beautifully composed spaces. Designed for comfortable everyday living and effortless entertaining.' if typ!='Office' else f'A thoughtfully planned workspace in {area}, with flexible floor space, meeting areas and convenient access to the city’s business district.',amenities=['Secure access','Dedicated parking','Air conditioning','Balcony / terrace'] if typ!='Office' else ['Meeting rooms','High-speed internet ready','Dedicated parking','Reception area']))
(root/'dist/properties.json').write_text(json.dumps(data,indent=2))
