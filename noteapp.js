const fs = require("fs");


//const help = require('./help')
let content ='';
let note = { title: "", body: "" };
let noteList="";
if (fs.existsSync(('note.json'),()=>{}))
{
    content = fs.readFileSync('note.json', 'utf8')
}
noteList=(content.length>0?JSON.parse(content):[])

//noteList=(contenu.length>0?JSON.parse(contenu):[])

//let noteList = ["a"];
let title = "";
let body = "";
let tab=process.argv;
console.log(tab)
console.log(tab[2])
console.log(tab.indexOf("-t"))
switch(tab[2]){
    case'add':
    if (tab.indexOf("-t") === -1 && tab.indexOf("--title") === -1){
        console.log("invalid or missing title !");
    }
    else{
        if(tab.indexOf("-t")!==-1){
        title = tab[tab.indexOf("-t")+1]}
        else {
        title=tab[tab.indexOf("--title")+1]
        }
    }
    note.title=title;
    console.log('title:',title)
    if (tab.indexOf("-b") === -1 && tab.indexOf("--body") === -1){
        console.log("invalid or missing body !");
    }
    else{
        if(tab.indexOf("-b")!==-1){
        body = tab[tab.indexOf("-b")+1]}
        else {
        body =tab[tab.indexOf("--body")+1]
        }
    }
    note.body=body;
    //console.log("--------------"+note.title+"--------"+note.body)
    noteList.push(note);
    console.log('body:',body)
    fs.writeFile("note.json", JSON.stringify(noteList), function(err){
        if (err) {console.log (err)}
        console.log('The note was added!');
      });
    case 'list' :
    console.log(noteList)
    
    case 'read':
    if(tab[3]==='--title' || tab[3]=== '-t'){
        noteList.map((n,i)=>{
            console.log('title:',n.title,'\n body:',n.body)
        })
    }
    case '--help':
    {
        console.log('option :\n --title -t title of note \n --body  -b body of note')
    }
    case 'remove':
    if (tab[3] !== '--title' && tab[3] !== '-t'){
        console.log("Missing required argument : title")}
    else {
        if (tab[4]!==undefined)
            { 
                console.log(noteList.filter(el=>{return tab[4]!==el.title}))
                fs.writeFileSync('app.json',JSON.stringify(noteList.filter(el=>{return tab[4]!==el.title})));  
            }

    }
    
}