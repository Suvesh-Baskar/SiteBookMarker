// Listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  if(!validateForm(siteName,siteURL)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL
  }

  /*
  // Localstorage store only strings
  // Local storage test
  localStorage.setItem('test','hello world');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
  */

  // Test if local storage (bookmarks) is null
  if(localStorage.getItem('bookmarks') === null){
    // Initialize array
    var bookmarks = [];
    // add bookmark to array
    bookmarks.push(bookmark);
    // Set to local Storage |Stringify is to convert json to string
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  } else {
    // Get book marks from local storage | Parse is to convert String to JSON
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Reset to local Storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();
  
  // Refetch bookmarks to refress the bookmarks
  fetchBookmarks();

  // Prevents form submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
  // Get book marks from local storage | Parse is to convert String to JSON
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through book marks to match the URL
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url === url){
      bookmarks.splice(i,1);
    }
  }
  // Reset to local Storage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  // Refetch bookmarks to refress the bookmarks
  fetchBookmarks();

}


// Fetch bookmarks
function fetchBookmarks(){
  // Get book marks from local storage | Parse is to convert String to JSON
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarkResults = document.getElementById('bookmarkResults');

  // Build output
  bookmarkResults.innerHTML = '';
  for(var i = 0; i< bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div id="result" class="card bg-light text-dark card-body">'+
                                 '<h3>'+name+
                                 '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                 '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger btn-margin" href="#">Delete</a>'+
                                 '</h3>'+
                                 '</div>';
  }
}


// Validate form
function validateForm(siteName,siteURL){
  if(!siteName || !siteURL){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteURL.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
