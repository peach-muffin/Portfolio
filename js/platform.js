'use-strict'
const handle = "peach_muffin"; // Replace with the Codeforces handle you want to fetch the rating for

function codeforces() {
    fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const maxRating = data.result[0].maxRating;
                const currentRating = data.result[0].rating;
                document.querySelector('#codeforces_max').textContent += maxRating
                document.querySelector('#codeforces_curr').textContent += currentRating
                console.log(`${handle}'s Codeforces max rating is: ${maxRating}`);
                console.log(`${handle}'s Codeforces current rating is: ${currentRating}`);
            } else {
                console.error(`Failed to fetch ratings for ${handle}`);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

codeforces()

function atcoder() {
    fetch(`https://atcoder.jp/users/${handle}/history/json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const maxRating = Math.max(...data.map(d => d.NewRating));
                const currentRating = data[data.length - 1].NewRating;
                document.querySelector('#atcoder_max').textContent += maxRating
                document.querySelector('#atcoder_curr').textContent += currentRating
                console.log(`${handle}'s AtCoder max rating is: ${maxRating}`);
                console.log(`${handle}'s AtCoder current rating is: ${currentRating}`);
            } else {
                console.error(`User ${handle} not found or has no ratings`);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// atcoder()

// function codechef() {
//     const url = `https://www.codechef.com/users/${handle}`;

//     const jsdom = require("jsdom");
//     const { JSDOM } = jsdom;

//     JSDOM.fromURL(url).then(dom => {
//         const currentRating = dom.window.document.querySelector(".rating-number").textContent;
//         const maxRating = dom.window.document.querySelector(".rating-header small").textContent;
//         document.querySelector('#codechef_max').textContent += maxRating
//         document.querySelector('#codechef_curr').textContent += currentRating
//         console.log(`Your current CodeChef rating is ${currentRating} and your maximum rating is ${maxRating}`);
//     }).catch(error => console.error(error));
// }

// codechef()
async function codechef() {
    // const handle = 'your_handle_here'; // Replace 'your_handle_here' with your actual handle
    const url = `https://www.codechef.com/users/${handle}`;

    try {
        const response = await fetch(url);
        const html = await response.text();
        const dom = new JSDOM(html);

        const currentRating = dom.window.document.querySelector(".rating-number").textContent;
        const maxRating = dom.window.document.querySelector(".rating-header small").textContent;

        document.querySelector('#codechef_max').textContent += maxRating;
        document.querySelector('#codechef_curr').textContent += currentRating;

        console.log(`Your current CodeChef rating is ${currentRating} and your maximum rating is ${maxRating}`);
    } catch (error) {
        console.error(error);
    }
}

codechef();

