async function sendData(text) {
    try {
      let res = await fetch('http://localhost:5000/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text
        }),
      });
  
      res = await res.json();
  
      console.log(`Received response from server: ${JSON.stringify(res, null, 2)}`);
      return {
        hasError: false,
        rawText: res.text,
        keywords: res.keywords
      }
    } catch (err) {
      console.error(`Error sending data to server: ${JSON.stringify(err, null, 2)}`);
      return {
        hasError: true,
        err
      }
    }
  }
  
  async function processSelected(clicked_id) {
    
      // 1) get selected text
      let test = clicked_id; 
      //console.log(test);
    
      // 2) get keywords for the text
      let res = await sendData(clicked_id);
      console.log(res.keywords);
    
      // 3) call function to get articles (googleapi.js)
      const word = res.keywords;
      let results = googleapi(word);
      console.log(results);
  }