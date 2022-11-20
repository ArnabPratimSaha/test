require('dotenv').config();
const express = require('express');
const { err } = require('./middleware/error');
const app = express();
const cors=require('cors')
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const connectMongo = async() => {
    try {
      const response =await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log(`Successfully Connected to ${response.connection.client.s.options.dbName}`);
    } catch (error) {
      console.log('could not connect to mongoDB ATLAS');
    }
  }
  connectMongo();

// let arr=['arnab','dawdawd'];
// let newda=JSON.stringify(arr)
// console.log(JSON.parse(newda))

const movie = require('./routes/movie');

app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));
app.use(express.raw({extended:true}));
app.use(cors());

app.use('/movie', movie);

app.get('/', (req, res) => res.send('ROOT ROUTE'));

const movier = require('movier');
const { spawn } = require('child_process');
const python = spawn('python', ['code.py', 'dadd']);
const fs=require('fs/promises');
const { movieModel } = require('./database/movies');



// python.stdout.on('data', async(data) => {
//     let res=[];
//     const movies = JSON.parse(data.toString());
//     const file=await fs.readFile('myjsonfile.json');
//     if(file.toString())
//         res=JSON.parse(file);
//     let index=res.length;
//     for (let i = index; i < movies.length; i++) {
//         const m = movies[i];
//         await fs.writeFile('error.json', JSON.stringify(`${m} -> ${i}`), 'utf8');
//         const data=await movier.getTitleDetailsByName(m);
//         res.push({
//             index:i,
//             title:data.name,
//             genres:data.genres,
//             poster:data.posterImage.url,
//             languages:data.languages,
//             casts:data.casts.map(c=>{
//                 return { name :c.name,pic:c.thumbnailImageUrl}
//             }).slice(0,5),
//             runtime:data.runtime.title,
//             description:data.plot,
//             year:data.titleYear,
//         })
//         console.log(`done ${i} of ${movies.length}`);
//         if(i%50===0){
//             await fs.writeFile('myjsonfile.json', JSON.stringify(res), 'utf8');
//             console.log(`Saved upto ${i}th index `);
//         }
//     }
//     await fs.writeFile('myjsonfile.json', JSON.stringify(res), 'utf8');
//     console.log(`File updated completely`);
// })
// python.stderr.on('data', err => {
//     console.log(`Error__` + err);
// })
// python.stdout.on('close', () => {
//     // console.log('closed');
// })

// movier.getTitleDetailsByName('REC 2').then(res=>{
//     console.log('got it');
// }).catch(e=>{
//     console.log(e);
// });


//copy data to database
const dataTransfer=async()=>{
    try {
        let res=[];
        const file=await fs.readFile('myjsonfile.json');
        res=JSON.parse(file);
        let index=JSON.parse(await fs.readFile('error.json'));
        for (let i = +index; i < res.length; i++) {
            const movie = res[i];
            const movieData=new movieModel(movie);
            await movieData.save();
            await fs.writeFile('error.json', JSON.stringify(`${i}`), 'utf8');
            console.log(`done ${i} of ${res.length}`);
        }
        
    } catch (error) {
        throw error;
    }
}
// dataTransfer().then(res=>{
//     console.log('successfully dome');
// }).catch(err=>{
//     console.log(err);
// })
app.use(err);

app.listen(port, () => console.log(`App listening on port ${port}!`))




