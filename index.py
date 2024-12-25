from django.shortcuts import render
import requests, json


def index(request):
    token = 'IGQWRNWUNucjB0QmlHdEVTbVhCRndsYkhCZAFdONTRxYmViOTdvRzd4bENxS0dpQ3VKLU5FRVhnbG5MV1VkYnpJS2J1VjJ2TTNMdGp0WGg2WWdXQ0JoNkw1ZA1hCc1Q1eUNwdDFURUN2NS1SSUdRY1l4YnlBU3BtbTAZD'
    url = 'https://graph.instagram.com/me/media?fields=id,caption&access_token='   
    r = requests.get(url+token)
    data = r.json()['data']

    id_list=[]

    for item in data:
        id_list.append(item['id']) #list of values to pass into get-request for receiving images    

    host = "https://graph.instagram.com/"
    query = "?fields=media_url&access_token="

    url_list = []
    for id in id_list:
        image_response = requests.get(host+id+query+token)
        image_json = image_response.json()
        media_url = image_json['media_url']
        url_list.append(media_url)    
    
    return render(request, 'main/index.html',{
        'images': url_list,        
    }) 