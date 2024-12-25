document.addEventListener('DOMContentLoaded', get_user)

const token = 'IGQWRNRmo0YnZA1STJxSEJDWVZAkN0owN1RfRzBhSGJ1VmotUzBuNHhhZAEY4YU02QUQzMFl0VzlyVk9ZAVlBweEZA2RGxSaWI2b3B6MGpNU1RXLXBmV2I0OU5sUFlnb1d4bE80aHF0ZAlJnSWV0WmlRaFp5SVBibHpydk0ZD'

function get_user(params) {
    
    const url = 'https://graph.instagram.com/me/media?fields=id,caption&access_token=' 

    elements_list = []
    fetch('https://graph.instagram.com/me/media?fields=id,permalink,timestamp,caption&access_token=IGQWRNRmo0YnZA1STJxSEJDWVZAkN0owN1RfRzBhSGJ1VmotUzBuNHhhZAEY4YU02QUQzMFl0VzlyVk9ZAVlBweEZA2RGxSaWI2b3B6MGpNU1RXLXBmV2I0OU5sUFlnb1d4bE80aHF0ZAlJnSWV0WmlRaFp5SVBibHpydk0ZD')
    .then(result => result.json())    
    .then(data => {
        console.log(data)
        console.log(typeof data.data)
        data.data.forEach(element => {
            if (elements_list.length >= 4)  // Limit of downloaded photos
               return           
            elements_list.push(element)                                               
        })
        get_media_from_list(elements_list)                   
    })
        
}
function get_media_from_list(elements_list){
    elements_list.forEach(element => {
        console.log(element.timestamp)
        get_media_by_user_id(element.id, element.permalink)
    })
}

function get_media_by_user_id(id, permalink){

    host = "https://graph.instagram.com/"
    query = "?fields=media_url&access_token="
    
    fetch(host+id+query+token)
    .then(result => result.json())
    .then(result => {
        console.log(result.media_url)
        show_images(result.media_url, permalink)
    })
}  

function show_images(url, permalink){
    const insta_photos = document.getElementById('insta_photos')
    
    let img_a = document.createElement("a")
    img_a.setAttribute("href", permalink)
    
    let img_div = document.createElement("img")
    img_div.setAttribute("src", url)
    img_div.setAttribute("width",'300')
    img_div.setAttribute("height", 'auto')
    img_div.setAttribute("class", "insta-foto")

    img_a.appendChild(img_div) 

    
    insta_photos.append(img_a)
    insta_photos.append(document.createElement("br"))
}