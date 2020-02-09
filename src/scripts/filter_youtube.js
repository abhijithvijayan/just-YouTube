/**
 *  @author abhijithvijayan <abhijithvijayan.in>
 */

(function() {
    const youtubeUrl = 'https://www.youtube.com';

    // get search results
    const list = document.querySelectorAll('.rc .r');

    // Test at: https://regex101.com/r/dxeCFd/1
    if (/\btbm=vid\b/i.test(window.location.search)) {
        if (list.length > 0) {
            console.log('just-YouTube: Showing YouTube results only');

            list.forEach(entry => {
                if (entry.firstChild.origin !== youtubeUrl) {
                    entry.parentNode.style.display = 'none';
                }
            });
        }
    }
})();
