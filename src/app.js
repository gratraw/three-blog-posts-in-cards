import './style.scss';

/*
https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json
*/

function printData(data){
    const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};
    console.log(data);
    let results = '<div class="row">';
    data.forEach(element => {
        let dataObj = {
            title: element.title.rendered,
            date: new Date(element.date),
            articleLink: element.link,
            thumbnail: element.featured_media,
            author: element._embedded.author[0].name,
            authorLink: element._embedded.author[0].link,
            //I decided hardcode this part of code
            //I had a problem with getting to the elements below in the response
            //Unfortunately I did not find solution for my issue and debugging did not help
            //When I console.log-ed the response I was able to assign it to a variable in console
            //But when I tried to do it within the code I got an error
            group: "Cloud and server",//element._embedded["wp:term"][2][0].name,
            type: "Article",//element._embedded["wp:term"][0][0].name,
            altImg: "Thumbnail photo"//element._embedded["wp:featuredmedia"][0].title.rendered
        };
        
        results += `<div class="col-4 p-card--highlighted">
        <p class="p-card__thumbnail p-muted-heading">${dataObj.group}</p>
        <hr class="dotted_line">
        <img src="${dataObj.thumbnail}" alt="${dataObj.altImg}">
        <h3 class="p-card__title trunk"><a class="p-link--soft" href="${dataObj.articleLink}">${dataObj.title}</a></h3>
        <p><em>By <a href="${dataObj.authorLink}" >${dataObj.author}</a> on ${dataObj.date.getDay()} ${months[dataObj.date.getMonth()]} ${dataObj.date.getFullYear()}</em></p>
        <hr class="dotted_line">
        <p class="p-card__footer">${dataObj.type}</p>
    </div>`;
    });

    document.querySelector('#canonical_task').innerHTML = results + '</div>';
}

async function fetchData(){
    const apiUrl = "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json";
    const response = await fetch(apiUrl);
    printData(await response.json());/*
    fetch(apiUrl).then(response => {
        if(!response.ok) throw Error('Error when obtaining the data')
        return response.json();
    }).then(data => {
        printData(data);
    }).catch(error => {
        console.log(error);
    });*/

}
fetchData().catch(error => {
    console.log(error);});
