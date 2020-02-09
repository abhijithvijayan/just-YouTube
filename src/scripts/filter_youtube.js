/**
 *  @author abhijithvijayan <abhijithvijayan.in>
 */

// ToDo: run only on Google Video Search
// get search results
const list = document.querySelectorAll('.rc .r');

if (list.length > 0)
    list.forEach(entry => {
        if (entry.firstChild.origin !== 'https://www.youtube.com') {
            entry.parentNode.style.display = 'none';
        }
    });
