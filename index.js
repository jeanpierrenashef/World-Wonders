axios.get("https://www.world-wonders-api.org/v0/wonders")
    .then((response) => {
        //console.log(response.data)
        
        this.data = response.data;
        const section = document.querySelector('.wonders');

        this.data.forEach((item)=>{
            //console.log(item)
            const name =  `<li><strong>Name:</strong> ${item.name}</li>`;
            const location= `<li><strong>Location:</strong> ${item.location}</li>`;
            let imageUrl = item.links && item.links.images && item.links.images.length > 0 ?   //checks for available images to display
                (item.links.images[0] || 
                    (item.links.images.length > 1 ? item.links.images[1] : 
                        (item.links.images.length > 2 ? item.links.images[2] : ''))) 
                : '';

            const image = `<img src="${imageUrl}"/>`;
            //const summary = `<p>${item.summary}</p>`;
            const detailsLink = `<a href="dynamic/wonder.html?name=${encodeURIComponent(item.name)}" class="button">View Details</a>`;
            //const wiki = `<a href=${item.links.wiki} class="button">${item.name}<a>`;
            const wonderContainer = `<div class="wonders-container">${image}<div class="wonders-info">${name}${location}</div>${detailsLink}</div>`;

            section.insertAdjacentHTML('beforeend', wonderContainer);         
            
            /*
            document.getElementById('wonders').insertAdjacentHTML('beforeend',name)
            document.getElementById('wonders').insertAdjacentHTML('beforeend',image)
            document.getElementById('wonders').insertAdjacentHTML('beforeend',wiki)
            */
            
            //this.data = item.data
        })
    
    }).catch((error) => {
        console.log(error)
    })