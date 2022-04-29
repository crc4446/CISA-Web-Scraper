

const feedVulns = document.querySelector('.card');


fetch('http://localhost:5550/results')
    .then(response => {return response.json()})
    .then(data => {
        data.forEach(vulnerability => {
            const vulnTitle = `<h2>` + vulnerability.title + `</h2>`
            const vulnDate = `<h3>` + vulnerability.date + `</h3>`
            const vulnDesc = `<p>` + vulnerability.desc + `</p>`
            const vulnLink = `<a href="` + vulnerability.link + `" target = "_blank">Learn more ></a>`


            feedVulns.insertAdjacentHTML("beforeend", vulnTitle + vulnDate + vulnDesc + vulnLink)

        })
    }).catch(err => console.log(err))
